/* ============================================================
   articles.js — the Home feed content (bilingual DE/EN).
   Original copy written for this prototype in the style of a
   regional outlet, grounded in real Heilbronn topics (Ipai,
   Bildungscampus, experimenta, Neckarmeile, Green Capital 2027,
   Schwarz Digits ...). Not copied from any publication.
   Each article carries German fields (title/dek/body/ai) and
   English ones (titleEn/dekEn/bodyEn/aiEn). app.js picks the
   set based on state.lang.
   ============================================================ */
window.NGS = window.NGS || {};

NGS.ARTICLES = [
  {
    id: "a1", topic: "innovation", cat: "INNOVATION", date: "23. Jun", read: 4, premium: true,
    title: "Ipai: Wie Heilbronns KI-Campus die Stadt verändert",
    titleEn: "Ipai: how Heilbronn's AI campus is changing the city",
    dek: "Auf dem Innovation Park entstehen tausende Jobs rund um Künstliche Intelligenz – was das für junge Talente in der Region heißt.",
    dekEn: "Thousands of jobs around artificial intelligence are emerging at the Innovation Park — what that means for young talent in the region.",
    body: [
      "Am Rand von Heilbronn wächst einer der größten KI-Standorte Europas heran. Forschung, Startups und etablierte Firmen sollen hier unter einem Dach zusammenarbeiten – und genau das macht den Campus für junge Menschen interessant, die nach dem Studium nicht automatisch nach Stuttgart oder Berlin abwandern wollen.",
      "Für Studierende des Bildungscampus liegt der Reiz in der Nähe: Praktika, Werkstudentenstellen und erste Gründungsideen sind plötzlich fußläufig erreichbar. Wer früh Kontakte knüpft, hat beim Berufseinstieg in der Region einen klaren Vorsprung."
    ],
    bodyEn: [
      "On the edge of Heilbronn, one of Europe's largest AI hubs is taking shape. Research, startups and established companies are meant to work side by side here — and that's exactly what makes the campus appealing to young people who don't want to automatically move to Stuttgart or Berlin after their studies.",
      "For Bildungscampus students, the draw is proximity: internships, working-student roles and first founding ideas are suddenly within walking distance. Making contacts early gives you a clear head start when entering the regional job market."
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
    titleEn: "Bildungscampus: study zones soon open around the clock",
    dek: "Studierende lernen am liebsten abends – jetzt testen die Einrichtungen längere Öffnungszeiten und einen 24/7-Bereich.",
    dekEn: "Students study best in the evening — now the campus is testing longer opening hours and a 24/7 area.",
    body: [
      "Wer kennt es nicht: Die beste Lernphase beginnt, wenn die Bibliothek schon zumacht. Am Bildungscampus soll damit Schluss sein. In einem Pilotversuch bleibt ein Teil der Lernzonen künftig deutlich länger geöffnet, ein abgetrennter Bereich sogar rund um die Uhr.",
      "Der Zugang läuft über den Studierendenausweis, nachts gilt ein reduziertes Sicherheitskonzept. Wie groß der 24/7-Bereich am Ende wird, hängt auch davon ab, wie stark er in den ersten Wochen genutzt wird."
    ],
    bodyEn: [
      "We all know it: your best study session starts right when the library closes. The Bildungscampus wants to end that. In a pilot, part of the study zones will stay open much longer, and a separate area even around the clock.",
      "Access runs via the student ID, with a reduced security setup at night. How big the 24/7 area ends up being also depends on how heavily it's used in the first weeks."
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
    titleEn: "Heilbronn student builds a filter against tyre microplastics",
    dek: "Reifenabrieb ist eine der größten Mikroplastik-Quellen. Ein Tüftler aus der Region hat dafür eine überraschend einfache Lösung.",
    dekEn: "Tyre wear is one of the biggest sources of microplastics. A tinkerer from the region has a surprisingly simple fix.",
    body: [
      "Bei jeder Autofahrt löst sich winziger Abrieb von den Reifen – ein Großteil davon landet als Mikroplastik in Böden, Wasser und Luft. Ein Student aus Heilbronn setzt genau dort an und hat ein System entwickelt, das die Partikel auffängt, bevor sie sich verteilen.",
      "Noch ist es ein Prototyp, doch das Interesse ist groß. Gerade in einem Mobilitäts- und Industriestandort wie der Region Heilbronn könnte aus der Idee mehr werden als ein Studienprojekt."
    ],
    bodyEn: [
      "Every car trip wears tiny particles off the tyres — much of it ends up as microplastics in soil, water and air. A student from Heilbronn tackles exactly this and has built a system that catches the particles before they spread.",
      "It's still a prototype, but interest is high. In a mobility and industry hub like the Heilbronn region, the idea could become more than a study project."
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
    titleEn: "Festival of Lights on the Neckar promenade: the three-evening programme",
    dek: "Lasershows, vier Bühnen und ein neues Pfandsystem – das Lichterfest verwandelt das Neckarufer in eine Lichtbühne.",
    dekEn: "Laser shows, four stages and a new deposit system — the Lichterfest turns the riverbank into a stage of light.",
    body: [
      "Wenn es dunkel wird, gehört die Neckarmeile dem Licht. An mehreren Abenden verwandeln Installationen und Lasershows das Ufer in eine begehbare Bühne, dazu gibt es Musik auf verteilten Bühnen und Stände entlang des Wassers.",
      "Neu in diesem Jahr: ein Mehrweg-Pfandsystem für weniger Müll und ein überarbeitetes Showkonzept. Der Eintritt zum Bummeln ist frei – perfekt für einen spontanen Abend mit Freunden."
    ],
    bodyEn: [
      "When darkness falls, the Neckar promenade belongs to light. Over several evenings, installations and laser shows turn the riverbank into a walk-through stage, with music on scattered stages and stalls along the water.",
      "New this year: a reusable deposit system for less waste and a reworked show concept. Strolling in is free — perfect for a spontaneous evening with friends."
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
    titleEn: "Funfair on Theresienwiese: what to expect",
    dek: "Riesenrad, Public Viewing und vergünstigte Tage – das Heilbronner Volksfest läuft bis Mitte Juli.",
    dekEn: "Ferris wheel, public viewing and discounted days — the Heilbronn funfair runs until mid-July.",
    body: [
      "Riesenrad, Fahrgeschäfte und jede Menge Imbissstände: Auf der Theresienwiese ist wieder Volksfest. An mehreren Familien- und Aktionstagen gibt es vergünstigte Preise, abends sorgt ein Musikprogramm für Stimmung.",
      "Wer die Fußball-WM verfolgt, kommt ebenfalls auf seine Kosten – an Public-Viewing-Bereichen werden die wichtigsten Spiele übertragen. Bis Mitte Juli bleibt die Wiese das Wochenend-Ziel Nummer eins."
    ],
    bodyEn: [
      "Ferris wheel, rides and plenty of food stalls: the funfair is back on Theresienwiese. Several family and special days bring discounted prices, and an evening music programme sets the mood.",
      "Following the football World Cup? You're covered too — public-viewing areas show the key matches. Until mid-July, the fairground stays the number-one weekend destination."
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
    titleEn: "Frankenstadion gets a revamp — Heilbronn dreams of top-flight football",
    dek: "Für Millionen wird die Arena modernisiert. Bis zum Saisonstart bleibt wenig Zeit.",
    dekEn: "The arena is being modernised for millions. Little time remains before the season starts.",
    body: [
      "Der Rasen ist abgetragen, die Bagger rollen: Das Frankenstadion bekommt eine millionenschwere Modernisierung. Ziel ist eine Arena, die höherklassigen Fußball in Heilbronn überhaupt erst möglich macht.",
      "Sportlich wie organisatorisch ist das ein Kraftakt. Mehrere Vereine müssen sich über die Nutzung einigen, und bis zum Saisonstart im Spätsommer drückt die Zeit. Für junge Fans könnte sich der Aufwand lohnen – Heimspiele auf höherem Niveau wären ein echter Anziehungspunkt."
    ],
    bodyEn: [
      "The turf is stripped, the diggers are rolling: the Frankenstadion is getting a multi-million-euro modernisation. The goal is an arena that makes higher-level football in Heilbronn possible in the first place.",
      "It's a major effort both on the pitch and organisationally. Several clubs have to agree on usage, and time is tight before the late-summer season start. For young fans, the effort could pay off — home games at a higher level would be a real draw."
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
    titleEn: "Green Capital 2027: will the Friedrich-Ebert bridge be closed?",
    dek: "Im Grüne-Hauptstadt-Jahr werden Ideen für weniger Autoverkehr diskutiert – der Handel ist skeptisch.",
    dekEn: "In the Green Capital year, ideas for less car traffic are on the table — retailers are sceptical.",
    body: [
      "Heilbronn wird 2027 Europäische Grüne Hauptstadt – und schon jetzt wird über Maßnahmen gestritten. Eine Idee: die Friedrich-Ebert-Brücke zeitweise für Autos zu sperren und mehr Raum für Rad und Fuß zu schaffen.",
      "Teile des Handels warnen vor Umsatzeinbußen und schwerer Erreichbarkeit. Befürworter sehen die Chance, die Innenstadt lebenswerter zu machen. Für junge Pendler hängt viel davon ab, wie gut Bus, Bahn und Rad die Lücke füllen."
    ],
    bodyEn: [
      "Heilbronn becomes European Green Capital in 2027 — and measures are already being argued over. One idea: temporarily closing the Friedrich-Ebert bridge to cars and creating more space for cycling and walking.",
      "Parts of the retail sector warn of lost sales and poor access. Supporters see a chance to make the city centre more liveable. For young commuters, a lot depends on how well bus, train and bike fill the gap."
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
    titleEn: "Three new cafés Heilbronn is buzzing about",
    dek: "Specialty Coffee, Matcha und lange Tische zum Arbeiten – diese Spots lohnen den Umweg.",
    dekEn: "Specialty coffee, matcha and long tables to work at — these spots are worth the detour.",
    body: [
      "Die Café-Szene in Heilbronn wird jünger. Gleich mehrere neue Spots setzen auf Specialty Coffee, hausgemachtes Gebäck und genug Steckdosen zum Arbeiten – ideal für alle, die Laptop und Latte verbinden wollen.",
      "Was auffällt: Viele der neuen Orte verstehen sich als Treffpunkt, nicht nur als Kaffeebar. Gemeinschaftstische, kleine Events und wechselnde Karten machen aus dem Kaffeestopp schnell einen halben Nachmittag."
    ],
    bodyEn: [
      "Heilbronn's café scene is getting younger. Several new spots focus on specialty coffee, homemade pastries and enough sockets to work at — ideal for anyone combining laptop and latte.",
      "What stands out: many of the new places see themselves as meeting points, not just coffee bars. Communal tables, small events and rotating menus quickly turn a coffee stop into half an afternoon."
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
    titleEn: "World Cup 2026: where to find public viewing in Heilbronn",
    dek: "Von der Theresienwiese bis zu Bars in der Innenstadt – hier siehst du die Spiele gemeinsam.",
    dekEn: "From Theresienwiese to city-centre bars — here's where to watch the matches together.",
    body: [
      "Die Fußball-WM ist in vollem Gange, und in Heilbronn wird gemeinsam gefiebert. Auf dem Volksfest gibt es Public-Viewing-Flächen, dazu übertragen zahlreiche Bars und Lokale in der Innenstadt die wichtigsten Partien.",
      "Tipp: Bei großen Spielen früh da sein, gerade die beliebten Plätze sind schnell voll. Wer es ruhiger mag, findet in den Außenbezirken oft entspanntere Runden mit leichterem Sitzplatz."
    ],
    bodyEn: [
      "The football World Cup is in full swing, and Heilbronn is cheering together. The funfair has public-viewing areas, and plenty of city-centre bars and venues show the key matches.",
      "Tip: arrive early for big matches — the popular spots fill up fast. If you prefer it quieter, the outer districts often have more relaxed crowds and easier seating."
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
    titleEn: "experimenta: new after-work evenings for young people",
    dek: "Das Science Center öffnet abends – mit Drinks, Mitmach-Stationen und Wissenschaft zum Anfassen.",
    dekEn: "The science centre opens at night — with drinks, hands-on stations and science you can touch.",
    body: [
      "Wissenschaft nach Feierabend: Die experimenta testet Abende, die sich gezielt an Studierende und junge Berufstätige richten. Statt Schulklassen am Vormittag geht es dann um Drinks, Musik und Experimente zum Selbermachen.",
      "Das Konzept zielt auf einen Mix aus Ausgehen und Lernen – ein Format, das in größeren Städten längst funktioniert. Für Heilbronn könnte es ein neuer fester Programmpunkt für laue Abende werden."
    ],
    bodyEn: [
      "Science after hours: experimenta is testing evenings aimed specifically at students and young professionals. Instead of school classes in the morning, it's about drinks, music and do-it-yourself experiments.",
      "The concept targets a mix of going out and learning — a format that has long worked in bigger cities. For Heilbronn, it could become a new regular fixture for balmy evenings."
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
    titleEn: "Schwarz Digits opens a new campus near Heilbronn",
    dek: "Der Tech-Arm der Schwarz-Gruppe baut die Region als Digitalstandort weiter aus – mit vielen Jobs.",
    dekEn: "The Schwarz Group's tech arm keeps building the region into a digital hub — with plenty of jobs.",
    body: [
      "Cloud, Cybersecurity, KI: Der Digitalbereich der Schwarz-Gruppe wächst – und mit ihm ein neuer Campus in der Region. Für Absolventinnen und Absolventen aus Heilbronn entstehen damit Stellen, für die man bisher oft umziehen musste.",
      "Die Region positioniert sich zunehmend als Digitalstandort mit eigener Schwerkraft. Wer hier studiert, muss für einen Tech-Job nicht mehr automatisch in eine Metropole wechseln."
    ],
    bodyEn: [
      "Cloud, cybersecurity, AI: the Schwarz Group's digital division is growing — and with it a new campus in the region. For Heilbronn graduates, this creates roles that often used to require relocating.",
      "The region is increasingly positioning itself as a digital hub with its own gravity. Study here, and you no longer have to move to a metropolis for a tech job."
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
    titleEn: "Heilbronner Falken: how the ice-hockey season kicks off",
    dek: "Neue Gesichter, alte Rivalitäten – die Falken bereiten sich auf die kommende Spielzeit vor.",
    dekEn: "New faces, old rivalries — the Falken are gearing up for the coming season.",
    body: [
      "Auch wenn es draußen heiß ist: Bei den Heilbronner Falken richtet sich der Blick schon auf das Eis. Der Kader wird umgebaut, neue Spieler werden getestet, und die Fans diskutieren längst über die Chancen in der neuen Saison.",
      "Heimspiele in der Arena gehören für viele junge Fans zum festen Programm. Wer Stimmung, günstige Tickets und schnelles Spiel mag, ist hier richtig – ein guter Einstieg in den Heilbronner Sportwinter."
    ],
    bodyEn: [
      "Even with the heat outside, the Heilbronner Falken already have their eyes on the ice. The roster is being rebuilt, new players tested, and fans are long since debating the chances for the new season.",
      "Home games in the arena are a fixture for many young fans. If you like atmosphere, cheap tickets and fast play, this is the place — a good entry into Heilbronn's sporting winter."
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