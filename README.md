# NeXtGen Stimme

> **Your city. Your voice.** — a swipe-first, token-triggered local-news prototype for the **Heilbronner Stimme**.

Scan a physical city token → read a 60-second local story → swipe local issues like cards → see how the city voted in real time → get a 3-point AI digest → earn perks at local businesses. No app download required.

🔗 **Live demo:** _add your Vercel URL here_
📱 Best viewed on a phone (or a narrow browser window).

---

## The challenge

Built for the **Corporate Campus Challenge (CCC7 · Design Thinking)** run by Campus Founders in Heilbronn, with **Heilbronner Stimme** (an 80-year-old regional media group) as the partner.

The newspaper's audience is ageing — most readers are 60+. People aged **20–35** (TUM/Bildungscampus students, young professionals, expats) suffer from *information fatigue* and *app fatigue*, and feel disconnected from the local agenda.

> **How might we** create a media experience that's deeply relevant to 20–35-year-olds, so Heilbronner Stimme becomes their trusted daily platform?

## The concept

**NeXtGen Stimme** isn't "another news app" — it's a lightweight lifestyle loop that bridges the physical city and the newsroom, designed to solve the cold-start problem:

**physical 3D token (QR) in the city → instant web-app (zero download) → swipe local issues → live community vote + 3-point AI summary → points → perks at local partners.**

## This prototype

A mobile-first web app that lets an audience **physically walk through the product loop** during a pitch:

1. **Landing** — opened by scanning a printed QR. An instant hook, no download.
2. **Token scan** — the in-app camera scans a second QR (the "3D token") to unlock a story.
3. **Stimme Pulse** — Tinder-style swipe on real Heilbronn questions; each vote reveals a live result bar and an AI digest, and earns points.
4. **Wallet** — points, progress, and local perks (café, BUGA ticket, Stimme+), with a soft "create profile" upsell instead of a registration wall.

> **Note on the camera:** in-browser QR scanning needs **HTTPS** and a user gesture, and is blocked inside iframes/previews. The token step always offers a **tap fallback ("Demo-Story")**, so the flow is complete even when the camera isn't available. Test the real camera on the deployed site (iOS Safari + Android Chrome).

## Tech

- **Vanilla HTML / CSS / JS** — no build step, deploys as a static site.
- **[qr-scanner](https://github.com/nimiq/qr-scanner)** (nimiq) for in-browser QR decoding (uses the native `BarcodeDetector` where available).
- **Fonts:** Bricolage Grotesque (display) + Plus Jakarta Sans (body).
- **Hosting:** Vercel.

## Project structure

```
NextGenStimme/
├── index.html          # markup + screen structure
├── css/
│   └── styles.css      # design system + all screens
├── js/
│   ├── data.js         # config, topic taxonomy & Pulse cards
│   ├── articles.js     # the 12 feed articles (DE + EN AI digests)
│   ├── swipe.js        # reusable Tinder-style swipe handler
│   ├── scanner.js      # camera / QR module (qr-scanner wrapper)
│   └── app.js          # state, navigation, feed, reader, profile, wiring
├── assets/
│   └── favicon.svg
└── README.md
```

## Run locally

It's a static site — any local server works (camera needs `https://` or `localhost`):

```bash
# Python
python3 -m http.server 5173
# then open http://localhost:5173

# or VS Code: install "Live Server" and click "Go Live"
```

## Features

- **Home feed** — 12 local articles, filterable by topic; tap to read.
- **Reader** — hero, article body, and an AI digest with a **DE / EN toggle** (the "English-friendly summaries" idea).
- **Token scan** — opens the camera, unlocks a featured story (with a tap fallback).
- **Stimme Pulse** — swipe local yes/no questions; each vote reveals a live result + AI digest.
- **Wallet** — points, progress, and local perks that unlock as you earn.
- **Profile** — stats, preferred-topic chips that personalize the feed, settings, and a "reset demo" button for a second pitch run.

## Editing content

- **Articles:** `js/articles.js` (title, teaser, body, German + English AI digests).
- **Pulse questions, vote splits, topics & economy:** `js/data.js`.

Change those and the UI updates automatically.

## Team

**Team 6 — NeXtGen Stimme** · Corporate Campus Challenge 2026, Heilbronn.

---

*Prototype built for a design-thinking challenge. Not affiliated with or endorsed by Heilbronner Stimme / Stimme Mediengruppe; brand references are used in the context of the challenge brief.*
