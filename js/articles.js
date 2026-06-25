/* ============================================================
   articles.js — the Home feed content.
   Original copy written for this prototype in the style of a
   regional outlet, grounded in real Heilbronn topics (Ipai,
   Bildungscampus, experimenta, Neckarmeile, Green Capital 2027,
   Schwarz Digits ...). Not copied from any publication.
   Each article carries a German AI digest (ai) and an English
   one (aiEn) — the "English-friendly summaries" feature.
   ============================================================ */
window.NGS = window.NGS || {};

NGS.ARTICLES = [
  {
    id: "a1", topic: "innovation", cat: "INNOVATION", date: "23. Jun", read: 4, premium: true,
    title: "Ipai: Wie Heilbronns KI-Campus die Stadt verändert",
    dek: "Auf dem Innovation Park entstehen tausende Jobs rund um Künstliche Intelligenz – was das für junge Talente in der Region heißt.",
    body: [
      "Am Rand von Heilbronn wächst einer der größten KI-Standorte Europas heran. Forschung, Startups und etablierte Firmen sollen hier unter einem Dach zusammenarbeiten – und genau das macht den Campus für junge Menschen interessant, die nach dem Studium nicht automatisch nach Stuttgart oder Berlin abwandern wollen.",
      "Für Studierende des Bildungscampus liegt der Reiz in der Nähe: Praktika, Werkstudentenstellen und erste Gründungsideen sind plötzlich fußläufig erreichbar. Wer früh Kontakte knüpft, hat beim Berufseinstieg in der Region einen klaren Vorsprung."
    ],
    ai: [
      "Der Innovation Park bündelt KI-Forschung, Startups und Industrie an einem Standort in Heilbronn.",
      "Für Studierende entstehen Praktika, Werkstudentenjobs und Gründungschancen direkt vor der Tür.",
      "Das Projekt soll helfen, junge Talente in der Region zu halten statt sie abwandern zu lassen."
    ],
    aiEn: [
      "Heilbronn's Innovation Park brings AI research, startups and industry onto one campus.",
      "Students gain nearby internships, working-student jobs and a real shot at founding something.",
      "The goal: keep young talent in the region instead of losing it to bigger cities."
    ]
  },
  {
    id: "a2", topic: "campus", cat: "CAMPUS", date: "22. Jun", read: 3, premium: false,
    title: "Bildungscampus: Lernzonen bald rund um die Uhr",
    dek: "Studierende lernen am liebsten abends – jetzt testen die Einrichtungen längere Öffnungszeiten und einen 24/7-Bereich.",
    body: [
      "Wer kennt es nicht: Die beste Lernphase beginnt, wenn die Bibliothek schon zumacht. Am Bildungscampus soll damit Schluss sein. In einem Pilotversuch bleibt ein Teil der Lernzonen künftig deutlich länger geöffnet, ein abgetrennter Bereich sogar rund um die Uhr.",
      "Der Zugang läuft über den Studierendenausweis, nachts gilt ein reduziertes Sicherheitskonzept. Wie groß der 24/7-Bereich am Ende wird, hängt auch davon ab, wie stark er in den ersten Wochen genutzt wird."
    ],
    ai: [
      "Ein Teil der Lernzonen am Bildungscampus wird testweise deutlich länger geöffnet.",
      "Ein abgetrennter Bereich soll künftig rund um die Uhr per Studi-Ausweis nutzbar sein.",
      "Wie groß die 24/7-Zone wird, entscheidet die Nutzung in den ersten Pilotwochen."
    ],
    aiEn: [
      "Part of the Bildungscampus study zones will stay open much longer in a pilot.",
      "A separate area is set to be accessible 24/7 via student ID.",
      "How big the round-the-clock zone gets depends on usage in the first weeks."
    ]
  },
  {
    id: "a3", topic: "innovation", cat: "INNOVATION", date: "21. Jun", read: 3, premium: false,
    title: "Heilbronner Student baut Filter gegen Reifen-Mikroplastik",
    dek: "Reifenabrieb ist eine der größten Mikroplastik-Quellen. Ein Tüftler aus der Region hat dafür eine überraschend einfache Lösung.",
    body: [
      "Bei jeder Autofahrt löst sich winziger Abrieb von den Reifen – ein Großteil davon landet als Mikroplastik in Böden, Wasser und Luft. Ein Student aus Heilbronn setzt genau dort an und hat ein System entwickelt, das die Partikel auffängt, bevor sie sich verteilen.",
      "Noch ist es ein Prototyp, doch das Interesse ist groß. Gerade in einem Mobilitäts- und Industriestandort wie der Region Heilbronn könnte aus der Idee mehr werden als ein Studienprojekt."
    ],
    ai: [
      "Reifenabrieb zählt zu den größten Quellen von Mikroplastik in der Umwelt.",
      "Ein Heilbronner Student fängt die Partikel mit einem eigenen System am Fahrzeug auf.",
      "Noch ist es ein Prototyp – das Interesse aus Industrie und Forschung ist aber groß."
    ],
    aiEn: [
      "Tyre wear is one of the biggest sources of microplastics in the environment.",
      "A Heilbronn student captures the particles with a system mounted on the vehicle.",
      "It's still a prototype, but industry and research interest is already strong."
    ]
  },
  {
    id: "a4", topic: "culture", cat: "KULTUR", date: "18. Jun", read: 2, premium: false,
    title: "Lichterfest an der Neckarmeile: Das Programm für drei Abende",
    dek: "Lasershows, vier Bühnen und ein neues Pfandsystem – das Lichterfest verwandelt das Neckarufer in eine Lichtbühne.",
    body: [
      "Wenn es dunkel wird, gehört die Neckarmeile dem Licht. An mehreren Abenden verwandeln Installationen und Lasershows das Ufer in eine begehbare Bühne, dazu gibt es Musik auf verteilten Bühnen und Stände entlang des Wassers.",
      "Neu in diesem Jahr: ein Mehrweg-Pfandsystem für weniger Müll und ein überarbeitetes Showkonzept. Der Eintritt zum Bummeln ist frei – perfekt für einen spontanen Abend mit Freunden."
    ],
    ai: [
      "Das Lichterfest bespielt die Neckarmeile mit Lasershows, Installationen und vier Bühnen.",
      "Neu sind ein Mehrweg-Pfandsystem und ein überarbeitetes Showkonzept.",
      "Der Eintritt zum Flanieren ist frei und eignet sich gut für einen spontanen Abend."
    ],
    aiEn: [
      "The Lichterfest fills the Neckar promenade with laser shows, installations and four stages.",
      "New this year: a reusable deposit system and a reworked show concept.",
      "Strolling is free — a great spontaneous evening out with friends."
    ]
  },
  {
    id: "a5", topic: "events", cat: "EVENTS", date: "17. Jun", read: 2, premium: false,
    title: "Volksfest auf der Theresienwiese: Was dich erwartet",
    dek: "Riesenrad, Public Viewing und vergünstigte Tage – das Heilbronner Volksfest läuft bis Mitte Juli.",
    body: [
      "Riesenrad, Fahrgeschäfte und jede Menge Imbissstände: Auf der Theresienwiese ist wieder Volksfest. An mehreren Familien- und Aktionstagen gibt es vergünstigte Preise, abends sorgt ein Musikprogramm für Stimmung.",
      "Wer die Fußball-WM verfolgt, kommt ebenfalls auf seine Kosten – an Public-Viewing-Bereichen werden die wichtigsten Spiele übertragen. Bis Mitte Juli bleibt die Wiese das Wochenend-Ziel Nummer eins."
    ],
    ai: [
      "Das Volksfest auf der Theresienwiese läuft mit Fahrgeschäften und Riesenrad bis Mitte Juli.",
      "An Aktionstagen gibt es vergünstigte Preise, abends ein Musikprogramm.",
      "WM-Spiele werden in Public-Viewing-Bereichen direkt auf dem Fest gezeigt."
    ],
    aiEn: [
      "The funfair on Theresienwiese runs with rides and a Ferris wheel until mid-July.",
      "Special days bring cheaper prices; evenings have live music.",
      "World Cup matches are shown in public-viewing areas right on site."
    ]
  },
  {
    id: "a6", topic: "sports", cat: "SPORT", date: "16. Jun", read: 3, premium: true,
    title: "Frankenstadion wird umgebaut – Heilbronn träumt vom Spitzenfußball",
    dek: "Für Millionen wird die Arena modernisiert. Bis zum Saisonstart bleibt wenig Zeit.",
    body: [
      "Der Rasen ist abgetragen, die Bagger rollen: Das Frankenstadion bekommt eine millionenschwere Modernisierung. Ziel ist eine Arena, die höherklassigen Fußball in Heilbronn überhaupt erst möglich macht.",
      "Sportlich wie organisatorisch ist das ein Kraftakt. Mehrere Vereine müssen sich über die Nutzung einigen, und bis zum Saisonstart im Spätsommer drückt die Zeit. Für junge Fans könnte sich der Aufwand lohnen – Heimspiele auf höherem Niveau wären ein echter Anziehungspunkt."
    ],
    ai: [
      "Das Frankenstadion wird für mehrere Millionen Euro modernisiert.",
      "Ziel ist eine Arena, die höherklassigen Fußball in Heilbronn ermöglicht.",
      "Bis zum Saisonstart bleibt wenig Zeit, und mehrere Vereine müssen sich abstimmen."
    ],
    aiEn: [
      "The Frankenstadion is getting a multi-million-euro modernisation.",
      "The aim is an arena that makes higher-level football in Heilbronn possible.",
      "Time is tight before kickoff, and several clubs must agree on usage."
    ]
  },
  {
    id: "a7", topic: "transport", cat: "VERKEHR", date: "15. Jun", read: 3, premium: true,
    title: "Green Capital 2027: Wird die Friedrich-Ebert-Brücke gesperrt?",
    dek: "Im Grüne-Hauptstadt-Jahr werden Ideen für weniger Autoverkehr diskutiert – der Handel ist skeptisch.",
    body: [
      "Heilbronn wird 2027 Europäische Grüne Hauptstadt – und schon jetzt wird über Maßnahmen gestritten. Eine Idee: die Friedrich-Ebert-Brücke zeitweise für Autos zu sperren und mehr Raum für Rad und Fuß zu schaffen.",
      "Teile des Handels warnen vor Umsatzeinbußen und schwerer Erreichbarkeit. Befürworter sehen die Chance, die Innenstadt lebenswerter zu machen. Für junge Pendler hängt viel davon ab, wie gut Bus, Bahn und Rad die Lücke füllen."
    ],
    ai: [
      "Heilbronn ist 2027 Europäische Grüne Hauptstadt; erste Maßnahmen werden diskutiert.",
      "Im Gespräch ist eine zeitweise Sperrung der Friedrich-Ebert-Brücke für Autos.",
      "Der Handel fürchtet Umsatzeinbußen, Befürworter erhoffen mehr Aufenthaltsqualität."
    ],
    aiEn: [
      "Heilbronn is European Green Capital 2027 and first measures are under debate.",
      "One idea: temporarily closing the Friedrich-Ebert bridge to cars.",
      "Retailers fear lost sales; supporters hope for a more liveable city centre."
    ]
  },
  {
    id: "a8", topic: "food", cat: "FOOD & CAFÉS", date: "14. Jun", read: 2, premium: false,
    title: "Drei neue Cafés, die Heilbronn gerade feiert",
    dek: "Specialty Coffee, Matcha und lange Tische zum Arbeiten – diese Spots lohnen den Umweg.",
    body: [
      "Die Café-Szene in Heilbronn wird jünger. Gleich mehrere neue Spots setzen auf Specialty Coffee, hausgemachtes Gebäck und genug Steckdosen zum Arbeiten – ideal für alle, die Laptop und Latte verbinden wollen.",
      "Was auffällt: Viele der neuen Orte verstehen sich als Treffpunkt, nicht nur als Kaffeebar. Gemeinschaftstische, kleine Events und wechselnde Karten machen aus dem Kaffeestopp schnell einen halben Nachmittag."
    ],
    ai: [
      "Heilbronns Café-Szene wird jünger, mit Fokus auf Specialty Coffee und Arbeitsplätze.",
      "Viele neue Spots verstehen sich als Treffpunkt mit Gemeinschaftstischen und Events.",
      "Aus einem Kaffeestopp wird so schnell ein ganzer Nachmittag."
    ],
    aiEn: [
      "Heilbronn's café scene is getting younger, with specialty coffee and work-friendly spots.",
      "Many new places see themselves as meeting points with shared tables and events.",
      "A quick coffee easily turns into a whole afternoon."
    ]
  },
  {
    id: "a9", topic: "events", cat: "EVENTS", date: "14. Jun", read: 2, premium: false,
    title: "WM 2026: Wo du in Heilbronn Public Viewing findest",
    dek: "Von der Theresienwiese bis zu Bars in der Innenstadt – hier siehst du die Spiele gemeinsam.",
    body: [
      "Die Fußball-WM ist in vollem Gange, und in Heilbronn wird gemeinsam gefiebert. Auf dem Volksfest gibt es Public-Viewing-Flächen, dazu übertragen zahlreiche Bars und Lokale in der Innenstadt die wichtigsten Partien.",
      "Tipp: Bei großen Spielen früh da sein, gerade die beliebten Plätze sind schnell voll. Wer es ruhiger mag, findet in den Außenbezirken oft entspanntere Runden mit leichterem Sitzplatz."
    ],
    ai: [
      "Public Viewing zur WM gibt es auf dem Volksfest und in vielen Innenstadt-Lokalen.",
      "Bei Top-Spielen lohnt es sich, früh da zu sein – die Plätze füllen sich schnell.",
      "In den Außenbezirken sind die Runden oft entspannter und ein Sitzplatz leichter."
    ],
    aiEn: [
      "World Cup public viewing is on at the funfair and in many city-centre venues.",
      "For big matches, arrive early — popular spots fill up fast.",
      "Outer districts often offer calmer crowds and easier seating."
    ]
  },
  {
    id: "a10", topic: "campus", cat: "CAMPUS", date: "13. Jun", read: 2, premium: false,
    title: "experimenta: Neue After-Work-Abende für junge Leute",
    dek: "Das Science Center öffnet abends – mit Drinks, Mitmach-Stationen und Wissenschaft zum Anfassen.",
    body: [
      "Wissenschaft nach Feierabend: Die experimenta testet Abende, die sich gezielt an Studierende und junge Berufstätige richten. Statt Schulklassen am Vormittag geht es dann um Drinks, Musik und Experimente zum Selbermachen.",
      "Das Konzept zielt auf einen Mix aus Ausgehen und Lernen – ein Format, das in größeren Städten längst funktioniert. Für Heilbronn könnte es ein neuer fester Programmpunkt für laue Abende werden."
    ],
    ai: [
      "Die experimenta testet After-Work-Abende für Studierende und junge Berufstätige.",
      "Statt Schulklassen stehen abends Drinks, Musik und Mitmach-Experimente im Fokus.",
      "Das Format verbindet Ausgehen und Lernen und könnte fester Programmpunkt werden."
    ],
    aiEn: [
      "experimenta is testing after-work evenings for students and young professionals.",
      "Instead of school groups, evenings focus on drinks, music and hands-on experiments.",
      "The format blends going out and learning and may become a regular fixture."
    ]
  },
  {
    id: "a11", topic: "innovation", cat: "INNOVATION", date: "12. Jun", read: 3, premium: false,
    title: "Schwarz Digits eröffnet neuen Campus bei Heilbronn",
    dek: "Der Tech-Arm der Schwarz-Gruppe baut die Region als Digitalstandort weiter aus – mit vielen Jobs.",
    body: [
      "Cloud, Cybersecurity, KI: Der Digitalbereich der Schwarz-Gruppe wächst – und mit ihm ein neuer Campus in der Region. Für Absolventinnen und Absolventen aus Heilbronn entstehen damit Stellen, für die man bisher oft umziehen musste.",
      "Die Region positioniert sich zunehmend als Digitalstandort mit eigener Schwerkraft. Wer hier studiert, muss für einen Tech-Job nicht mehr automatisch in eine Metropole wechseln."
    ],
    ai: [
      "Der Digitalbereich der Schwarz-Gruppe eröffnet einen neuen Campus in der Region.",
      "Dabei entstehen Jobs in Cloud, Cybersecurity und KI direkt vor Ort.",
      "Heilbronn positioniert sich stärker als eigenständiger Digitalstandort."
    ],
    aiEn: [
      "Schwarz Group's digital arm is opening a new campus in the region.",
      "It creates local jobs in cloud, cybersecurity and AI.",
      "Heilbronn keeps growing into a tech hub in its own right."
    ]
  },
  {
    id: "a12", topic: "sports", cat: "SPORT", date: "11. Jun", read: 2, premium: false,
    title: "Heilbronner Falken: So startet die Eishockey-Saison",
    dek: "Neue Gesichter, alte Rivalitäten – die Falken bereiten sich auf die kommende Spielzeit vor.",
    body: [
      "Auch wenn es draußen heiß ist: Bei den Heilbronner Falken richtet sich der Blick schon auf das Eis. Der Kader wird umgebaut, neue Spieler werden getestet, und die Fans diskutieren längst über die Chancen in der neuen Saison.",
      "Heimspiele in der Arena gehören für viele junge Fans zum festen Programm. Wer Stimmung, günstige Tickets und schnelles Spiel mag, ist hier richtig – ein guter Einstieg in den Heilbronner Sportwinter."
    ],
    ai: [
      "Die Heilbronner Falken stellen ihren Kader für die neue Eishockey-Saison um.",
      "Neue Spieler werden getestet, die Fans diskutieren über die Chancen.",
      "Heimspiele in der Arena sind für viele junge Fans ein fester Programmpunkt."
    ],
    aiEn: [
      "The Heilbronner Falken are reshaping their roster for the new ice-hockey season.",
      "New players are being tested while fans debate the team's chances.",
      "Home games in the arena are a regular fixture for many young fans."
    ]
  }
];
