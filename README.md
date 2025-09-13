<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# HISL Website — IntegAI‑Aligned Schema vNext

This repo hosts the public HISL website built on **Next.js 15.5 (App Router, Turbopack)** and deployed on **Vercel** with **Sentry/OTEL/Langfuse** for observability. It is **brokered** to the sovereign on‑prem orchestrator (**RAVEN**) via a thin policy gate and a Node broker (no third‑party LLM calls from Vercel).

> Status: Single‑stack (Next.js + Vercel + GitHub). EU region preference. Simulation Mode safe by default.

---

## Runtime split & routing policy

- **Edge**: `POST /api/ai` — preflight only (consent verify, OPA/Rego policy, PII redaction proof). Forwards jobs to the broker.  
- **Node**: `POST /api/broker/submit` (create job), `GET /api/broker/events` (SSE), `POST /api/broker/append` (RAVEN callback), optional `POST /api/broker/pull` (RAVEN long‑poll/WebSocket).  
- **Never** call 3rd‑party LLMs from Vercel; real inference runs on **RAVEN**.

### Job envelope (site → broker → RAVEN)
```json
{
  "runId":"uuid",
  "agency_level":"draft_only|review_window|guardrailed_auto",
  "risk_level":"low|med|high",
  "consent_token":"jwt",
  "lens_profiles":["virtue_ethics","rawls_justice"],
  "reg_context":["GDPR","EU-AI-Act"],
  "messages":[{"role":"user","content":"..."}],
  "metadata":{"promptHash":"sha256-...","pii_tags":["name","email"],"data_class":"user_provided|demo|public|internal|secret","sector":"pharma|construction|..."}
}
```

---

## Pages & components

- `app/layout.tsx` (root shell; fonts, theme vars, CSP nonce wiring)  
- `app/page.tsx` (Home: Hero, Mini‑Globe teaser, Features, Poem/Ethos, Educational/Substack)  
- `app/globe/page.tsx` (marquee globe: day/night/clouds, ravens on two orbits, DC pins/heatmap, prompt‑to‑path pulses)  
- `app/{about,contact,deploy}/page.tsx` (company info, contact, orchestrator intake wizard)  
- `app/api/ai/route.ts` (Edge preflight → broker)  
- `app/api/broker/{submit,events,append,pull}/route.ts` (Node broker endpoints)

**Assets (exact paths)**  
`/public/images/dna_bg.png`, `/public/images/reach_stars.png`, `/public/images/raven_huginn.png`, `/public/images/raven_muninn.png`, `/public/images/integai_logo.svg`  
`/public/assets/earth_daymap.jpg`, `/public/assets/earth_nightmap.jpg`, `/public/assets/earth_clouds.jpg`

---

## Trust & Agency UX

- `/consent` — manage consent; **downloadable consent receipts** (JSON); revoke.  
- **Agency Slider** — Draft Only → Review Window (12h) → Guardrailed Auto.  
- “**Why/How**” pane (collapsible) on AI outputs: reasoning trace, model votes, regulation map, provenance chain.  
- **Status badge** in footer: “Sovereign: Online | Simulated”.

---

## Observability (privacy‑preserving)

- **Sentry** (`@sentry/nextjs`): server+client init, releases & sourcemaps, perf tracing on `/api/ai` & broker.  
- **OTEL/Langfuse**: hashed content only; attach `data_class`, `sector`, `pii_tags`, `provenance_ids`.  
- **Offline queue**: if broker unreachable, queue in IndexedDB and drain later; show Simulation banner.

---

## Security & Compliance

- **CSP** (strict‑dynamic, nonce); disable `x-powered-by`; HSTS; X‑Frame‑Options: DENY; Referrer‑Policy: strict-origin-when-cross-origin; Permissions‑Policy: disable sensors/camera/mic.  
- **OPA/Rego** compiled to Wasm executes in `/api/ai` before broker submit (export control, sector restrictions, egress control).  
- **Data classification** (Zod): `DataClass`, `PIITag`, `Sector` (see `docs/interfaces.md`). Logs store hashes only.

---

## Environment variables (Vercel & CI)

- `SENTRY_DSN`, `SENTRY_ENV`, `SENTRY_RELEASE`  
- `LLM_PROVIDER` (e.g., deepseek/openai) — *used by RAVEN only*  
- `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY` (optional)  
- `NEXT_PUBLIC_SUBSTACK_URL`, `NEXT_PUBLIC_LINKEDIN_URL`  
- **Zod env schema** must fail build if any required var is missing/blank.

---

## CI/CD (GitHub → Vercel)

**Required PR checks**: `lint`, `typecheck`, `build`, **Playwright visual smoke** (`/`, `/globe`, `/deploy`, `/consent`, 9 sector pages, `/api/ai` simulation path).  
**On merge**: Sentry release + sourcemaps, Vercel deploy. **Secret scanning** enforced.

> Add branch protection on `next-main` with all checks required; squash merges only.

---

## Performance & A11y budgets

- Lighthouse ≥ **90** (mobile & desktop); CLS < 0.1; LCP < 2.5s median.  
- Lazy‑load globe; pause animations on hidden tab; respect `prefers-reduced-motion`.  
- Preload Inter (400/600/700) and Spectral (400/500).

---

## Go/No‑Go checklist

- [ ] Edge/Node split in place; **no 3rd‑party LLM calls from Vercel**.  
- [ ] Broker + RAVEN Link streaming tokens via SSE.  
- [ ] OPA preflight, consent verify, redaction proof.  
- [ ] Why/How pane renders on every AI output.  
- [ ] `/consent`, Agency Slider, consent receipts.  
- [ ] Data‑class & PII taxonomy enforced UI→logs.  
- [ ] 9 sector ambassadors (safe corpora + disclaimers).  
- [ ] `/deploy` wizard submits **assessment** job.  
- [ ] `/admin` console shows runs, Soul Metrics, lens toggles, bias monitor, broker queue.  
- [ ] CI gates green; Sentry/OTEL events anonymized; Simulation mode graceful.

---

## Dev quick start

```bash
# install & dev
npm i
npm run dev

# typecheck / lint / e2e smoke
npm run typecheck
npm run lint
npm run test:e2e
```

See **`docs/interfaces.md`** for API contracts, policy‑deny shape, data schemas, and SSE event formats.
>>>>>>> origin/next-main
