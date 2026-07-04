/* ============================================================
   i18n.js — UI string dictionary for German (de) and English (en).
   Content (articles, pulse cards, quiz) carries its own *En
   fields next to the German originals. app.js reads strings via
   t(key) and swaps content based on state.lang.
   ============================================================ */
window.NGS = window.NGS || {};

NGS.I18N = {
  de: {
    tagline: "Your city. Your voice.",
    pts: "pts",

    /* landing */
    land_badge: "Bildungscampus · NeXtGen-Spot",
    land_h1: 'Du hast einen <em>geheimen Spot</em> am Campus gefunden.',
    land_p: "Kein Download. Tippe rein, scanne den NeXtGen-Token daneben und schalte eine lokale Story frei — plus deinen ersten Bonus.",
    land_chip1: "60-Sek-Story",
    land_chip2: "Swipe statt scrollen",
    land_chip3: "+20 Punkte sofort",
    land_cta: "Story freischalten →",
    land_foot: "Heilbronner Stimme · für Heilbronn 20–35",

    /* scan */
    scan_eyebrow: "3D-Token",
    scan_title: "Scanne den NeXtGen-Token",
    scan_lead: "Physische Tokens in der Stadt öffnen digitale Geschichten. Richte die Kamera auf den Token neben dir.",
    scan_hint: "Token im Rahmen ausrichten…",
    scan_start: "Kamera starten",
    scan_demo: "Keinen Token? Demo-Story öffnen",
    scan_note: "Die Kamera funktioniert auf der veröffentlichten HTTPS-Seite oder über localhost. In der Vorschau nutze „Demo-Story“.",
    scan_running: "Kamera läuft…",
    scan_starting: "Kamera wird gestartet…",
    scan_blocked: "Kamera blockiert",

    /* feed */
    greet_morning: "Guten Morgen ☀️",
    greet_afternoon: "Guten Tag 👋",
    greet_evening: "Guten Abend 🌙",
    feed_sub: "Dein Feed, Pulse und City-Perks für Heilbronn.",
    streak: "Tag", streak_pl: "Tage", streak_tail: "Streak · komm täglich für deinen Puls",
    pulse_card_t: "Tages-Puls",
    pulse_card_s: "Stimme heute über lokale Fragen ab",
    quiz_card_t: "Daily Quiz",
    quiz_card_done: "✓ heute erledigt — nochmal üben?",
    quiz_card_open_a: "Fragen · bis zu", quiz_card_open_b: "Punkte",
    search_ph: "Suche in Heilbronn…",
    filter_all: "Alle",
    min: "Min",
    feed_empty: "Keine Artikel zu diesen Themen.<br>Tippe oben auf „Alle“.",

    /* reader */
    back_feed: "Feed",
    read_min: "Min Lesezeit",
    save: "Merken", saved: "Gemerkt",
    listen: "Vorlesen", share: "Teilen",
    ai_summary: "KI-Zusammenfassung",
    source: "Originalquelle auf stimme.de öffnen",
    disclaimer: "Demo-Inhalt im Stil der Heilbronner Stimme · KI-Zusammenfassung automatisch erzeugt",

    /* pulse */
    pulse_eyebrow: "Stimme Pulse",
    pulse_title: "Wie tickt Heilbronn?",
    no_caps: "NEIN", yes_caps: "JA",
    swipe_no: "← NEIN", swipe_yes: "JA →",
    you_voted_fmt: "Du hast mit {v} abgestimmt:",
    ai_summary_3: "KI-Zusammenfassung · 3 Punkte",
    vote_counted: "Deine Stimme wurde gezählt",
    next: "Weiter →",
    pulse_done_t: "Stark, deine Stimme zählt.",
    pulse_done_s: "Du hast heute abgestimmt und Punkte gesammelt. Schau in deine Wallet.",
    to_wallet: "Zur Wallet →",
    live_loading: "Live-Ergebnisse werden geladen…",
    live_label: "live aus Heilbronn",
    stimme: "Stimme", stimmen: "Stimmen",
    live_off: "Live momentan nicht erreichbar", example: "Beispielwerte",
    example_dist: "Beispielverteilung · richte Supabase ein für echte Live-Stimmen",

    /* wallet */
    wallet_balance: "Dein Guthaben",
    wallet_left_a: "Punkte bis zum nächsten Reward", wallet_done: "Reward freigeschaltet 🎉",
    wallet_goal: "Ziel: 100",
    wallet_perks: "Deine Perks in Heilbronn",
    perk1_t: "Gratis Kaffee", perk1_s: "Café am Kiliansplatz · einlösbar mit 100 pts",
    perk2_t: "−20% BUGA-Tagesticket", perk2_s: "Für Studierende · Partner-Angebot",
    perk3_t: "1 Monat Stimme+ gratis", perk3_s: "Voller Zugriff auf stimme.de",
    redeem: "Einlösen",
    upsell_t: "Sichere deine Punkte",
    upsell_s: "Erstelle in 5 Sekunden ein Profil — deine Perks bleiben, kein Spam, keine Pflicht.",
    upsell_cta: "Profil ansehen",

    /* profile */
    pf_member: "NeXtGen Member",
    st_points: "Punkte", st_votes: "Stimmen", st_scans: "Scans", st_saved: "Gemerkt",
    pf_topics: "Bevorzugte Themen",
    pf_personalized_a: "Dein Feed ist auf", pf_personalized_b: "Thema(en) personalisiert.",
    pf_choose: "Wähle Themen, um deinen Feed zu personalisieren.",
    pf_settings: "Einstellungen",
    set_push_t: "Push-Benachrichtigungen", set_push_s: "Pulse-Erinnerung & neue Perks",
    set_read_t: "Artikel vorlesen", set_read_s: "Audio-Wiedergabe aktivieren",
    set_lang_t: "Sprache der App", set_lang_s: "Deutsch / English",
    reset: "Demo zurücksetzen",

    /* saved */
    saved_title: "Merkliste",
    saved_empty: "Noch nichts gemerkt.<br>Tippe auf das Lesezeichen, um Artikel hier zu sammeln.",

    /* quiz */
    quiz_eyebrow: "Daily Quiz",
    quiz_title: "Wie gut kennst du Heilbronn?",
    quiz_intro_a: "kurze Fragen zu den heutigen Stories — bis zu", quiz_intro_b: "Punkte.",
    quiz_start: "Quiz starten →",
    quiz_practice: "Heute schon gespielt — Üben ohne neue Punkte möglich.",
    quiz_question: "Frage",
    quiz_correct: "Richtig! ", quiz_wrong: "Knapp daneben. ",
    quiz_nextq: "Nächste Frage →", quiz_result_btn: "Ergebnis ansehen →",
    quiz_perfect: "Perfekt! Du kennst Heilbronn richtig gut.",
    quiz_good: "Stark — und du hast heute schon was über deine Stadt gelernt.",
    quiz_earned: "Punkte gesammelt", quiz_already: "Heute bereits gewertet",
    quiz_share: "Ergebnis teilen", quiz_back: "Zurück zum Feed",

    /* tabs */
    tab_home: "Home", tab_pulse: "Pulse", tab_wallet: "Wallet", tab_token: "Token", tab_profile: "Profil",

    /* toasts */
    t_unlocked: "Story freigeschaltet", t_demo: "Demo-Story geöffnet",
    t_token: "✓ Token erkannt", t_coffee: "☕ Code an Café am Kiliansplatz gesendet",
    t_saved: "Gemerkt", t_saved_pts: "Gemerkt · +", t_unsaved: "Aus Merkliste entfernt",
    t_read_start: "Vorlesen gestartet 🔊", t_read_stop: "Vorlesen gestoppt",
    t_read_no: "Vorlesen wird hier nicht unterstützt",
    t_link: "Link kopiert 🔗", t_share_no: "Teilen hier nicht verfügbar",
    t_reset: "Demo zurückgesetzt", t_quiz_copied: "Ergebnis kopiert 🔗"
  },

  en: {
    tagline: "Your city. Your voice.",
    pts: "pts",

    land_badge: "Education Campus · NeXtGen spot",
    land_h1: 'You just found a <em>secret spot</em> on campus.',
    land_p: "No download. Tap in, scan the NeXtGen token next to you and unlock a local story — plus your first bonus.",
    land_chip1: "60-sec story",
    land_chip2: "Swipe, don't scroll",
    land_chip3: "+20 points instantly",
    land_cta: "Unlock story →",
    land_foot: "Heilbronner Stimme · for Heilbronn 20–35",

    scan_eyebrow: "3D token",
    scan_title: "Scan the NeXtGen token",
    scan_lead: "Physical tokens around the city open digital stories. Point your camera at the token next to you.",
    scan_hint: "Line up the token in the frame…",
    scan_start: "Start camera",
    scan_demo: "No token? Open demo story",
    scan_note: "The camera works on the published HTTPS site or via localhost. In preview, use “Demo story”.",
    scan_running: "Camera running…",
    scan_starting: "Starting camera…",
    scan_blocked: "Camera blocked",

    greet_morning: "Good morning ☀️",
    greet_afternoon: "Good afternoon 👋",
    greet_evening: "Good evening 🌙",
    feed_sub: "Your feed, pulse and city perks for Heilbronn.",
    streak: "day", streak_pl: "days", streak_tail: "streak · come back daily for your pulse",
    pulse_card_t: "Daily Pulse",
    pulse_card_s: "Vote on local questions today",
    quiz_card_t: "Daily Quiz",
    quiz_card_done: "✓ done today — practice again?",
    quiz_card_open_a: "questions · up to", quiz_card_open_b: "points",
    search_ph: "Search in Heilbronn…",
    filter_all: "All",
    min: "min",
    feed_empty: "No articles for these topics.<br>Tap “All” above.",

    back_feed: "Feed",
    read_min: "min read",
    save: "Save", saved: "Saved",
    listen: "Listen", share: "Share",
    ai_summary: "AI summary",
    source: "Open original source on stimme.de",
    disclaimer: "Demo content in the style of Heilbronner Stimme · AI summary generated automatically",

    pulse_eyebrow: "Stimme Pulse",
    pulse_title: "How does Heilbronn tick?",
    no_caps: "NO", yes_caps: "YES",
    swipe_no: "← NO", swipe_yes: "YES →",
    you_voted_fmt: "You voted {v}:",
    ai_summary_3: "AI summary · 3 points",
    vote_counted: "Your vote was counted",
    next: "Next →",
    pulse_done_t: "Nice, your voice counts.",
    pulse_done_s: "You voted today and earned points. Check your wallet.",
    to_wallet: "To wallet →",
    live_loading: "Loading live results…",
    live_label: "live from Heilbronn",
    stimme: "vote", stimmen: "votes",
    live_off: "Live currently unavailable", example: "example values",
    example_dist: "Example distribution · set up Supabase for real live votes",

    wallet_balance: "Your balance",
    wallet_left_a: "points to your next reward", wallet_done: "Reward unlocked 🎉",
    wallet_goal: "Goal: 100",
    wallet_perks: "Your perks in Heilbronn",
    perk1_t: "Free coffee", perk1_s: "Café am Kiliansplatz · redeem with 100 pts",
    perk2_t: "−20% BUGA day ticket", perk2_s: "For students · partner offer",
    perk3_t: "1 month Stimme+ free", perk3_s: "Full access to stimme.de",
    redeem: "Redeem",
    upsell_t: "Secure your points",
    upsell_s: "Create a profile in 5 seconds — your perks stay, no spam, no obligation.",
    upsell_cta: "View profile",

    pf_member: "NeXtGen Member",
    st_points: "Points", st_votes: "Votes", st_scans: "Scans", st_saved: "Saved",
    pf_topics: "Preferred topics",
    pf_personalized_a: "Your feed is personalized to", pf_personalized_b: "topic(s).",
    pf_choose: "Pick topics to personalize your feed.",
    pf_settings: "Settings",
    set_push_t: "Push notifications", set_push_s: "Pulse reminder & new perks",
    set_read_t: "Read articles aloud", set_read_s: "Enable audio playback",
    set_lang_t: "App language", set_lang_s: "Deutsch / English",
    reset: "Reset demo",

    saved_title: "Saved",
    saved_empty: "Nothing saved yet.<br>Tap the bookmark to collect articles here.",

    quiz_eyebrow: "Daily Quiz",
    quiz_title: "How well do you know Heilbronn?",
    quiz_intro_a: "quick questions about today's stories — up to", quiz_intro_b: "points.",
    quiz_start: "Start quiz →",
    quiz_practice: "Already played today — practice without new points.",
    quiz_question: "Question",
    quiz_correct: "Correct! ", quiz_wrong: "So close. ",
    quiz_nextq: "Next question →", quiz_result_btn: "See result →",
    quiz_perfect: "Perfect! You really know Heilbronn.",
    quiz_good: "Strong — and you already learned something about your city today.",
    quiz_earned: "points earned", quiz_already: "Already counted today",
    quiz_share: "Share result", quiz_back: "Back to feed",

    tab_home: "Home", tab_pulse: "Pulse", tab_wallet: "Wallet", tab_token: "Token", tab_profile: "Profile",

    t_unlocked: "Story unlocked", t_demo: "Demo story opened",
    t_token: "✓ Token detected", t_coffee: "☕ Code sent to Café am Kiliansplatz",
    t_saved: "Saved", t_saved_pts: "Saved · +", t_unsaved: "Removed from saved",
    t_read_start: "Reading aloud 🔊", t_read_stop: "Reading stopped",
    t_read_no: "Read-aloud not supported here",
    t_link: "Link copied 🔗", t_share_no: "Sharing not available here",
    t_reset: "Demo reset", t_quiz_copied: "Result copied 🔗"
  }
};