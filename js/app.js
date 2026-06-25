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
    settings: { push: true, sound: false }
  };

  function $(s, el) { return (el || document).querySelector(s); }
  function $all(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

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
    if (name === "feed" && !state.onboarded) name = "onboarding";
    $all(".screen").forEach(function (s) { s.classList.toggle("active", s.id === "screen-" + name); });
    showShell(name !== "landing" && name !== "onboarding");
    var tabName = (name === "onboarding" || name === "saved" || name === "article") ? "feed" : name;
    $all(".tab").forEach(function (t) { t.classList.toggle("active", t.dataset.tab === tabName); });
    if (name === "feed") { renderFilterBar(); renderFeed(); }
    if (name === "onboarding") renderOnboarding();
    if (name === "saved") renderSaved();
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
    $("#walletNext").textContent = left > 0 ? (left + " Punkte bis zum nächsten Reward") : "Reward freigeschaltet 🎉";
    if (v >= NGS.GOAL && !state.perkUnlocked) unlockCoffee();
    var pill = $("#pointsPill");
    pill.classList.add("bump");
    setTimeout(function () { pill.classList.remove("bump"); }, 260);
  }

  function unlockCoffee() {
    state.perkUnlocked = true;
    var b = $("#perkCoffee");
    b.className = "pk-cta on";
    b.textContent = "Einlösen";
    b.onclick = function () { toast("☕ Code an Café am Kiliansplatz gesendet"); };
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
    if (h < 11) return "Guten Morgen ☀️";
    if (h < 18) return "Guten Tag 👋";
    return "Guten Abend 🌙";
  }

  /* ================= FEED ================= */
  function visibleArticles() {
    var keys = Object.keys(state.selectedTopics);
    if (keys.length === 0) return NGS.ARTICLES.slice();
    return NGS.ARTICLES.filter(function (a) { return state.selectedTopics[a.topic]; });
  }

  function renderFilterBar() {
    var bar = $("#filterBar");
    if (!bar) return;
    var none = Object.keys(state.selectedTopics).length === 0;
    var html = '<button class="filter-chip' + (none ? ' active' : '') + '" data-clear="1">Alle</button>';
    NGS.TOPICS.forEach(function (t) {
      var on = state.selectedTopics[t.key] ? " active" : "";
      html += '<button class="filter-chip' + on + '" data-topic="' + t.key + '">' + esc(t.label) + '</button>';
    });
    bar.innerHTML = html;
  }

  function articleCard(a, feature) {
    var grad = NGS.topic(a.topic).grad;
    var saved = state.saved[a.id] ? " on" : "";
    return '<article class="article-card' + (feature ? ' feature' : '') + '" data-article="' + a.id + '">' +
      '<div class="ac-cover" style="background:' + grad + '">' +
        '<span class="ac-cat">' + esc(a.cat) + '</span>' +
        (a.premium ? '<span class="ac-prem">ST+</span>' : '') +
      '</div>' +
      '<div class="ac-body">' +
        '<div class="ac-title">' + esc(a.title) + '</div>' +
        '<div class="ac-dek">' + esc(a.dek) + '</div>' +
        '<div class="ac-meta">' +
          '<span>' + esc(a.date) + '</span><span>·</span><span>' + a.read + ' Min</span>' +
          '<button class="ac-save' + saved + '" data-save="' + a.id + '" aria-label="Merken">' +
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
    if (sc) sc.innerHTML = '<span class="flame">🔥</span> ' + state.streak + ' Tag' + (state.streak === 1 ? '' : 'e') + ' Streak · komm täglich für deinen Puls';
    var arr = visibleArticles();
    if (arr.length === 0) {
      list.innerHTML = '<div class="feed-empty">Keine Artikel zu diesen Themen.<br>Tippe oben auf „Alle“.</div>';
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
    grid.innerHTML = NGS.TOPICS.map(function (t) {
      var sel = state.selectedTopics[t.key] ? " sel" : "";
      return '<button class="onb-tile' + sel + '" data-onb="' + t.key + '">' +
        '<span class="tick"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>' +
        '<span class="em">' + t.emoji + '</span>' +
        '<span class="tl">' + esc(t.label) + '</span></button>';
    }).join("");
    updateOnbContinue();
  }

  function updateOnbContinue() {
    var n = Object.keys(state.selectedTopics).length;
    var btn = $("#onbContinue");
    if (!btn) return;
    btn.disabled = n === 0;
    btn.textContent = n === 0 ? "Wähle mindestens 1 Thema" : ("Weiter mit " + n + " Thema" + (n === 1 ? "" : "s") + " →");
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
      list.innerHTML = '<div class="feed-empty">Noch nichts gemerkt.<br>Tippe auf das Lesezeichen, um Artikel hier zu sammeln.</div>';
      return;
    }
    list.innerHTML = arr.map(function (a) { return articleCard(a, false); }).join("");
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
    var list = state.lang === "en" ? a.aiEn : a.ai;
    var bullets = list.map(function (t, i) {
      return '<li class="in"><b>' + (i + 1) + '</b><span>' + esc(t) + '</span></li>';
    }).join("");
    return '<div class="digest">' +
      '<div class="digest-head">' +
        '<span class="ai-tag"><svg viewBox="0 0 24 24"><path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z"/></svg>KI-Zusammenfassung</span>' +
        '<div class="seg">' +
          '<button data-lang="de" class="' + (state.lang === "de" ? "on" : "") + '">DE</button>' +
          '<button data-lang="en" class="' + (state.lang === "en" ? "on" : "") + '">EN</button>' +
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
      '<button class="reader-back" data-go="feed"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>Feed</button>' +
      '<div class="reader-hero" style="background:' + grad + '">' +
        '<div class="rh-top"><span class="ac-cat">' + esc(a.cat) + '</span>' + (a.premium ? '<span class="ac-prem">ST+</span>' : '') + '</div>' +
      '</div>' +
      '<h1 class="reader-title">' + esc(a.title) + '</h1>' +
      '<div class="reader-meta"><span>' + esc(a.date) + '</span><span>·</span><span>' + a.read + ' Min Lesezeit</span></div>' +
      '<p class="reader-dek">' + esc(a.dek) + '</p>' +
      '<div class="reader-actions">' +
        '<button class="ract' + (saved ? ' on' : '') + '" data-save="' + a.id + '"><svg viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg>' + (saved ? 'Gemerkt' : 'Merken') + '</button>' +
        '<button class="ract" data-speak="1"><svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4zM16 9a4 4 0 010 6"/></svg>Vorlesen</button>' +
        '<button class="ract" data-share="1"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>Teilen</button>' +
      '</div>' +
      digestHtml(a) +
      '<div class="reader-body">' + a.body.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") + '</div>' +
      '<a class="source-link" href="https://www.stimme.de" target="_blank" rel="noopener">' +
        '<svg viewBox="0 0 24 24"><path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/></svg>Originalquelle auf stimme.de öffnen</a>' +
      '<div class="reader-disclaimer">Demo-Inhalt im Stil der Heilbronner Stimme · KI-Zusammenfassung automatisch erzeugt</div>';
  }

  function speakArticle() {
    var a = findArticle(state.currentArticleId);
    if (!a) return;
    if (!("speechSynthesis" in window)) { toast("Vorlesen wird hier nicht unterstützt"); return; }
    if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); toast("Vorlesen gestoppt"); return; }
    var u = new SpeechSynthesisUtterance(a.title + ". " + a.body.join(" "));
    u.lang = "de-DE"; u.rate = 1.0;
    window.speechSynthesis.speak(u);
    toast("Vorlesen gestartet 🔊");
  }
function shareArticle() {
    var a = findArticle(state.currentArticleId);
    if (!a) return;
    var data = { title: "NeXtGen Stimme", text: a.title + " — " + a.dek, url: location.href };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(a.title + " — " + location.href).then(function () { toast("Link kopiert 🔗"); });
    } else {
      toast("Teilen hier nicht verfügbar");
    }
  }
  /* ================= PROFILE ================= */
  function renderProfileInterests() {
    var box = $("#pfInterests");
    if (!box) return;
    box.innerHTML = NGS.TOPICS.map(function (t) {
      var on = state.selectedTopics[t.key] ? " active" : "";
      return '<button class="filter-chip' + on + '" data-topic="' + t.key + '">' + esc(t.label) + '</button>';
    }).join("");
  }

  function renderProfile() {
    var savedCount = Object.keys(state.saved).length;
    var picked = Object.keys(state.selectedTopics).length;
    $("#profileView").innerHTML =
      '<div class="profile-head">' +
        '<div class="avatar">E</div>' +
        '<div><div class="pf-name">Elif Demir</div>' +
        '<div class="pf-status"><span class="badge">NeXtGen Member</span> 🔥 ' + state.streak + ' Tage · Heilbronn</div></div>' +
      '</div>' +

      '<div class="stat-grid">' +
        '<div class="stat-cell"><div class="n" id="stPts">' + state.points + '</div><div class="l">Punkte</div></div>' +
        '<div class="stat-cell"><div class="n">' + state.votes + '</div><div class="l">Stimmen</div></div>' +
        '<div class="stat-cell"><div class="n">' + state.scans + '</div><div class="l">Scans</div></div>' +
        '<div class="stat-cell" data-go="saved" style="cursor:pointer"><div class="n">' + savedCount + '</div><div class="l">Gemerkt</div></div>' +
      '</div>' +

      '<div class="section-title">Bevorzugte Themen</div>' +
      '<div class="interests" id="pfInterests"></div>' +
      '<p style="font-size:12px;color:var(--muted);margin:10px 2px 0">' +
        (picked ? 'Dein Feed ist auf ' + picked + ' Thema(en) personalisiert.' : 'Wähle Themen, um deinen Feed zu personalisieren.') + '</p>' +

      '<div class="section-title">Einstellungen</div>' +
      '<div class="settings">' +
        '<div class="set-row">' +
          '<div class="sr-ic"><svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"/></svg></div>' +
          '<div class="sr-label"><b>Push-Benachrichtigungen</b><span>Pulse-Erinnerung & neue Perks</span></div>' +
          '<button class="switch' + (state.settings.push ? ' on' : '') + '" data-switch="push"></button>' +
        '</div>' +
        '<div class="set-row">' +
          '<div class="sr-ic"><svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4zM16 9a4 4 0 010 6"/></svg></div>' +
          '<div class="sr-label"><b>Artikel vorlesen</b><span>Audio-Wiedergabe aktivieren</span></div>' +
          '<button class="switch' + (state.settings.sound ? ' on' : '') + '" data-switch="sound"></button>' +
        '</div>' +
        '<div class="set-row">' +
          '<div class="sr-ic"><svg viewBox="0 0 24 24"><path d="M5 8h14M5 12h14M5 16h9"/></svg></div>' +
          '<div class="sr-label"><b>Sprache der KI-Zusammenfassung</b><span>Standard im Reader</span></div>' +
          '<div class="seg">' +
            '<button data-lang="de" class="' + (state.lang === "de" ? "on" : "") + '">DE</button>' +
            '<button data-lang="en" class="' + (state.lang === "en" ? "on" : "") + '">EN</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<button class="reset-btn" data-reset="1">Demo zurücksetzen</button>';

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
      done.innerHTML = '<div style="font-size:40px">🎉</div><h2 style="margin-top:10px">Stark, deine Stimme zählt.</h2>' +
        '<p class="ask" style="margin-top:8px">Du hast heute abgestimmt und Punkte gesammelt. Schau in deine Wallet.</p>' +
        '<button class="btn" style="margin-top:18px;width:auto;padding:13px 22px" data-go="wallet">Zur Wallet →</button>';
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
      '<div class="stamp yes">JA</div><div class="stamp no">NEIN</div>' +
      '<div class="cover ' + c.cover + '"><span class="cat">' + c.cat + '</span><span class="date">' + c.date + '</span></div>' +
      '<div class="body"><h2>' + c.title + '</h2><div class="ask">' + c.ask + '</div><div class="spacer"></div>' +
      '<div class="swipe-legend"><span class="no">← NEIN</span><span class="yes">JA →</span></div></div>' +
      buildResult(c);
    deckEl.appendChild(card);
    card._fling = NGS.attachSwipe(card, function (v) { reveal(card, v); });
    renderDots();
  }

  function buildResult(c) {
    return '<div class="result">' +
      '<div class="your-vote" data-yourvote></div>' +
      '<div class="stat yes"><div class="row"><span class="lab">JA</span><span data-pct="yes">–</span></div><div class="bar"><i class="fill" data-fill="yes"></i></div></div>' +
      '<div class="stat no"><div class="row"><span class="lab">NEIN</span><span data-pct="no">–</span></div><div class="bar"><i class="fill" data-fill="no"></i></div></div>' +
      '<div class="vote-count" data-votecount></div>' +
      '<div class="ai-box"><span class="ai-tag"><svg viewBox="0 0 24 24"><path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z"/></svg>KI-Zusammenfassung · 3 Punkte</span>' +
      '<ul>' + c.ai.map(function (t, i) { return '<li><b>' + (i + 1) + '</b><span>' + t + '</span></li>'; }).join("") + '</ul></div>' +
      '<div class="earned"><span>Deine Stimme wurde gezählt</span><span class="plus">+' + NGS.POINTS_PER_VOTE + ' pts</span></div>' +
      '<button class="btn" style="margin-top:14px" data-next="1">Weiter →</button>' +
    '</div>';
  }

  function setLoading(root) {
    root.querySelector('[data-pct="yes"]').textContent = "…";
    root.querySelector('[data-pct="no"]').textContent = "…";
    root.querySelector('[data-fill="yes"]').style.width = "0%";
    root.querySelector('[data-fill="no"]').style.width = "0%";
    var vc = root.querySelector("[data-votecount]");
    if (vc) vc.innerHTML = '<span class="live-dot"></span>Live-Ergebnisse werden geladen…';
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
      vc.innerHTML = '<span class="live-dot"></span><span class="live">live aus Heilbronn</span> · ' + total + (total === 1 ? " Stimme" : " Stimmen");
    } else if (mode === "error") {
      vc.innerHTML = '<span style="color:var(--muted)">Live momentan nicht erreichbar</span> · Beispielwerte';
    } else {
      vc.textContent = "Beispielverteilung · richte Supabase ein für echte Live-Stimmen";
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
    res.querySelector("[data-yourvote]").innerHTML = "Du hast mit <b>" + (v === "yes" ? "JA" : "NEIN") + "</b> abgestimmt:";
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
    toast("✓ Story freigeschaltet · +" + NGS.SCAN_BONUS + " pts");
    setTimeout(function () { openArticle(NGS.FEATURED_ID); }, 450);
  }

  function startCamera() {
    var hint = $("#scanHint"), note = $("#scanNote"), btn = $("#startCamBtn");
    NGS.Scanner.start($("#scanVideo"), {
      onResult: onTokenScanned,
      onStatus: function (kind, msg) {
        note.textContent = msg;
        if (kind === "running") { hint.textContent = "Token im Rahmen ausrichten…"; btn.textContent = "Kamera läuft…"; }
        else if (kind === "starting") { hint.textContent = "Kamera wird gestartet…"; }
        else if (kind === "blocked" || kind === "error") { hint.textContent = "Kamera blockiert"; }
      }
    });
  }

  /* ================= RESET ================= */
  function resetDemo() {
    state.points = NGS.START_POINTS; state.pulseIndex = 0; state.votes = 0; state.scans = 0;
    state.saved = {}; state.savedAwarded = {}; state.selectedTopics = {}; state.lang = "de";
    state.perkUnlocked = false; state.currentArticleId = null; state.settings = { push: true, sound: false };
    state.onboarded = false; state.streak = 1;
    var b = $("#perkCoffee"); b.className = "pk-cta off"; b.textContent = "100 pts"; b.onclick = null;
    deckEl.dataset.built = ""; deckEl.innerHTML = "";
    setPoints(NGS.START_POINTS);
    NGS.Scanner.stop();
    toast("Demo zurückgesetzt");
    go("landing");
  }

  /* ================= SAVE ================= */
  function toggleSave(id, btn) {
    if (state.saved[id]) {
      delete state.saved[id];
      if (btn) { btn.classList.remove("on"); if (btn.classList.contains("ract")) btn.lastChild.textContent = "Merken"; }
      toast("Aus Merkliste entfernt");
    } else {
      state.saved[id] = true;
      if (btn) { btn.classList.add("on"); if (btn.classList.contains("ract")) btn.lastChild.textContent = "Gemerkt"; }
      if (!state.savedAwarded[id]) { state.savedAwarded[id] = true; setPoints(state.points + NGS.POINTS_PER_SAVE); toast("Gemerkt · +" + NGS.POINTS_PER_SAVE + " pts"); }
      else toast("Gemerkt");
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
    if ((el = e.target.closest("[data-clear]"))) { state.selectedTopics = {}; renderFilterBar(); renderFeed(); var pf = $("#pfInterests"); if (pf) renderProfileInterests(); return; }
    if ((el = e.target.closest("[data-onb]"))) {
      var k = el.dataset.onb;
      if (state.selectedTopics[k]) delete state.selectedTopics[k]; else state.selectedTopics[k] = true;
      renderOnbGrid();
      return;
    }
    if ((el = e.target.closest("[data-skip]"))) { finishOnboarding(true); return; }
    if ((el = e.target.closest("[data-topic]"))) { toggleTopic(el.dataset.topic); return; }
    if ((el = e.target.closest("[data-lang]"))) {
      state.lang = el.dataset.lang;
      if (state.currentArticleId && $("#screen-article").classList.contains("active")) renderArticle();
      var pv = $("#profileView"); if (pv && $("#screen-profile").classList.contains("active")) renderProfile();
      return;
    }
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
  $("#onbContinue").addEventListener("click", function () {
    if (Object.keys(state.selectedTopics).length) finishOnboarding(false);
  });
  $("#demoBtn").addEventListener("click", function () {
    NGS.Scanner.stop();
    state.scans++;
    setPoints(state.points + NGS.SCAN_BONUS);
    toast("Demo-Story geöffnet · +" + NGS.SCAN_BONUS + " pts");
    setTimeout(function () { openArticle(NGS.FEATURED_ID); }, 350);
  });

  /* ---------------- init ---------------- */
  NGS.Live.init();
  setPoints(NGS.START_POINTS);
  go("landing");
})();