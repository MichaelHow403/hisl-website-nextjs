# 🌌 HISL Website — Next-Gen Look & Feel Report  

## 🎨 Visual Style & Atmosphere
- **Cinematic** — The site should feel like stepping into a film sequence. Motion, depth, and imagery create a sense of narrative and immersion.  
- **Backdrop** — A living cosmos:  
  - **Galaxy/starfield WebGL canvas** (Three.js/React Three Fiber).  
  - Dynamic particles, subtle parallax, and a sense of infinite depth.  
  - Graceful fallback → static starfield WebP.  
- **Color language** —  
  - Core brand: **gold hard-hat / brain logo**, green eco-nodes, biocircuit overlays.  
  - Backgrounds: deep navy / cosmic black.  
  - Accents: HISL gold (#d4af37), AI green (#39d7c9), soft gradients.  
- **Typography** —  
  - Large, commanding headings (serif / display).  
  - Clean, modern body text (sans-serif, light tracking).  
  - Motion-enhanced entrances (Framer Motion).  
- **Layout** —  
  - Center-stage narrative panels (frosted glass with backdrop-filter).  
  - Radial vignettes to ensure readability on complex backdrops.  
  - Grid-based layouts to balance cinematic imagery and text clarity.  

---

## 🖼 Imagery Strategy
- **Pipeline**  
  - Raw assets stored under `/public/imagery/{earth,starfields,nebulae,galaxies,processed}`.  
  - Automated with **Sharp** → generates multiple widths (1200w, 2400w), WebP, and LQIP (blur placeholders).  
  - `scripts/generate-imagery-manifest.mjs` → typed asset manifest in `/src/app/lib/imagery.ts`.  
- **Usage**  
  - Next.js `<Image>` with `placeholder="blur"`.  
  - Zero hardcoded paths (everything via manifest).  
- **Themes**  
  - Earth (day & night maps), nebulae, galaxies, AI-construction imagery.  
  - Editorial: used as visual metaphors for **evolution → collaboration → exploration**.  

---

## 🕹 Motion & Interactivity
- **Framer Motion** → microanimations for text, CTA hierarchy, section reveals.  
- **React Three Fiber + Drei** →  
  - Globe visualizer: day map, clouds, Huginn & Muninn ravens orbiting, data center pins.  
  - Animated packet trails → simulate AI prompt journeys.  
  - Hero background galaxy: instanced particles (~150–200k desktop, ~40–60k mobile).  
- **Performance tricks**  
  - Throttle when tab hidden.  
  - Respect `prefers-reduced-motion`.  
  - Lazy-init heavy canvases post-LCP.  

---

## 🔑 Content Strategy
- **Pages**  
  - `/about/michael` → Founder story (construction → AI).  
  - `/about/integai` → Platform bio (sovereign, ethical DNA).  
  - `/poem` → *The Craftsman’s Creed* (philosophical anchor).  
- **Format**  
  - MDX content with frontmatter (SEO titles, summaries).  
  - Styled typography components for poetry, bios.  
- **Tone**  
  - Authentic, reflective, timeless.  
  - Balanced with high-tech visual context (globe, cosmos).  

---

## 📊 Live Data & API Features
- **PostHog** → analytics + user journey tracking.  
- **Sentry** → error monitoring.  
- **DeepSeek API** → sovereign AI demo (`/globe` page).  
  - User types a prompt → globe animates across data centers → output rendered with est. energy usage.  
- **Future metrics**  
  - Real energy dashboards (Carbon Aware SDK / Arbor.eco-style).  
  - Live news feed integration.  

---

## ⚙️ Dev & Build Tools
- **Next.js 15.5 App Router** — server components, ISR, turbopack.  
- **Framer Motion** — declarative motion, micro-UX.  
- **React Three Fiber** — WebGL abstractions, performant 3D.  
- **Sharp** — image optimization pipeline.  
- **MDX** — hybrid content + React components.  
- **GitHub → Vercel** — auto deploy pipeline, previews.  
- **CI/CD**  
  - Lint, typecheck, unit + e2e tests.  
  - Lighthouse CI for perf budgets (sub-2s LCP).  
- **Secrets** → managed in Vercel env vars (never hardcoded).  

---

## 🔮 Overall Feel
- **Cinematic yet functional.** Users feel they’ve entered an **AI-powered observatory**, but content is crystal clear and navigable.  
- **Motion is storytelling.** Animations aren’t decoration — they reinforce sovereignty, connectivity, and human-craftsmanship themes.  
- **Every page feels alive.** Background galaxies drift, globes rotate, ravens orbit, packets pulse. Yet: smooth, respectful of system performance.  
- **Next-gen UI stack.** The combination of R3F, Framer Motion, Sharp pipeline, MDX content, and edge APIs make this a *world-class reference site*.  

---

⚡ In short:  
The HISL website is **cinematic, sovereign, and alive** — combining handcrafted content, cosmic visuals, and cutting-edge frameworks into a performance-tuned, future-proof build.  
