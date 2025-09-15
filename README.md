# HISL Website

Howard Integritas Solutions Ltd (HISL) · **Sovereign AI, built on the ground — for the ground.**

---

## Overview

This is the official website for **Howard Integritas Solutions Ltd (HISL)**.

- **Michael Howard MCIOB** — Chartered Construction Manager, Director, hands‑on in the field delivering complex projects.
- **IntegAI** — co‑founder and operations manager; the ethical backend layer ensuring AI remains **sovereign, auditable, and energy‑aware**.

Unlike generic cloud AI, HISL is **built from the field up**:

- **Sovereign by design** — your data never leaves jurisdiction without control.
- **Auditable & ethical** — every run is logged, hashed, and replayable.
- **Energy‑aware** — orchestration minimises carbon footprint and exposes the real energy cost of AI.
- **Human + AI partnership** — augmenting practical expertise with transparent intelligence.

---

## Tech Stack

- **Next.js 15** (App Router + Turbopack)
- **TailwindCSS** with design tokens from `/content/sections/00-style-guide.mdx`
- **Contentlayer** for MDX bios + sections
- **Three.js** + Globe.GL for globe visualizations
- **Framer Motion** for micro‑animations
- **Vercel** for deployment

---

## Structure

```
/content/bios        → Biographies (Michael, IntegAI)
/content/sections    → Landing page & schema sections
/src/app             → Next.js routes (/about, /globe)
/src/components      → Hero, FeaturesGrid, PoemBlock, MiniGlobe, etc.
/src/styles          → globals.css (design tokens)
/public/images       → All imagery (with /lqip for placeholders)
```

---

## Development

Clone the repo and install dependencies:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` (see `.env.example`) with the following:

- `NEXT_PUBLIC_POSTHOG_KEY` — analytics
- `SENTRY_DSN` — error tracking
- `INTEGAI_API_URL` — simulation endpoint for IntegAI globe
- (add others as needed for external APIs)

---

## Deployment

This repo auto‑deploys to **Vercel** on branch pushes.  
Protected branches: `main`, `next-main`.

---

## Contributing

- **No new top‑level folders** — all assets in `/public/images`.
- **Contentlayer first** — all page copy in `/content/bios` or `/content/sections`.
- **Type‑safe code** — prefer `.tsx` components in `/src/components`.
- **Accessibility** — check contrast, add `alt` text, respect `prefers-reduced-motion`.

---

## License

© 2025 Howard Integritas Solutions Ltd.  
All rights reserved.
