/* ============================================================
   app.js — orchestration for the NeXtGen Stimme prototype.
   Screens: landing → scan → feed/article/pulse/wallet/profile.
   Depends on: data.js, articles.js, swipe.js, scanner.js + the
   qr-scanner CDN script.
   ============================================================ */
(function () {
  "use strict";

  var state = {
    points: NGS.START_POINTS,
    pulseIndex: 0,
    votes: 0,
    scans: 0,
    saved: {},            // id -> true
    savedAwarded: {},     // id -> true (points given once)
    selectedTopics: {},   // key -> true (empty = show all)
    lang: "de",           // digest language: 'de' | 'en'
    perkUnlocked: false,
    currentArticleId: null,
    onboarded: false,
    streak: 1,
    quizDone: false,
    search: "",
    settings: { push: true, sound: false }
  };

  function $(s, el) { return (el || document).querySelector(s); }
  function $all(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------------- i18n ---------------- */
  function tr(k) {
    var d = NGS.I18N[state.lang] || NGS.I18N.de;
    if (d[k] != null) return d[k];
    return (NGS.I18N.de[k] != null) ? NGS.I18N.de[k] : k;
  }
  function EN() { return state.lang === "en"; }
  // content selectors (fall back to German if no English given)
  function aTitle(a) { return EN() && a.titleEn ? a.titleEn : a.title; }
  function aDek(a)   { return EN() && a.dekEn  ? a.dekEn  : a.dek; }
  function aBody(a)  { return EN() && a.bodyEn ? a.bodyEn : a.body; }
  function aAi(a)    { return EN() && a.aiEn   ? a.aiEn   : a.ai; }
  function catLabel(a) { return EN() ? (NGS.topic(a.topic).labelEn || a.cat).toUpperCase() : a.cat; }
  function topicLabel(tp) { return EN() && tp.labelEn ? tp.labelEn : tp.label; }
  function cTitle(c) { return EN() && c.titleEn ? c.titleEn : c.title; }
  function cAsk(c)   { return EN() && c.askEn   ? c.askEn   : c.ask; }
  function cAi(c)    { return EN() && c.aiEn    ? c.aiEn    : c.ai; }
  function cCat(c)   { return EN() && c.catEn   ? c.catEn   : c.cat; }
  function qText(q)  { return EN() && q.qEn       ? q.qEn       : q.q; }
  function qOpts(q)  { return EN() && q.optionsEn ? q.optionsEn : q.options; }
  function qExpl(q)  { return EN() && q.explainEn ? q.explainEn : q.explain; }

  function applyI18n() {
    $all("[data-i18n]").forEach(function (el) { el.textContent = tr(el.getAttribute("data-i18n")); });
    $all("[data-i18n-html]").forEach(function (el) { el.innerHTML = tr(el.getAttribute("data-i18n-html")); });
    $all("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", tr(el.getAttribute("data-i18n-ph"))); });
    $all("[data-setlang]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-setlang") === state.lang); });
    document.documentElement.lang = state.lang;
  }

  function rerenderActive() {
    var map = { feed: function () { renderFilterBar(); renderFeed(); }, article: renderArticle,
      profile: renderProfile, quiz: renderQuiz, saved: renderSaved,
      pulse: function () { var card = deckEl.querySelector(".swipe-card"); if (card && !card.querySelector(".result.show")) { deckEl.dataset.built = ""; ensureDeck(); } } };
    Object.keys(map).forEach(function (id) {
      var scr = $("#screen-" + id);
      if (scr && scr.classList.contains("active")) map[id]();
    });
  }

  function setLang(l) {
    if (l !== "de" && l !== "en") return;
    state.lang = l;
    applyI18n();
    rerenderActive();
  }

  var SHELL = { topbar: $("#topbar"), tabbar: $("#tabbar") };
  var deckEl = $("#deck");
  var currentSub = null; // active Supabase realtime channel for the visible Pulse card

  /* ---------------- navigation ---------------- */
  function showShell(on) {
    SHELL.topbar.classList.toggle("hidden", !on);
    SHELL.tabbar.classList.toggle("hidden", !on);
  }

  function go(name) {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    $all(".screen").forEach(function (s) { s.classList.toggle("active", s.id === "screen-" + name); });
    showShell(name !== "landing" && name !== "onboarding");
    var tabName = (name === "onboarding" || name === "saved" || name === "article" || name === "quiz") ? "feed" : name;
    $all(".tab").forEach(function (t) { t.classList.toggle("active", t.dataset.tab === tabName); });
    if (name === "feed") { renderFilterBar(); renderFeed(); }
    if (name === "onboarding") renderOnboarding();
    if (name === "saved") renderSaved();
    if (name === "quiz") renderQuiz();
    if (name === "pulse") ensureDeck();
    if (name === "profile") renderProfile();
    $("#screens").scrollTop = 0;
    var active = $("#screen-" + name);
    if (active) active.scrollTop = 0;
  }

  /* ---------------- points & wallet ---------------- */
  function setPoints(v) {
    state.points = v;
    $("#pointsVal").textContent = v;
    $("#walletBig").textContent = v;
    var pct = Math.min(100, Math.round(v / NGS.GOAL * 100));
    $("#walletMeter").style.width = pct + "%";
    var left = Math.max(0, NGS.GOAL - v);
    $("#walletNext").textContent = left > 0 ? (left + " " + tr("wallet_left_a")) : tr("wallet_done");
    if (v >= NGS.GOAL && !state.perkUnlocked) unlockCoffee();
    var pill = $("#pointsPill");
    pill.classList.add("bump");
    setTimeout(function () { pill.classList.remove("bump"); }, 260);
  }

  function unlockCoffee() {
    state.perkUnlocked = true;
    var b = $("#perkCoffee");
    b.className = "pk-cta on";
    b.textContent = tr("redeem");
    b.onclick = function () { toast(tr("t_coffee")); };
  }

  /* ---------------- toast ---------------- */
  var toastT;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------------- greeting ---------------- */
  function greeting() {
    var h = new Date().getHours();
    if (h < 11) return tr("greet_morning");
    if (h < 18) return tr("greet_afternoon");
    return tr("greet_evening");
  }

  /* ================= FEED ================= */
  function visibleArticles() {
    var keys = Object.keys(state.selectedTopics);
    var arr = NGS.ARTICLES.slice();
    if (keys.length) arr = arr.filter(function (a) { return state.selectedTopics[a.topic]; });
    var q = (state.search || "").trim().toLowerCase();
    if (q) arr = arr.filter(function (a) {
      return (aTitle(a) + " " + aDek(a) + " " + a.title + " " + a.dek + " " + catLabel(a)).toLowerCase().indexOf(q) !== -1;
    });
    return arr;
  }

  function renderFilterBar() {
    var bar = $("#filterBar");
    if (!bar) return;
    var none = Object.keys(state.selectedTopics).length === 0;
    var html = '<button class="filter-chip' + (none ? ' active' : '') + '" data-clear="1">' + tr("filter_all") + '</button>';
    NGS.TOPICS.forEach(function (tp) {
      var on = state.selectedTopics[tp.key] ? " active" : "";
      html += '<button class="filter-chip' + on + '" data-topic="' + tp.key + '">' + esc(topicLabel(tp)) + '</button>';
    });
    bar.innerHTML = html;
  }

  function articleCard(a, feature) {
    var grad = NGS.topic(a.topic).grad;
    var saved = state.saved[a.id] ? " on" : "";
    return '<article class="article-card' + (feature ? ' feature' : '') + '" data-article="' + a.id + '">' +
      '<div class="ac-cover" style="background:' + grad + '">' +
        (NGS.coverArt ? NGS.coverArt(a) : '') +
        '<span class="ac-cat">' + esc(catLabel(a)) + '</span>' +
        (a.premium ? '<span class="ac-prem">ST+</span>' : '') +
      '</div>' +
      '<div class="ac-body">' +
        '<div class="ac-title">' + esc(aTitle(a)) + '</div>' +
        '<div class="ac-dek">' + esc(aDek(a)) + '</div>' +
        '<div class="ac-meta">' +
          '<span>' + esc(a.date) + '</span><span>·</span><span>' + a.read + ' ' + tr("min") + '</span>' +
          '<button class="ac-save' + saved + '" data-save="' + a.id + '" aria-label="' + tr("save") + '">' +
            '<svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg></button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderFeed() {
    var list = $("#feedList");
    if (!list) return;
    $("#greetTitle").textContent = greeting();
    var sc = $("#streakChip");
    if (sc) sc.innerHTML = '<span class="flame">🔥</span> ' + state.streak + ' ' + (state.streak === 1 ? tr("streak") : tr("streak_pl")) + ' ' + tr("streak_tail");
    var qs = $("#quizCardSub");
    if (qs) qs.textContent = state.quizDone ? tr("quiz_card_done") : (NGS.QUIZ.length + " " + tr("quiz_card_open_a") + " " + (NGS.QUIZ.length * NGS.POINTS_PER_CORRECT) + " " + tr("quiz_card_open_b"));
    var arr = visibleArticles();
    if (arr.length === 0) {
      list.innerHTML = '<div class="feed-empty">' + tr("feed_empty") + '</div>';
      return;
    }
    list.innerHTML = arr.map(function (a, i) { return articleCard(a, i === 0); }).join("");
  }

  function toggleTopic(key) {
    if (state.selectedTopics[key]) delete state.selectedTopics[key];
    else state.selectedTopics[key] = true;
    renderFilterBar(); renderFeed();
    var pf = $("#pfInterests"); if (pf) renderProfileInterests();
  }

  /* ================= ONBOARDING ================= */
  function renderOnbGrid() {
    var grid = $("#onbGrid");
    if (!grid) return;
    grid.innerHTML = NGS.TOPICS.map(function (tp) {
      var sel = state.selectedTopics[tp.key] ? " sel" : "";
      return '<button class="onb-tile' + sel + '" data-onb="' + tp.key + '">' +
        '<span class="tick"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>' +
        '<span class="em">' + tp.emoji + '</span>' +
        '<span class="tl">' + esc(topicLabel(tp)) + '</span></button>';
    }).join("");
    updateOnbContinue();
  }

  function updateOnbContinue() {
    var n = Object.keys(state.selectedTopics).length;
    var btn = $("#onbContinue");
    if (!btn) return;
    btn.disabled = n === 0;
    btn.textContent = n === 0
      ? (EN() ? "Pick at least 1 topic" : "Wähle mindestens 1 Thema")
      : (EN() ? ("Continue with " + n + " topic" + (n === 1 ? "" : "s") + " →") : ("Weiter mit " + n + " Thema" + (n === 1 ? "" : "s") + " →"));
  }

  function renderOnboarding() { renderOnbGrid(); }

  function finishOnboarding(skip) {
    if (skip) state.selectedTopics = {};
    state.onboarded = true;
    renderFilterBar(); renderFeed();
    toast(skip ? "Du kannst Themen jederzeit im Profil wählen" : "Dein Feed ist personalisiert 🎯");
    go("feed");
  }

  /* ================= SAVED / MERKLISTE ================= */
  function renderSaved() {
    var list = $("#savedList");
    if (!list) return;
    var arr = NGS.ARTICLES.filter(function (a) { return state.saved[a.id]; });
    if (arr.length === 0) {
      list.innerHTML = '<div class="feed-empty">' + tr("saved_empty") + '</div>';
      return;
    }
    list.innerHTML = arr.map(function (a) { return articleCard(a, false); }).join("");
  }

  /* ================= DAILY QUIZ ================= */
  var quiz = { i: -1, score: 0, answered: false };

  function openQuiz() {
    quiz.i = -1; quiz.score = 0; quiz.answered = false;
    renderQuiz();
    go("quiz");
  }

  function renderQuiz() {
    var v = $("#quizView");
    if (!v) return;
    var Q = NGS.QUIZ, n = Q.length;

    if (quiz.i === -1) {
      v.innerHTML =
        '<div class="eyebrow">' + tr("quiz_eyebrow") + '</div>' +
        '<h2 class="h-lg" style="margin-top:6px">' + tr("quiz_title") + '</h2>' +
        '<p class="lead">' + n + ' ' + tr("quiz_intro_a") + ' ' + (NGS.POINTS_PER_CORRECT * n) + ' ' + tr("quiz_intro_b") + '</p>' +
        '<button class="btn" style="margin-top:22px" data-quiznext="1">' + tr("quiz_start") + '</button>' +
        (state.quizDone ? '<p style="text-align:center;color:var(--muted);font-size:12px;margin-top:14px">' + tr("quiz_practice") + '</p>' : '');
      return;
    }

    if (quiz.i >= n) { renderQuizResult(v, n); return; }

    var item = Q[quiz.i];
    var dots = '';
    for (var d = 0; d < n; d++) dots += '<i class="' + (d < quiz.i ? 'done' : (d === quiz.i ? 'now' : '')) + '"></i>';
    var letters = ["A", "B", "C", "D", "E"];
    var opts = qOpts(item).map(function (o, idx) {
      return '<button class="quiz-opt" data-quizopt="' + idx + '"><span class="ix">' + letters[idx] + '</span><span>' + esc(o) + '</span></button>';
    }).join("");

    v.innerHTML =
      '<div class="quiz-top"><div class="eyebrow">' + tr("quiz_question") + ' ' + (quiz.i + 1) + ' / ' + n + '</div><div class="progress-dots">' + dots + '</div></div>' +
      '<div class="quiz-q">' + esc(qText(item)) + '</div>' +
      '<div class="quiz-opts" id="quizOpts">' + opts + '</div>' +
      '<div id="quizAfter"></div>';
  }

  function answerQuiz(idx) {
    if (quiz.answered) return;
    quiz.answered = true;
    var item = NGS.QUIZ[quiz.i];
    var correct = item.correct;
    $all("#quizOpts .quiz-opt").forEach(function (b, i2) {
      if (i2 === correct) b.classList.add("correct");
      else if (i2 === idx) b.classList.add("wrong");
      else b.classList.add("dim");
      b.setAttribute("disabled", "true");
    });
    if (idx === correct) quiz.score++;
    var last = (quiz.i + 1 >= NGS.QUIZ.length);
    $("#quizAfter").innerHTML =
      '<div class="quiz-explain">' + (idx === correct ? '<b>' + tr("quiz_correct") + '</b>' : '<b>' + tr("quiz_wrong") + '</b>') + esc(qExpl(item)) + '</div>' +
      '<button class="btn" style="margin-top:16px" data-quiznext="1">' + (last ? tr("quiz_result_btn") : tr("quiz_nextq")) + '</button>';
  }

  function renderQuizResult(v, n) {
    var sc = quiz.score;
    var emoji = sc === n ? "🏆" : (sc >= Math.ceil(n / 2) ? "🎉" : "💪");
    var awarded = 0;
    if (!state.quizDone) {
      state.quizDone = true;
      awarded = sc * NGS.POINTS_PER_CORRECT;
      if (awarded) setPoints(state.points + awarded);
    }
    v.innerHTML =
      '<div class="quiz-result">' +
        '<div class="big-emoji">' + emoji + '</div>' +
        '<div class="quiz-score">' + sc + ' <small>/ ' + n + '</small></div>' +
        '<p class="sub">' + (sc === n ? tr("quiz_perfect") : tr("quiz_good")) + '</p>' +
        (awarded ? '<div class="quiz-earn">🎯 +' + awarded + ' ' + tr("quiz_earned") + '</div>'
                 : '<div class="quiz-earn" style="background:var(--blue-wash);color:var(--blue-deep);border-color:#DCE6FF">' + tr("quiz_already") + '</div>') +
        '<button class="btn" style="margin-top:20px" data-quizshare="1">' + tr("quiz_share") + '</button>' +
        '<button class="btn ghost" style="margin-top:10px" data-go="feed">' + tr("quiz_back") + '</button>' +
      '</div>';
  }

  function shareQuiz() {
    var n = NGS.QUIZ.length;
    var text = EN()
      ? ("I scored " + quiz.score + "/" + n + " in the NeXtGen Stimme daily quiz about Heilbronn. Can you beat it?")
      : ("Ich habe " + quiz.score + "/" + n + " im NeXtGen Stimme Daily Quiz über Heilbronn geschafft. Schaffst du mehr?");
    var data = { title: "NeXtGen Stimme — Daily Quiz", text: text, url: location.href };
    if (navigator.share) navigator.share(data).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text + " " + location.href).then(function () { toast(tr("t_quiz_copied")); });
    else toast(tr("t_share_no"));
  }

  /* ================= ARTICLE READER ================= */
  function findArticle(id) {
    for (var i = 0; i < NGS.ARTICLES.length; i++) if (NGS.ARTICLES[i].id === id) return NGS.ARTICLES[i];
    return null;
  }

  function openArticle(id) {
    state.currentArticleId = id;
    renderArticle();
    go("article");
  }

  function digestHtml(a) {
    var list = aAi(a);
    var bullets = list.map(function (txt, i) {
      return '<li class="in"><b>' + (i + 1) + '</b><span>' + esc(txt) + '</span></li>';
    }).join("");
    return '<div class="digest">' +
      '<div class="digest-head">' +
        '<span class="ai-tag"><svg viewBox="0 0 24 24"><path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z"/></svg>' + tr("ai_summary") + '</span>' +
        '<div class="seg">' +
          '<button data-setlang="de" class="' + (state.lang === "de" ? "on" : "") + '">DE</button>' +
          '<button data-setlang="en" class="' + (state.lang === "en" ? "on" : "") + '">EN</button>' +
        '</div>' +
      '</div>' +
      '<div class="ai-box"><ul>' + bullets + '</ul></div>' +
    '</div>';
  }

  function renderArticle() {
    var a = findArticle(state.currentArticleId);
    if (!a) return;
    var grad = NGS.topic(a.topic).grad;
    var saved = state.saved[a.id];
    $("#articleView").innerHTML =
      '<button class="reader-back" data-go="feed"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>' + tr("back_feed") + '</button>' +
      '<div class="reader-hero" style="background:' + grad + '">' +
        (NGS.coverArt ? NGS.coverArt(a) : '') +
        '<div class="rh-top"><span class="ac-cat">' + esc(catLabel(a)) + '</span>' + (a.premium ? '<span class="ac-prem">ST+</span>' : '') + '</div>' +
      '</div>' +
      '<h1 class="reader-title">' + esc(aTitle(a)) + '</h1>' +
      '<div class="reader-meta"><span>' + esc(a.date) + '</span><span>·</span><span>' + a.read + ' ' + tr("read_min") + '</span></div>' +
      '<p class="reader-dek">' + esc(aDek(a)) + '</p>' +
      '<div class="reader-actions">' +
        '<button class="ract' + (saved ? ' on' : '') + '" data-save="' + a.id + '"><svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg>' + (saved ? tr("saved") : tr("save")) + '</button>' +
        '<button class="ract" data-speak="1"><svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4zM16 9a4 4 0 010 6"/></svg>' + tr("listen") + '</button>' +
        '<button class="ract" data-share="1"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>' + tr("share") + '</button>' +
      '</div>' +
      digestHtml(a) +
      '<div class="reader-body">' + aBody(a).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") + '</div>' +
      '<a class="source-link" href="https://www.stimme.de" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24"><path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/></svg>' + tr("source") + '</a>' +
      '<div class="reader-disclaimer">' + tr("disclaimer") + '</div>';
  }

  function speakArticle() {
    var a = findArticle(state.currentArticleId);
    if (!a) return;
    if (!("speechSynthesis" in window)) { toast(tr("t_read_no")); return; }
    if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); toast(tr("t_read_stop")); return; }
    var u = new SpeechSynthesisUtterance(aTitle(a) + ". " + aBody(a).join(" "));
    u.lang = EN() ? "en-US" : "de-DE"; u.rate = 1.0;
    window.speechSynthesis.speak(u);
    toast(tr("t_read_start"));
  }

  function shareArticle() {
    var a = findArticle(state.currentArticleId);
    if (!a) return;
    var data = { title: "NeXtGen Stimme", text: aTitle(a) + " — " + aDek(a), url: location.href };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(aTitle(a) + " — " + location.href).then(function () { toast(tr("t_link")); });
    } else {
      toast(tr("t_share_no"));
    }
  }

  /* ================= PROFILE ================= */
  function renderProfileInterests() {
    var box = $("#pfInterests");
    if (!box) return;
    box.innerHTML = NGS.TOPICS.map(function (tp) {
      var on = state.selectedTopics[tp.key] ? " active" : "";
      return '<button class="filter-chip' + on + '" data-topic="' + tp.key + '">' + esc(topicLabel(tp)) + '</button>';
    }).join("");
  }

  function renderProfile() {
    var savedCount = Object.keys(state.saved).length;
    var picked = Object.keys(state.selectedTopics).length;
    $("#profileView").innerHTML =
      '<div class="profile-head">' +
        '<div class="avatar">E</div>' +
        '<div><div class="pf-name">Elif Demir</div>' +
        '<div class="pf-status"><span class="badge">' + tr("pf_member") + '</span> 🔥 ' + state.streak + ' ' + tr("streak_pl") + ' · Heilbronn</div></div>' +
      '</div>' +

      '<div class="stat-grid">' +
        '<div class="stat-cell"><div class="n" id="stPts">' + state.points + '</div><div class="l">' + tr("st_points") + '</div></div>' +
        '<div class="stat-cell"><div class="n">' + state.votes + '</div><div class="l">' + tr("st_votes") + '</div></div>' +
        '<div class="stat-cell"><div class="n">' + state.scans + '</div><div class="l">' + tr("st_scans") + '</div></div>' +
        '<div class="stat-cell" data-go="saved" style="cursor:pointer"><div class="n">' + savedCount + '</div><div class="l">' + tr("st_saved") + '</div></div>' +
      '</div>' +

      '<div class="section-title">' + tr("pf_topics") + '</div>' +
      '<div class="interests" id="pfInterests"></div>' +
      '<p style="font-size:12px;color:var(--muted);margin:10px 2px 0">' +
        (picked ? (tr("pf_personalized_a") + ' ' + picked + ' ' + tr("pf_personalized_b")) : tr("pf_choose")) + '</p>' +

      '<div class="section-title">' + tr("pf_settings") + '</div>' +
      '<div class="settings">' +
        '<div class="set-row">' +
          '<div class="sr-ic"><svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"/></svg></div>' +
          '<div class="sr-label"><b>' + tr("set_push_t") + '</b><span>' + tr("set_push_s") + '</span></div>' +
          '<button class="switch' + (state.settings.push ? ' on' : '') + '" data-switch="push"></button>' +
        '</div>' +
        '<div class="set-row">' +
          '<div class="sr-ic"><svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4zM16 9a4 4 0 010 6"/></svg></div>' +
          '<div class="sr-label"><b>' + tr("set_read_t") + '</b><span>' + tr("set_read_s") + '</span></div>' +
          '<button class="switch' + (state.settings.sound ? ' on' : '') + '" data-switch="sound"></button>' +
        '</div>' +
        '<div class="set-row">' +
          '<div class="sr-ic"><svg viewBox="0 0 24 24"><path d="M5 8h14M5 12h14M5 16h9"/></svg></div>' +
          '<div class="sr-label"><b>' + tr("set_lang_t") + '</b><span>' + tr("set_lang_s") + '</span></div>' +
          '<div class="seg">' +
            '<button data-setlang="de" class="' + (state.lang === "de" ? "on" : "") + '">DE</button>' +
            '<button data-setlang="en" class="' + (state.lang === "en" ? "on" : "") + '">EN</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<button class="reset-btn" data-reset="1">' + tr("reset") + '</button>';

    renderProfileInterests();
  }

  /* ================= PULSE / SWIPE ================= */
  function renderDots() {
    var d = $("#dots"); if (!d) return;
    d.innerHTML = "";
    NGS.CARDS.forEach(function (_, i) {
      var dot = document.createElement("i");
      if (i < state.pulseIndex) dot.className = "done";
      else if (i === state.pulseIndex) dot.className = "now";
      d.appendChild(dot);
    });
  }

  function ensureDeck() {
    if (deckEl.dataset.built === "1") return;
    deckEl.dataset.built = "1";
    buildCard();
  }

  function buildCard() {
    deckEl.innerHTML = "";
    if (state.pulseIndex >= NGS.CARDS.length) {
      var done = document.createElement("div");
      done.className = "swipe-card";
      done.style.cssText = "align-items:center;justify-content:center;text-align:center;padding:30px;cursor:default";
      done.innerHTML = '<div style="font-size:40px">🎉</div><h2 style="margin-top:10px">' + tr("pulse_done_t") + '</h2>' +
        '<p class="ask" style="margin-top:8px">' + tr("pulse_done_s") + '</p>' +
        '<button class="btn" style="margin-top:18px;width:auto;padding:13px 22px" data-go="wallet">' + tr("to_wallet") + '</button>';
      deckEl.appendChild(done);
      $("#actionsRow").style.visibility = "hidden";
      renderDots();
      return;
    }
    $("#actionsRow").style.visibility = "visible";
    var c = NGS.CARDS[state.pulseIndex];
    var card = document.createElement("div");
    card.className = "swipe-card";
    card.innerHTML =
      '<div class="stamp yes">' + tr("yes_caps") + '</div><div class="stamp no">' + tr("no_caps") + '</div>' +
      '<div class="cover ' + c.cover + '"><span class="cat">' + cCat(c) + '</span><span class="date">' + c.date + '</span></div>' +
      '<div class="body"><h2>' + cTitle(c) + '</h2><div class="ask">' + cAsk(c) + '</div><div class="spacer"></div>' +
      '<div class="swipe-legend"><span class="no">' + tr("swipe_no") + '</span><span class="yes">' + tr("swipe_yes") + '</span></div></div>' +
      buildResult(c);
    deckEl.appendChild(card);
    card._fling = NGS.attachSwipe(card, function (v) { reveal(card, v); });
    renderDots();
  }

  function buildResult(c) {
    return '<div class="result">' +
      '<div class="your-vote" data-yourvote></div>' +
      '<div class="stat yes"><div class="row"><span class="lab">' + tr("yes_caps") + '</span><span data-pct="yes">–</span></div><div class="bar"><i class="fill" data-fill="yes"></i></div></div>' +
      '<div class="stat no"><div class="row"><span class="lab">' + tr("no_caps") + '</span><span data-pct="no">–</span></div><div class="bar"><i class="fill" data-fill="no"></i></div></div>' +
      '<div class="vote-count" data-votecount></div>' +
      '<div class="ai-box"><span class="ai-tag"><svg viewBox="0 0 24 24"><path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z"/></svg>' + tr("ai_summary_3") + '</span>' +
      '<ul>' + cAi(c).map(function (txt, i) { return '<li><b>' + (i + 1) + '</b><span>' + txt + '</span></li>'; }).join("") + '</ul></div>' +
      '<div class="earned"><span>' + tr("vote_counted") + '</span><span class="plus">+' + NGS.POINTS_PER_VOTE + ' ' + tr("pts") + '</span></div>' +
      '<button class="btn" style="margin-top:14px" data-next="1">' + tr("next") + '</button>' +
    '</div>';
  }

  function setLoading(root) {
    root.querySelector('[data-pct="yes"]').textContent = "…";
    root.querySelector('[data-pct="no"]').textContent = "…";
    root.querySelector('[data-fill="yes"]').style.width = "0%";
    root.querySelector('[data-fill="no"]').style.width = "0%";
    var vc = root.querySelector("[data-votecount]");
    if (vc) vc.innerHTML = '<span class="live-dot"></span>' + tr("live_loading");
  }

  function applyResult(res, root, mode) {
    var yes = res.yes || 0, no = res.no || 0, total = yes + no;
    var yesPct = total ? Math.round(yes / total * 100) : 0;
    var noPct = total ? 100 - yesPct : 0;
    root.querySelector('[data-pct="yes"]').textContent = yesPct + "%";
    root.querySelector('[data-pct="no"]').textContent = noPct + "%";
    root.querySelector('[data-fill="yes"]').style.width = yesPct + "%";
    root.querySelector('[data-fill="no"]').style.width = noPct + "%";
    var vc = root.querySelector("[data-votecount]");
    if (!vc) return;
    if (mode === "live") {
      vc.innerHTML = '<span class="live-dot"></span><span class="live">' + tr("live_label") + '</span> · ' + total + ' ' + (total === 1 ? tr("stimme") : tr("stimmen"));
    } else if (mode === "error") {
      vc.innerHTML = '<span style="color:var(--muted)">' + tr("live_off") + '</span> · ' + tr("example");
    } else {
      vc.textContent = tr("example_dist");
    }
  }

  function reveal(card, v) {
    card.style.transition = "transform .35s ease";
    card.style.transform = "";
    var yes = card.querySelector(".stamp.yes"), no = card.querySelector(".stamp.no");
    if (yes) yes.style.opacity = 0;
    if (no) no.style.opacity = 0;
    var c = NGS.CARDS[state.pulseIndex];
    var cardId = "hn_card_" + state.pulseIndex;
    var res = card.querySelector(".result");
    $("#actionsRow").style.visibility = "hidden";
    res.querySelector("[data-yourvote]").innerHTML = tr("you_voted_fmt").replace("{v}", "<b>" + (v === "yes" ? tr("yes_caps") : tr("no_caps")) + "</b>");
    res.classList.add("show");

    if (NGS.Live.isConfigured()) {
      // real, live results — no fake seed; show a loading state until the server answers
      setLoading(res);
      NGS.Live.castVote(cardId, v).then(function (row) {
        if (row) applyResult({ yes: row.yes, no: row.no }, res, "live");
        else applyResult({ yes: c.yes, no: c.no }, res, "example");
      }).catch(function (err) {
        console.error("[Pulse] Live-Vote fehlgeschlagen:", (err && err.message) ? err.message : err);
        applyResult({ yes: c.yes, no: c.no }, res, "error");
      });
      if (currentSub) NGS.Live.unsubscribe(currentSub);
      currentSub = NGS.Live.subscribe(cardId, function (counts) { applyResult(counts, res, "live"); });
    } else {
      // offline fallback (Supabase not configured): example distribution
      setTimeout(function () { applyResult({ yes: c.yes, no: c.no }, res, "example"); }, 120);
    }

    res.querySelectorAll(".ai-box li").forEach(function (li, i) { setTimeout(function () { li.classList.add("in"); }, 350 + i * 180); });

    if (!card.dataset.scored) {
      card.dataset.scored = "1";
      state.votes++;
      setPoints(state.points + NGS.POINTS_PER_VOTE);
    }
  }

  /* ================= TOKEN SCAN ================= */
  function onTokenScanned() {
    NGS.Scanner.stop();
    state.scans++;
    setPoints(state.points + NGS.SCAN_BONUS);
    toast("✓ " + tr("t_unlocked") + " · +" + NGS.SCAN_BONUS + " " + tr("pts"));
    setTimeout(function () { openArticle(NGS.FEATURED_ID); }, 450);
  }

  function startCamera() {
    var hint = $("#scanHint"), note = $("#scanNote"), btn = $("#startCamBtn");
    NGS.Scanner.start($("#scanVideo"), {
      onResult: onTokenScanned,
      onStatus: function (kind, msg) {
        note.textContent = msg;
        if (kind === "running") { hint.textContent = tr("scan_hint"); btn.textContent = tr("scan_running"); }
        else if (kind === "starting") { hint.textContent = tr("scan_starting"); }
        else if (kind === "blocked" || kind === "error") { hint.textContent = tr("scan_blocked"); }
      }
    });
  }

  /* ================= RESET ================= */
  function resetDemo() {
    state.points = NGS.START_POINTS; state.pulseIndex = 0; state.votes = 0; state.scans = 0;
    state.saved = {}; state.savedAwarded = {}; state.selectedTopics = {}; state.lang = "de";
    state.perkUnlocked = false; state.currentArticleId = null; state.settings = { push: true, sound: false };
    state.onboarded = false; state.streak = 1;
    state.quizDone = false; quiz.i = -1; quiz.score = 0; quiz.answered = false;
    state.search = ""; var fse = $("#feedSearch"); if (fse) fse.value = "";
    var b = $("#perkCoffee"); b.className = "pk-cta off"; b.textContent = "100 pts"; b.onclick = null;
    deckEl.dataset.built = ""; deckEl.innerHTML = "";
    setPoints(NGS.START_POINTS);
    applyI18n();
    NGS.Scanner.stop();
    toast(tr("t_reset"));
    go("landing");
  }

  /* ================= SAVE ================= */
  function toggleSave(id, btn) {
    if (state.saved[id]) {
      delete state.saved[id];
      if (btn) { btn.classList.remove("on"); if (btn.classList.contains("ract")) btn.lastChild.textContent = tr("save"); }
      toast(tr("t_unsaved"));
    } else {
      state.saved[id] = true;
      if (btn) { btn.classList.add("on"); if (btn.classList.contains("ract")) btn.lastChild.textContent = tr("saved"); }
      if (!state.savedAwarded[id]) { state.savedAwarded[id] = true; setPoints(state.points + NGS.POINTS_PER_SAVE); toast(tr("t_saved_pts") + NGS.POINTS_PER_SAVE + " " + tr("pts")); }
      else toast(tr("t_saved"));
    }
  }

  /* ================= WIRING ================= */
  document.addEventListener("click", function (e) {
    var el;

    if ((el = e.target.closest("[data-save]"))) { toggleSave(el.dataset.save, el); return; }
    if ((el = e.target.closest("[data-article]"))) { openArticle(el.dataset.article); return; }

    if ((el = e.target.closest("[data-go]"))) { if (el.dataset.go !== "scan") NGS.Scanner.stop(); go(el.dataset.go); return; }
    if ((el = e.target.closest("[data-next]"))) { if (currentSub) { NGS.Live.unsubscribe(currentSub); currentSub = null; } state.pulseIndex++; buildCard(); go("pulse"); return; }
    if ((el = e.target.closest("[data-toast]"))) { toast(el.dataset.toast); return; }
    if ((el = e.target.closest("[data-speak]"))) { speakArticle(); return; }
    if ((el = e.target.closest("[data-share]"))) { shareArticle(); return; }
    if ((el = e.target.closest("[data-quizstart]"))) { openQuiz(); return; }
    if ((el = e.target.closest("[data-quizopt]"))) { answerQuiz(parseInt(el.dataset.quizopt, 10)); return; }
    if ((el = e.target.closest("[data-quiznext]"))) { quiz.answered = false; quiz.i++; renderQuiz(); return; }
    if ((el = e.target.closest("[data-quizshare]"))) { shareQuiz(); return; }
    if ((el = e.target.closest("[data-clear]"))) { state.selectedTopics = {}; renderFilterBar(); renderFeed(); var pf = $("#pfInterests"); if (pf) renderProfileInterests(); return; }
    if ((el = e.target.closest("[data-onb]"))) {
      var k = el.dataset.onb;
      if (state.selectedTopics[k]) delete state.selectedTopics[k]; else state.selectedTopics[k] = true;
      renderOnbGrid();
      return;
    }
    if ((el = e.target.closest("[data-skip]"))) { finishOnboarding(true); return; }
    if ((el = e.target.closest("[data-topic]"))) { toggleTopic(el.dataset.topic); return; }
    if ((el = e.target.closest("[data-setlang]"))) { setLang(el.dataset.setlang); return; }
    if ((el = e.target.closest("[data-switch]"))) { var k = el.dataset.switch; state.settings[k] = !state.settings[k]; el.classList.toggle("on", state.settings[k]); return; }
    if ((el = e.target.closest("[data-reset]"))) { resetDemo(); return; }

    if ((el = e.target.closest("[data-vote]"))) {
      var card = deckEl.querySelector(".swipe-card");
      if (card && card._fling && !card.querySelector(".result.show")) card._fling(el.dataset.vote);
      return;
    }

    if ((el = e.target.closest(".tab"))) {
      var t = el.dataset.tab;
      if (t !== "scan") NGS.Scanner.stop();
      go(t);
      return;
    }
  });

  $("#startCamBtn").addEventListener("click", startCamera);
  var feedSearchEl = $("#feedSearch");
  if (feedSearchEl) feedSearchEl.addEventListener("input", function (e) { state.search = e.target.value; renderFeed(); });
  $("#onbContinue").addEventListener("click", function () {
    if (Object.keys(state.selectedTopics).length) finishOnboarding(false);
  });
  $("#demoBtn").addEventListener("click", function () {
    NGS.Scanner.stop();
    state.scans++;
    setPoints(state.points + NGS.SCAN_BONUS);
    toast(tr("t_demo") + " · +" + NGS.SCAN_BONUS + " " + tr("pts"));
    setTimeout(function () { openArticle(NGS.FEATURED_ID); }, 350);
  });

  /* ---------------- init ---------------- */
  NGS.Live.init();
  try {
    var _src = new URLSearchParams(location.search).get("s");
    if (_src && NGS.Live.logScan) NGS.Live.logScan(_src === "app" ? "app" : _src);
  } catch (e) {}
  applyI18n();
  setPoints(NGS.START_POINTS);
  go("landing");
})();