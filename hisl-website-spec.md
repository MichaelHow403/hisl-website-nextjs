
---
title: "HISL — Website Style • Feel • Flow • Full Content • Wireframe"
version: "v1.0 (2025-09-14)"
owner: "HISL"
status: "Ready to lock"
notes: |
  This document codifies the full site vision we aligned on: bold industrial intelligence,
  safety-first, sustainable by design. It includes style & design system, IA & flow,
  page-by-page content, component specs, imagery direction, SEO/perf/a11y, toolchain,
  and operational checklists for Whimsical, Notion, and NAS.
---

# 0) Executive Summary

**HISL** builds and deploys intelligent systems that make industrial operations **safer, smarter, and greener** — even **offline-first**.  
Brand mark (approved): **gold hard hat** with an **embedded brain**, **green eco-signal nodes**, **orbital paths**, and **biocircuit overlays** (HISL v1).

**Core pillars**  
- **Safety intelligence**: proactive risk detection & incident prevention.  
- **Operational excellence**: measurable throughput and cost improvements.  
- **Sustainability**: emissions, energy efficiency, and circularity metrics.  
- **Sovereignty**: offline-first, secure-by-default, privacy-preserving deployments.

**Voice & vibe**  
- **Direct. Practical. Assured.** Zero hype, high signal.  
- **Industrial-meets-future.** Metal & circuit textures with clean, calm UI.  
- **Human-centered.** Workers first; tech serves the mission.

---

# 1) Brand Foundations

## 1.1 Logo & Lockups
- **Primary mark**: HISL gold hard hat + brain + eco-signal nodes + orbital paths + biocircuit overlays.
- **Primary lockup**: Mark left + "HISL" wordmark; tagline underneath on wide viewports.
- **Clearspace**: `1x` the height of the hard hat all around.
- **Min size**: Digital 24px height (favicon/mark); 64px+ for clarity in UI.
- **Do**: Use **dark backgrounds** to emphasize metallic gold.  
- **Don’t**: Place the mark over noisy textures without a soft black scrim (60–75%).

**Approved variants**  
- Full-color on dark; Monotone (Gold-600); White reversed; Embossed foil (print).

## 1.2 Color System (Design Tokens)
We design **dark-first**, with automatic light theme. Names reflect **role** not hue.

```
Token             Dark (HEX)         Light (HEX)        Usage
--bg              #06080B            #FAFBFC            Page background
--surface         #0B0F12            #FFFFFF            Cards/sections
--elev-1          #11171C            #F3F5F7            Sub-cards/modals
--muted           #9AA4AF            #55606B            Secondary text
--text            #E6EDF3            #0B0F12            Body text
--brand-gold-600  #D9A441            #B68826            Brand accents, CTAs
--brand-gold-300  #F2D08A            #E4BF6A            Gradients/hover
--eco-green-500   #4FEA77            #16A34A            Sustainability nodes
--safety-orange   #FF7A59            #EA580C            Alerts & safety highlights
--sky-500         #4DB3FF            #1D4ED8            Links/interactive alt
--success         #22C55E            #16A34A            Success states
--warning         #F59E0B            #D97706            Warning states
--danger          #EF4444            #B91C1C            Error states
```

**Gradients (example tokens)**  
- `--grad-brand`: linear 30° `brand-gold-300 → brand-gold-600` with soft specular sparkle overlay.  
- `--grad-systems`: radial `eco-green-500 → transparent` for node halos.

## 1.3 Typography
- **Primary**: *Geist Sans* (Headlines, UI) — clean, industrial-modern.  
- **Secondary**: *Inter* (Body, longform) — highly readable.  
- **Mono**: *Geist Mono* (numbers, code, telemetry).

**Type scale (fluid)**  
- Display: 48–72  
- H1: 36–56  
- H2: 28–40  
- H3: 22–28  
- Body L: 18  
- Body: 16  
- Caption: 14

**Weights**: 300/400/600/700. **Tracking**: -1% for headings. **Line-height**: 1.2–1.6.

## 1.4 Layout, Grid, and Spacing
- **Grid**: 12-col, 72/96/1200 max width container; 24px base gutter (fluid).  
- **Spacing scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96.  
- **Radius**: 12 for cards, 999 for pills; **Elevation** uses layered soft shadows (ambient + directional).  
- **Motion**: Subtle; **enter 200–300ms**, **exit 160–220ms**, **easing**: `cubic-bezier(0.22, 1, 0.36, 1)`.

## 1.5 Iconography & Illustrations
- **Icon set**: Phosphor Icons (duotone), stroke 1.5–2px.  
- **Illustrations**: Isometric **circuitry + orbital motifs**; subtle animated nodes (eco-green).  
- **3D**: Optional GLTF hard-hat mark (low poly) for hero; slow rotation (8–12s).

## 1.6 Imagery Direction
- **Photography**: Real industrial context — **candid**, worker-first, no staged smiles. Night shift, headlamps, sparks, turbines, wind farms, control rooms.  
- **Color grading**: Cool blacks and steel with **warm gold highlights**; keep skin tones true.  
- **Texture pack**: Brushed metal, PCB traces, orbital wireframes (soft).  
- **Do**: Safety PPE visible; diversity of teams; show cause & effect of improvements.  
- **Don’t**: Overuse of stocky symbolism (robot arms for everything).

**Alt text**: Action + context + outcome. *"Technician calibrates turbine sensor to reduce vibration."*

---

# 2) Information Architecture & Flow

## 2.1 Primary Navigation
1. **Solutions**  
   - Construction Safety  
   - Energy Reliability  
   - Manufacturing Insight
2. **Platform** (IntegAI)  
3. **Services** (Advisory, Integration, Training)  
4. **Case Studies**  
5. **Resources** (Blog, Docs, Events)  
6. **Company** (About, Team, Careers)  
7. **Contact** (button)

**Utility**: Search, Dark/Light toggle, Language selector (EN → ES/FR later).

## 2.2 Footer
- Product: Solutions, Platform, Pricing (if public), Roadmap  
- Company: About, Team, Careers, Press Kit  
- Resources: Blog, Docs, Case Studies, Events, Newsletter  
- Legal: Privacy, Terms, Responsible AI, Data Processing Addendum  
- Social: LinkedIn, GitHub, YouTube

## 2.3 Key Flows
- **Evaluate → Book Demo** (primary).  
- **Download Case Study** (lead magnet).  
- **Sign Partnership** (integrators/OEMs).  
- **Recruitment** (experienced field engineers & ML ops).

---

# 3) Page-by-Page — Wireframes & Full Content

> Wireframes use ASCII boxes (`[]`) and labels. Content shown is **production-ready** (edit in CMS).

## 3.1 Home

```
[Header/Nav | Logo | Solutions | Platform | Services | Case Studies | Resources | Company | Contact]
[Hero: Headline + Value | Subhead | Primary CTA | Secondary CTA | Hero visual (3D mark or site photo)]
[logoCloud: partner logos]
[Section: Problem → Outcome (3 cols with icons)]
[Section: Platform highlight (RSC + Offline-first + Safety layer)]
[Section: Solutions (3 cards)]
[Section: Results metrics + mini case study carousel]
[Section: Testimonials]
[Section: CTA band “See it on your site”]
[Footer]
```

**Hero**  
- **Headline**: *Industrial intelligence that keeps people safe — and operations sustainable.*  
- **Subhead**: *HISL combines on-site sensing with AI you control to prevent incidents, boost throughput, and cut emissions — even when the network doesn’t cooperate.*  
- **Primary CTA**: **Book a demo**  
- **Secondary CTA**: **Download the brief** (PDF)

**Problem → Outcome**  
- **Blind spots create risks.** *Identify hazards before they escalate.*  
- **Operational drift costs money.** *Tune processes with real-time insight.*  
- **Sustainability is fragmented.** *Measure and improve what matters.*

**Platform highlight (IntegAI)**  
- **Offline-first, sovereign by design**: Works in low/no-connectivity.  
- **Edge-to-Cloud**: Smart routing, compression, and secure sync.  
- **Safety layer**: PPE compliance, zone breaches, anomaly detection.

**Solutions (cards)**  
- **Construction Safety** — Reduce incidents across dynamic sites.  
- **Energy Reliability** — Predict failures and balance loads.  
- **Manufacturing Insight** — Machine health and line optimization.

**Results**  
- *72% faster* incident triage • *23% fewer* unplanned stops • *15% energy* reduction.  
*(Illustrative; customize per sector when case data is public.)*

**Testimonials**  
- “HISL gave us eyes where we had none — and the autonomy to run it our way.” — **Ops Director, Tier-1 EPC**

**CTA Band**  
- **See it on your site in 30 minutes.** *Bring a current workflow; we’ll mirror it live.*  
  Button: **Book a demo**

---

## 3.2 Solutions — Construction Safety

```
[Hero: Headline | KPIs | CTA]
[Use cases grid]
[How it works (3 steps)]
[Integrations]
[Case study]
[FAQ]
[CTA band]
```

**Hero**: *Safer builds, fewer delays.*  
**KPI pills**: TRIR ↓, near-misses logged ↑, schedule slips ↓.  
**CTA**: **Book a site walkthrough**

**Use cases**  
- **PPE & Zone Compliance** — Identify missing PPE, restricted-zone breaches.  
- **Lift & Crane Safety** — Load angle, proximity, wind thresholds.  
- **Temporary Works Monitoring** — Vibration and load anomalies.  
- **Hot Work & Confined Spaces** — Permit validation & continuous checks.

**How it works**  
1. **Sense**: Cameras/LiDAR/sensors you approve.  
2. **Understand**: On-device models tuned to your site.  
3. **Act**: Alerts to radios, boards, and workflows you already use.

**Integrations**: Procore, Autodesk Build, radios/PA, MS Teams, Slack, email, SMS.

**Case study (teaser)**  
- *Metro Rail Extension, 18 months*: **34%** fewer recordables, **12%** schedule adherence improvement.

**FAQ**  
- *Privacy?* Data residency + on-prem processing by default.  
- *Union friendly?* Safety-first patterns; non-punitive configurations available.

---

## 3.3 Solutions — Energy Reliability

**Hero**: *Predictive insight for resilient grids.*  
**Use cases**: Transformer thermal anomalies, vegetation encroachment, blade damage, substation intrusion, peak shaving.  
**KPI pills**: MTBF ↑, SAIDI/SAIFI ↓, truck rolls ↓.  
**CTA**: **Run a pilot on a single substation**

---

## 3.4 Solutions — Manufacturing Insight

**Hero**: *From downtime to design time.*  
**Use cases**: Bearing wear, vibration signatures, process drift, quality escapes.  
**KPI pills**: OEE ↑, Scrap ↓, Energy per unit ↓.  
**CTA**: **Assess one line in one week**

---

## 3.5 Platform — IntegAI

```
[Hero: “Sovereign, offline-first orchestration”]
[Architecture explainer: Edge → Site Core → Cloud (optional)]
[Capabilities: Sensing, Orchestration, Safety, Observability]
[Security & Governance]
[Deployments & Sizing]
[CTA]
```

**Hero**: *Sovereign AI that works where work happens.*

**Architecture**  
- **Edge**: Cameras/sensors + on-device models, real-time constraints.  
- **Site Core**: Orchestration, event bus, policy, audit.  
- **Cloud (optional)**: Aggregation, fleet updates, analytics.

**Capabilities**  
- **Orchestration**: Policy-driven flows; retries/timeouts/HITL.  
- **Observability**: Event tracing, metrics, heatmaps.  
- **Safety layer**: Prebuilt modules for PPE, zones, anomalies.  
- **Interoperability**: APIs, webhooks, OPC-UA, Modbus gateways.

**Security & Governance**  
- Role-based access, private-by-default video, redaction pipelines, immutable audit logs.

**Deployments**  
- Single site (rack/edge) → multi-site fleet; air-gapped capable.

**CTA**: **Request architecture brief**

---

## 3.6 Services

- **Advisory**: Risk mapping, workflows, ROI modeling.  
- **Integration**: Device sourcing, network planning, on-prem builds.  
- **Training**: Safety ops, ML ops, privacy best practices.

**CTA**: **Talk to an integration engineer**

---

## 3.7 Case Studies (Index & Template)

**Index intro**: *Proof in practice.* Filter by sector, outcome, deployment size.

**Template**  
- **Title**: Outcome + Client type + Region  
- **Challenge → Approach → Results**  
- **KPIs**: Clear before/after.  
- **Graph/Timeline** + **Quotes**  
- **CTA**: *Schedule a deep dive*

---

## 3.8 Resources

**Blog**: Practical posts: guides, lessons learned, safety culture.  
**Docs**: Basic API/SDK & deployment notes (public subset).  
**Events**: Webinars, conference talks, site days.  
**Newsletter**: Monthly, action-oriented.

---

## 3.9 Company

**About**: Our mission is safe, sustainable, sovereign industry.  
**Team**: Photos (in context, PPE), bios, expertise.  
**Careers**: Impact-first roles; field experience valued.  
**Press Kit**: Logos, colors, headshots, brand story.

---

## 3.10 Contact

**Lead form fields**  
- First name, Last name, Work email, Company, Role, Phone (optional)  
- Sector (multi-select), Sites (#), Primary goal (safety/ops/sustainability)  
- Message  
- Consent + Privacy

**Thank-you**: *We’ll reply within one business day with a short checklist and a scheduling link.*

---

## 3.11 System Pages

- **Search** results with filters (sector, content type, date).  
- **404**: *We couldn’t find that route — here’s the site map.*  
- **Legal**: Privacy, Terms, Responsible AI, DPA; human-readable summaries.

---

# 4) Components Library (Specs)

## 4.1 Header & Nav
- Sticky after 120px scroll; compact mode reduces height by 12–16px.  
- Mobile: full-height drawer; accordion subnav; contact button fixed at bottom.

## 4.2 Buttons
- **Primary**: Gold fill, black text.  
- **Secondary**: Outline gold; text gold on transparent.  
- **Tertiary**: Text link with sky underline hover.

States: hover (+2% brightness), active (shadow down), focus ring sky-500 2px.

## 4.3 Cards
- Surfaces in `--surface`, radius 12, subtle inner stroke `rgba(255,255,255,0.06)`.  
- Optional **circuit overlay** at 3% opacity.

## 4.4 Forms
- React Hook Form + Zod validation; inline errors; success toasts.  
- File upload: drag/drop, virus scan indicator, filesize caps per page.

## 4.5 Content Blocks
- **Hero** (copy-first; support visual right).  
- **Feature list** (icon + label + sentence).  
- **KPIs** (mono font, animated count-up).  
- **Timeline/Steps**.  
- **Logo Cloud** (8–12 logos, grayscale → color on hover).  
- **Testimonial** (avatar, role, logo).  
- **FAQ** (accordion).  
- **CTA band**.

## 4.6 Motion Patterns
- Entrance: bottom-up 16px, fade, 240ms.  
- Parallax glow behind mark; node pulses (5s loop).  
- Reduce-motion: disables parallax, keeps fades.

---

# 5) Imagery — Sourcing & Handling

## 5.1 Sources
- Prefer **original site photography** (short on-site shoots).  
- Supplement with **premium stock** (Getty, Adobe Stock) for hard-to-capture scenes.  
- 3D: simple GLTF of the **hard-hat mark**; minimal poly; 2k PBR gold material.

## 5.2 Generative Support (optional)
- Use prompts that emphasize **safety**, **authentic gear**, **diverse crews**, **realistic lighting**.  
- Example prompt (for concept boards):  
  > *“Night industrial maintenance scene, workers in proper PPE, headlamps, steam illuminated, cool steel color palette with warm gold highlights, cinematic, 35mm, f/2.8, shallow depth of field, volumetric light, realistic, high detail — no branding, no logos.”*

> **Note**: Keep generative imagery to concept/illustration. Real sites need **real photos**.

## 5.3 Technical Handling
- Use Next.js `<Image>` with AVIF/WebP, responsive sizes, `priority` only for above-the-fold hero.  
- Lazy-load below-the-fold.  
- Color profile sRGB; 85–90% quality.  
- Alt text required; captions when safety context is important.

---

# 6) SEO, Accessibility, Performance

## 6.1 SEO
- Title ≤ 60 chars; meta desc 150–160.  
- Canonicals, Open Graph & Twitter cards; dynamic OG via Satori.  
- Structured data: `Organization`, `Product`, `Article`, `BreadcrumbList`.  
- XML sitemap + robots; block staging.

## 6.2 Accessibility (WCAG 2.2 AA)
- Color contrast ≥ 4.5:1; focus visible; skip link; semantic landmarks.  
- ARIA only to enhance; not to replace semantics.  
- Keyboard traps forbidden; test with screen readers (NVDA/VoiceOver).  
- Captions/transcripts for any video.

## 6.3 Performance Budgets (Lighthouse/Psi)
- LCP < 2.0s (mid-tier mobile), CLS < 0.05, INP < 200ms.  
- JS < 180kb hydrated on entry; ship **RSC-first**.  
- Fonts: subset, `display=swap`, 2 cuts max per family.  
- Images: preconnect + `fetchpriority` on hero only.

---

# 7) Tech Stack & Tooling (Suggested)

- **Framework**: Next.js (App Router, RSC, Edge runtime where sensible).  
- **Language**: TypeScript strict.  
- **UI**: Tailwind CSS + shadcn/ui + Radix primitives.  
- **State/Forms**: React Hook Form + Zod; TanStack Query for data fetch.  
- **Graphics/Motion**: Framer Motion; Three.js (optional for GLTF mark).  
- **CMS**: Sanity (portable text) or Payload (self-host). Blogs via MDX optional.  
- **Search**: Algolia/Typesense (site search); local for docs.  
- **Auth (if needed)**: Clerk or Auth.js.  
- **DB**: Postgres + Drizzle ORM (for forms/logs if stored).  
- **Deployment**: Vercel; Static + serverless blend; image optimization on edge.  
- **Analytics**: Vercel Analytics + Umami/Plausible; events for CTA clicks.  
- **Monitoring**: Sentry (front) + Audit logs for forms.  
- **Testing**: Playwright (e2e), Vitest (unit), Axe (a11y).  
- **CI/CD**: GitHub Actions; preview deploys per PR; visual diff (Chromatic or Happo).

---

# 8) CMS Content Model (Core Types)

- **Site Settings**: nav, footer, socials, contact email, schema, consent text.  
- **Page**: slug, title, SEO, blocks[].  
- **Post**: title, slug, author, cover, tags[], body (portable text), related[].  
- **CaseStudy**: client type, region, challenge, approach, results, KPIs[], media[].  
- **Solution**: sector, hero, useCases[], integrations[], faq[].  
- **Event**: title, date, location, registration link.  
- **TeamMember**: name, role, bio, headshot, socials.  
- **Asset**: image/video/3D + alt + rights + consent.  
- **Legal**: policy type, body, effective date.

---

# 9) Copy Standards & Microcopy

- **CTA style**: Action + value (e.g., “Book a demo” not “Submit”).  
- **Error tone**: Calm + next step. *“That didn’t upload. Try a smaller file or email us.”*  
- **Data claims**: Show **source & timeframe**; avoid absolute promises.

**Boilerplate**  
> **HISL** delivers sovereign, offline-first industrial intelligence that improves safety, reliability, and sustainability — on your terms.

---

# 10) Governance & Ops

## 10.1 Notion (Content HQ)
- Space: **HISL / Website**  
  - **Backlog** (ideas, briefs)  
  - **Pages** (Kanban: Draft → Review → Approved → Live)  
  - **Media log** (rights, consent, alt text)  
  - **SEO** (keywords, snippets)  
  - **Changelog**

## 10.2 Whimsical (Wireframes + Flows)
- Board: **HISL • Website v1**  
  - Frames per page above; link each component spec.  
  - Flow maps for **Demo** and **Lead** funnels.

## 10.3 NAS (Assets & Source of Truth)
```
/HISL_Website/
  /brand/
    logo_hisl_v1/
      hisl-mark-fullcolor.svg
      hisl-mark-mono-gold.svg
      hisl-lockup-horizontal.svg
      hisl-favicon.svg
    typography/
      geist-sans/
      geist-mono/
    colors/
      tokens.json
  /imagery/
    photography/
      construction/
      energy/
      manufacturing/
    textures/
      metal_brushed/
      circuits/
      orbital/
    3d/
      hardhat_mark.glb
  /content/
    pages/
    posts/
    case-studies/
    legal/
  /exports/
    og-images/
    press-kit/
  /docs/
    seo/
    a11y/
    performance/
```

---

# 11) Legal & Responsible AI (Public Summaries)

- **Privacy**: Minimal data; opt-in analytics; data residency honored.  
- **Responsible AI**: Human oversight; bias testing; fail-safe defaults; audit logs.  
- **Data Processing Addendum**: Available on request; model/data boundaries clear.

---

# 12) Launch Checklist

- [ ] Lighthouse targets met (mobile).  
- [ ] WCAG 2.2 AA checklist complete.  
- [ ] SEO: titles, meta, OG, sitemap, robots.  
- [ ] Analytics & events verified.  
- [ ] Forms tested (validation, consent, spam).  
- [ ] Fallbacks: no-JS, reduced motion, offline states.  
- [ ] 404/500 styled.  
- [ ] Press kit published.

---

# APPENDIX A — Home Page Final Copy (Longform Option)

**Hero**  
- Headline: *Industrial intelligence that keeps people safe — and operations sustainable.*  
- Subhead: *Prevent incidents, improve throughput, and reduce emissions with AI that runs on your terms — even offline.*  
- CTA: **Book a demo** • Secondary: **Download the brief**

**Feature bullets**  
- **Safety intelligence** that acts before incidents occur.  
- **Operational excellence** through measurable insights.  
- **Sustainable outcomes** you can verify.

**Mini case study**  
- *“We saw 23% fewer unplanned stops within eight weeks.”* — Plant Manager, EMEA

**FAQ teaser**  
- *Does this work without constant internet?* — **Yes.** Edge-first design with secure sync.

---

# APPENDIX B — Style Tokens (Tailwind-style names)

```
colors:
  bg: "#06080B"
  surface: "#0B0F12"
  elev-1: "#11171C"
  text: "#E6EDF3"
  muted: "#9AA4AF"
  brand:
    gold:
      300: "#F2D08A"
      600: "#D9A441"
    ecoGreen:
      500: "#4FEA77"
  safetyOrange: "#FF7A59"
  sky: "#4DB3FF"
radii:
  card: 12
  pill: 999
shadow:
  ambient: "0 4px 24px rgba(0,0,0,0.3)"
  dir: "0 2px 8px rgba(0,0,0,0.35)"
fonts:
  heading: "Geist Sans"
  body: "Inter"
  mono: "Geist Mono"
```

---

# APPENDIX C — Sample Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HISL",
  "url": "https://www.hisl.example",
  "logo": "https://www.hisl.example/press-kit/hisl-mark-fullcolor.svg",
  "sameAs": ["https://www.linkedin.com/company/hisl"]
}
```

---

# APPENDIX D — Forms Copy

**Contact**  
- *Legend*: “Tell us about your site”  
- *Consent*: “You agree to our privacy policy and allow us to contact you about safety and operations.”

**Newsletter**  
- *Legend*: “Practical safety and ops insights — monthly.”  
- *Success*: “Thanks — you’re on the list. First issue lands soon.”

---

# APPENDIX E — Visual Examples (Descriptions)

- **Hero visual**: 3D gold hard-hat mark with subtle orbital paths; slow rotation; eco-green node pulses.  
- **Section divider**: thin PCB trace lines that softly glow on scroll.  
- **Case study cards**: grayscale client logos; on hover, gold tint border animates.

---

# APPENDIX F — Roadmap Hooks (Not public by default)

- Pricing (if/when public) as **“Engage”** tiers: Pilot, Site, Fleet.  
- Docs expansion (API, SDK) gated behind partner login.  
- Partner portal (integrators/OEMs).

---

# Final Note

This file is **ready to implement**. If we adjust only one thing later, let it be **real photography from real sites** — it will carry the brand farther than any effect. 
