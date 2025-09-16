---
title: "HISL Website — Single Source of Truth (Master Blueprint)"
version: "v1.0"
date: "2025-09-16"
status: "Authoritative — implement from here"
notes: |
  This merges the Manus Mermaid wireframe (IA/flows) with style, imagery pipeline,
  accessibility, SEO, performance, testing, analytics, CI/CD, and deployment guardrails.
  Edit imagery via `assets.manifest.json` and `imagery-map.csv`.
---

# 0) Tools & Prereqs (Cline/Local)
- Node 18+/20+, git, bash, internet.
- Vercel project connected to this repo.
- **Deps**: next@15.x, react, tailwindcss, framer-motion@11, @react-three/fiber, @react-three/drei,
  contentlayer + next-contentlayer, remark-gfm, rehype-slug, @playwright/test.
- Optional: sharp/imagemagick for WebP generation; curl/wget/rsync; jq.
- Auth: GitHub (SSH or HTTPS), PostHog/Sentry keys in `.env.local` or Vercel envs.

# 1) Style & Brand (summary)
- **Palette (dark-first)**: bg `#06080B`, surface `#0B0F12`, text `#E6EDF3`,
  gold `#D9A441`, eco-green `#4FEA77`, safety-orange `#FF7A59`, link/sky `#4DB3FF`.
- **Type**: Geist Sans (head/UI), Inter (body), Geist Mono (numeric/telemetry).
- **Motion**: subtle; 200–300ms in, 160–220ms out; honor `prefers-reduced-motion`.
- **Imagery feel**: cinematic industry + cosmic; real site photos preferred; gold accents.

# 2) Information Architecture (overview)
Top-level: Home • Where Your Prompts Go (Globe) • Deploy Agents • Live News • About • Contact.
Home sections: Hero • Capabilities+MiniGlobe • Features grid • Ethos/Poem • Chat preview • Footer.
Functional pages and forms as per wireframe.
(See `hisl-wireframe.mmd` for canonical graph.)

# 3) Imagery Pipeline (Source → Serve → Map)
- **Source**: `/public/media/{earth,starfields,nebulae,galaxies,construction,energy,manufacturing,logos,textures,hero}`
- **Manifest**: `public/assets.manifest.json` → keys map to `/media/**` paths.
- **Wrapper**: `components/AssetImage.tsx` resolves keys via `lib/imagery.ts` (`getAsset`), falls back to `brand.mark` or `hero.default`.
- **Alt & attribution**: fill `imagery-map.csv`; render attribution where required.
- **Formats**: AVIF/WebP responsive; LQIP/blur placeholders; priority only for hero.
- **Never blank**: if a key/path missing → render fallback and log a warning.

# 4) Content Model (MDX via Contentlayer)
- **Documents**:
  - `Bio`: `content/bios/**/*.mdx` → fields: name, role, headshotKey?, body (mdx).
  - `Section`: `content/sections/**/*.mdx` → fields: title, order, slug?, body.
  - `NewsItem` (optional): `content/news/**/*.mdx` with title, date, source.
- **Build wiring**: `contentlayer.config.ts` + wrap `next.config.js` with `withContentlayer`.
- **Routes** consume `contentlayer/generated` (e.g., `allBios`, `allSections`).

# 5) Pages (implementation notes)
## Home
- **Hero**: headline, sub, CTA1→ chat preview, CTA2→ /globe; static fallback image OK.
- **Capabilities + MiniGlobe**: 2-col; small R3F canvas; pause on reduced motion.
- **Features grid**: 8 tiles (ComplianceGuard, DataSovereign, PrivacyShield, AuditTrail,
  EthicsCore, SecureComms, DocuGenie, BuildLens).
- **Ethos/Poem**: background image key `ethos.bg` from manifest.
- **Chat Preview**: text area → local simulation; show runId/promptHash/responseHash labels.
- **Footer**: HISL lockup, tagline, links.

## Where Your Prompts Go (/globe)
- Split layout: **left** form/output; **right** 3D globe.
- R3F globe with atmosphere shader, pins, pulse routes, ravens; **static starfield fallback** when disabled.
- API: `POST /api/integai/simulate` → output shows text + metrics (tokens, hops, est. Wh).

## Deploy Agents (/deploy)
- **Intake form**: org/sector/size, OS/network/integrations, privacy/residency, targets/constraints.
- **Assess & Simulate**: `POST /api/integai/assess` → render feasibility, phased plan, `requestHash`.
- **Agents per sector**: 9 standard + Custom (see `agents.standard.yaml`).

## Live News (/news)
- Query → `GET /api/news/search` (proxy) → results list (title/snippet/source/link).

## About (/about)
- Michael Bio (MDX), IntegAI Bio (MDX), ethos panel.

## Contact (/contact)
- Form (name, email, org, message) → success page; consent + privacy link.

## System
- 404, 500; Legal (Privacy, Terms, Responsible AI, DPA summaries); robots.txt, sitemap.xml; OG image routes.

# 6) Accessibility (WCAG 2.2 AA)
- Contrast ≥ 4.5:1; visible focus; skip link; landmarks; keyboard access.
- ARIA for globe: role="img", `aria-label="Interactive globe visualization"`; alternative text summary adjacent.
- Reduced motion: disable auto-rotation, use static imagery.

# 7) SEO & Metadata
- Titles ≤ 60 chars; meta description 150–160; canonical per page.
- OG/Twitter cards; dynamic OG for articles.
- JSON-LD: Organization, WebSite, BreadcrumbList (add Product if needed).

# 8) Performance Budgets
- LCP < 2.0s (mid mobile), CLS < .05, INP < 200ms.
- Hydrated JS ≤ 180kb on entry; RSC-first; font subsetting; image preconnect.
- WebGL budget: ≤ 200k instances desktop, 60k mobile; lazy init after LCP.

# 9) Analytics & Monitoring
- PostHog events: `page_view`, `globe_run`, `deploy_assess_submit`, `lead_submit`.
- Sentry: capture exceptions; tag `route`, `version`, `device`.
- Respect Do Not Track; provide cookie controls if required.

# 10) Testing & CI
- **Smoke page**: `/smoke/visuals` renders hero, 3 cards, logo cloud, gallery.
- **Playwright**: test visits `/smoke/visuals` → expects ≥1 `<img>` and ≥4 cards.
- **CI**: GitHub Action runs install, build, Playwright tests; block merge on fail.

# 11) Build & Deploy
- `dev`: `contentlayer build && next dev`
- `build`: `contentlayer build && next build`
- Vercel preview → validate `/smoke/visuals` and `/globe` → production deploy.

# 12) Editors’ Hooks (where to edit imagery)
- **`public/assets.manifest.json`**: map keys → files (edit paths).
- **`imagery-map.csv`**: per page/section specify alt + attribution (edit cells).
- Use `AssetImage key="..."` everywhere; never hardcode `src`.

# 13) Agents per Sector (overview)
See `agents.standard.yaml` for 9 standard agents per sector + Custom. Each agent composes roles:
Planner • Retriever • Judge • Executor • Memory • Safety • Tools • Observer • Publisher.

# 14) Checklists
- [ ] Imagery manifest filled; fallbacks render.
- [ ] Contentlayer MDX pages load (bios/sections).
- [ ] A11y pass; reduced-motion fallback works.
- [ ] Lighthouse budgets met; analytics & Sentry wired.
- [ ] Playwright smoke green; CI green; Vercel preview ok.

---

**Files included in this package:**
- `hisl-wireframe.mmd` — canonical Mermaid wireframe/flows.
- `public/assets.manifest.template.json` — imagery keys to fill.
- `imagery-map.csv` — where/what imagery to use (you edit).
- `agents.standard.yaml` — 9 agents per sector + Custom scaffold.
- `contentlayer.config.ts` — MDX wiring skeleton.
- `next.config.example.js` — wrapped with `withContentlayer`.
- `playwright.smoke.spec.ts` — e2e guard.
- `.github/workflows/ci-example.yml` — CI skeleton.
- `analytics.instrumentation.md` — event names + snippet.