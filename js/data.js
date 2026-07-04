/* ============================================================
   data.js — config, the topic taxonomy, and the Pulse cards.
   Bilingual: German fields + *En English fields. app.js picks
   the set based on state.lang. Articles live in articles.js.
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
  { key: "events",     label: "Events",       labelEn: "Events",        emoji: "🎉", grad: "linear-gradient(135deg,#2456FF,#16B364)" },
  { key: "food",       label: "Food & Cafés", labelEn: "Food & Cafés",  emoji: "☕", grad: "linear-gradient(135deg,#FF8A3D,#FF5A5F)" },
  { key: "transport",  label: "Verkehr",      labelEn: "Transport",     emoji: "🚲", grad: "linear-gradient(135deg,#0B1A40,#2456FF)" },
  { key: "campus",     label: "Campus",       labelEn: "Campus",        emoji: "🎓", grad: "linear-gradient(135deg,#2456FF,#6B43D9)" },
  { key: "culture",    label: "Kultur",       labelEn: "Culture",       emoji: "🎭", grad: "linear-gradient(135deg,#6B43D9,#B04AD9)" },
  { key: "sports",     label: "Sport",        labelEn: "Sports",        emoji: "⚽", grad: "linear-gradient(135deg,#1740C7,#16B364)" },
  { key: "innovation", label: "Innovation",   labelEn: "Innovation",    emoji: "🤖", grad: "linear-gradient(135deg,#0B1A40,#6B43D9)" }
];
NGS.topic = function (key) {
  for (var i = 0; i < NGS.TOPICS.length; i++) if (NGS.TOPICS[i].key === key) return NGS.TOPICS[i];
  return { key: key, label: key, labelEn: key, grad: "linear-gradient(135deg,#2456FF,#6B43D9)" };
};

/* ---- which article a scanned token unlocks ---- */
NGS.FEATURED_ID = "a2";

/* ---- Stimme Pulse swipe cards ---- */
NGS.CARDS = [
  {
    cat: "VERKEHR", catEn: "TRANSPORT", date: "16. Jun", cover: "v3",
    title: "E-Scooter in der Innenstadt verbieten?",
    titleEn: "Ban e-scooters in the city centre?",
    ask: "Heilbronn diskutiert über abgestellte Roller in der Fußgängerzone.",
    askEn: "Heilbronn is debating scooters left in the pedestrian zone.",
    yes: 36, no: 64,
    ai: [
      "Beschwerden über falsch geparkte Scooter stiegen 2025 laut Stadt um rund 17%.",
      "Befürworter sehen Scooter als wichtige letzte Meile zum Bildungscampus.",
      "Andere Städte testen Parkverbots-Zonen statt eines kompletten Verbots."
    ],
    aiEn: [
      "Complaints about badly parked scooters rose about 17% in 2025, the city says.",
      "Supporters see scooters as an important last mile to the Bildungscampus.",
      "Other cities are testing no-parking zones instead of a full ban."
    ]
  },
  {
    cat: "CAMPUS", catEn: "CAMPUS", date: "16. Jun", cover: "v1",
    title: "Längere Öffnungszeiten der Campus-Bib?",
    titleEn: "Longer opening hours for the campus library?",
    ask: "Viele Studierende lernen abends — die Bibliothek schließt aktuell früh.",
    askEn: "Many students study in the evening — the library currently closes early.",
    yes: 82, no: 18,
    ai: [
      "Über 80% der befragten Studierenden wünschen sich spätere Schließzeiten.",
      "Längere Zeiten bedeuten höhere Personalkosten für die Einrichtungen.",
      "Eine 24/7-Lernzone gilt als günstiger Kompromiss zwischen beiden Seiten."
    ],
    aiEn: [
      "Over 80% of students surveyed want later closing times.",
      "Longer hours mean higher staffing costs for the facilities.",
      "A 24/7 study zone is seen as a cheaper compromise between both sides."
    ]
  },
  {
    cat: "MOBILITÄT", catEn: "MOBILITY", date: "15. Jun", cover: "v2",
    title: "Mehr Nachtbusse am Wochenende?",
    titleEn: "More night buses on weekends?",
    ask: "Zwischen Campus und Innenstadt fahren nachts kaum Verbindungen.",
    askEn: "Between campus and the city centre there's barely any night service.",
    yes: 75, no: 25,
    ai: [
      "Letzte Verbindungen enden am Wochenende oft schon vor Mitternacht.",
      "Mehr Nachtbusse könnten Fahrten mit dem Auto deutlich reduzieren.",
      "Pilotlinien in vergleichbaren Städten waren am Wochenende gut ausgelastet."
    ],
    aiEn: [
      "Last connections often end before midnight on weekends.",
      "More night buses could noticeably cut car trips.",
      "Pilot lines in comparable cities were well used on weekends."
    ]
  },
  {
    cat: "STADTLEBEN", catEn: "CITY LIFE", date: "15. Jun", cover: "v4",
    title: "Günstiger BUGA-Eintritt für Studierende?",
    titleEn: "Cheaper BUGA entry for students?",
    ask: "Das Neckarufer wird umgestaltet — wer soll wie viel zahlen?",
    askEn: "The Neckar riverfront is being redesigned — who should pay how much?",
    yes: 88, no: 12,
    ai: [
      "Ein Studi-Tarif würde junge Menschen stärker mit der Stadt verbinden.",
      "Kritiker verweisen auf die Finanzierung der laufenden Pflegekosten.",
      "Kombi-Tickets mit ÖPNV gelten als möglicher Mittelweg."
    ],
    aiEn: [
      "A student rate would connect young people more strongly with the city.",
      "Critics point to funding the ongoing maintenance costs.",
      "Combo tickets with public transport are seen as a possible middle ground."
    ]
  }
];

/* ---- Daily Quiz: questions tied to the local feed stories ---- */
NGS.QUIZ = [
  {
    q: "Wofür steht der Innovation Park „Ipai\" in Heilbronn?",
    qEn: "What does Heilbronn's Innovation Park 'Ipai' stand for?",
    options: ["Künstliche Intelligenz", "Automobil-Industrie", "Internationale Politik", "Sportförderung"],
    optionsEn: ["Artificial intelligence", "Automotive industry", "International politics", "Sports funding"],
    correct: 0,
    explain: "Ipai = Innovation Park Artificial Intelligence — einer der größten KI-Standorte Europas.",
    explainEn: "Ipai = Innovation Park Artificial Intelligence — one of Europe's largest AI hubs."
  },
  {
    q: "Was testet der Bildungscampus laut Feed?",
    qEn: "What is the Bildungscampus testing, according to the feed?",
    options: ["Gratis-Mensa", "Lernzonen rund um die Uhr", "Kostenlose E-Scooter", "Ein neues Stadion"],
    optionsEn: ["Free canteen", "Around-the-clock study zones", "Free e-scooters", "A new stadium"],
    correct: 1,
    explain: "Ein Pilot bringt längere Öffnungszeiten und einen 24/7-Lernbereich per Studi-Ausweis.",
    explainEn: "A pilot brings longer hours and a 24/7 study area via student ID."
  },
  {
    q: "Was wird Heilbronn im Jahr 2027?",
    qEn: "What will Heilbronn become in 2027?",
    options: ["Kulturhauptstadt", "Fahrradstadt des Jahres", "Europäische Grüne Hauptstadt", "Universitätsstadt"],
    optionsEn: ["Capital of Culture", "Cycling city of the year", "European Green Capital", "University town"],
    correct: 2,
    explain: "Heilbronn ist 2027 Europäische Grüne Hauptstadt — deshalb die Debatte um weniger Autoverkehr.",
    explainEn: "Heilbronn is European Green Capital 2027 — hence the debate about less car traffic."
  },
  {
    q: "Wo findet das Heilbronner Volksfest statt?",
    qEn: "Where does the Heilbronn funfair take place?",
    options: ["Am Marktplatz", "Auf der Theresienwiese", "Im Bildungscampus", "Am Neckarufer"],
    optionsEn: ["At the market square", "On the Theresienwiese", "At the Bildungscampus", "On the riverfront"],
    correct: 1,
    explain: "Riesenrad, Fahrgeschäfte und Public Viewing gibt es auf der Theresienwiese — bis Mitte Juli.",
    explainEn: "Ferris wheel, rides and public viewing are on the Theresienwiese — until mid-July."
  },
  {
    q: "Welche Sportart spielen die Heilbronner Falken?",
    qEn: "Which sport do the Heilbronner Falken play?",
    options: ["Fußball", "Basketball", "Handball", "Eishockey"],
    optionsEn: ["Football", "Basketball", "Handball", "Ice hockey"],
    correct: 3,
    explain: "Die Falken sind das Eishockey-Team der Stadt — Heimspiele sind bei jungen Fans beliebt.",
    explainEn: "The Falken are the city's ice-hockey team — home games are popular with young fans."
  }
];