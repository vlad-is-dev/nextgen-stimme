/* ============================================================
   data.js — config, the topic taxonomy, and the Pulse cards.
   Articles live in articles.js. Edit Pulse questions here.
   ============================================================ */
window.NGS = window.NGS || {};

/* ---- economy ---- */
NGS.GOAL = 100;            // points for the first reward
NGS.START_POINTS = 20;     // granted on the landing hook
NGS.POINTS_PER_VOTE = 20;  // each Pulse vote
NGS.SCAN_BONUS = 10;       // unlocking a token story
NGS.POINTS_PER_SAVE = 5;   // saving an article
NGS.POINTS_PER_CORRECT = 10; // each correct Daily-Quiz answer

/* ---- topics: shared by the feed filter & profile interests ---- */
NGS.TOPICS = [
  { key: "events",     label: "Events",       emoji: "🎉", grad: "linear-gradient(135deg,#2456FF,#16B364)" },
  { key: "food",       label: "Food & Cafés", emoji: "☕", grad: "linear-gradient(135deg,#FF8A3D,#FF5A5F)" },
  { key: "transport",  label: "Verkehr",      emoji: "🚲", grad: "linear-gradient(135deg,#0B1A40,#2456FF)" },
  { key: "campus",     label: "Campus",       emoji: "🎓", grad: "linear-gradient(135deg,#2456FF,#6B43D9)" },
  { key: "culture",    label: "Kultur",       emoji: "🎭", grad: "linear-gradient(135deg,#6B43D9,#B04AD9)" },
  { key: "sports",     label: "Sport",        emoji: "⚽", grad: "linear-gradient(135deg,#1740C7,#16B364)" },
  { key: "innovation", label: "Innovation",   emoji: "🤖", grad: "linear-gradient(135deg,#0B1A40,#6B43D9)" }
];
NGS.topic = function (key) {
  for (var i = 0; i < NGS.TOPICS.length; i++) if (NGS.TOPICS[i].key === key) return NGS.TOPICS[i];
  return { key: key, label: key, grad: "linear-gradient(135deg,#2456FF,#6B43D9)" };
};

/* ---- which article a scanned token unlocks ---- */
NGS.FEATURED_ID = "a2";

/* ---- Stimme Pulse swipe cards ---- */
NGS.CARDS = [
  {
    cat: "VERKEHR", date: "16. Jun", cover: "v3",
    title: "E-Scooter in der Innenstadt verbieten?",
    ask: "Heilbronn diskutiert über abgestellte Roller in der Fußgängerzone.",
    yes: 36, no: 64,
    ai: [
      "Beschwerden über falsch geparkte Scooter stiegen 2025 laut Stadt um rund 17%.",
      "Befürworter sehen Scooter als wichtige letzte Meile zum Bildungscampus.",
      "Andere Städte testen Parkverbots-Zonen statt eines kompletten Verbots."
    ]
  },
  {
    cat: "CAMPUS", date: "16. Jun", cover: "v1",
    title: "Längere Öffnungszeiten der Campus-Bib?",
    ask: "Viele Studierende lernen abends — die Bibliothek schließt aktuell früh.",
    yes: 82, no: 18,
    ai: [
      "Über 80% der befragten Studierenden wünschen sich spätere Schließzeiten.",
      "Längere Zeiten bedeuten höhere Personalkosten für die Einrichtungen.",
      "Eine 24/7-Lernzone gilt als günstiger Kompromiss zwischen beiden Seiten."
    ]
  },
  {
    cat: "MOBILITÄT", date: "15. Jun", cover: "v2",
    title: "Mehr Nachtbusse am Wochenende?",
    ask: "Zwischen Campus und Innenstadt fahren nachts kaum Verbindungen.",
    yes: 75, no: 25,
    ai: [
      "Letzte Verbindungen enden am Wochenende oft schon vor Mitternacht.",
      "Mehr Nachtbusse könnten Fahrten mit dem Auto deutlich reduzieren.",
      "Pilotlinien in vergleichbaren Städten waren am Wochenende gut ausgelastet."
    ]
  },
  {
    cat: "STADTLEBEN", date: "15. Jun", cover: "v4",
    title: "Günstiger BUGA-Eintritt für Studierende?",
    ask: "Das Neckarufer wird umgestaltet — wer soll wie viel zahlen?",
    yes: 88, no: 12,
    ai: [
      "Ein Studi-Tarif würde junge Menschen stärker mit der Stadt verbinden.",
      "Kritiker verweisen auf die Finanzierung der laufenden Pflegekosten.",
      "Kombi-Tickets mit ÖPNV gelten als möglicher Mittelweg."
    ]
  }
];

/* ---- Daily Quiz: questions tied to the local feed stories ---- */
NGS.QUIZ = [
  {
    q: "Wofür steht der Innovation Park „Ipai\" in Heilbronn?",
    options: ["Künstliche Intelligenz", "Automobil-Industrie", "Internationale Politik", "Sportförderung"],
    correct: 0,
    explain: "Ipai = Innovation Park Artificial Intelligence — einer der größten KI-Standorte Europas."
  },
  {
    q: "Was testet der Bildungscampus laut Feed?",
    options: ["Gratis-Mensa", "Lernzonen rund um die Uhr", "Kostenlose E-Scooter", "Ein neues Stadion"],
    correct: 1,
    explain: "Ein Pilot bringt längere Öffnungszeiten und einen 24/7-Lernbereich per Studi-Ausweis."
  },
  {
    q: "Was wird Heilbronn im Jahr 2027?",
    options: ["Kulturhauptstadt", "Fahrradstadt des Jahres", "Europäische Grüne Hauptstadt", "Universitätsstadt"],
    correct: 2,
    explain: "Heilbronn ist 2027 Europäische Grüne Hauptstadt — deshalb die Debatte um weniger Autoverkehr."
  },
  {
    q: "Wo findet das Heilbronner Volksfest statt?",
    options: ["Am Marktplatz", "Auf der Theresienwiese", "Im Bildungscampus", "Am Neckarufer"],
    correct: 1,
    explain: "Riesenrad, Fahrgeschäfte und Public Viewing gibt es auf der Theresienwiese — bis Mitte Juli."
  },
  {
    q: "Welche Sportart spielen die Heilbronner Falken?",
    options: ["Fußball", "Basketball", "Handball", "Eishockey"],
    correct: 3,
    explain: "Die Falken sind das Eishockey-Team der Stadt — Heimspiele sind bei jungen Fans beliebt."
  }
];