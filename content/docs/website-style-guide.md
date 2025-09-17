# HISL Website Style Guide

This style guide defines the design tokens, Tailwind setup, and
component specs for the HISL website.

------------------------------------------------------------------------

## Design Tokens (Tailwind)

-   **Colors**
    -   bg: `#0b1220`
    -   panel: `#0f1828`
    -   edge: `#1e2a42`
    -   text: `#e8f0ff`
    -   muted: `#a8b8d6`
    -   gold: `#f6c650`
    -   teal: `#39d7c9`
-   **Fonts**
    -   Inter (sans-serif)
    -   Spectral (serif)
-   **Shadows**
    -   glow: `0 0 40px rgba(57,215,201,.25)`
-   **Layout**
    -   max-width: 1200px (container-wrap)

------------------------------------------------------------------------

## Global CSS

-   Import Google Fonts (Inter + Spectral)
-   Base background: `--bg`
-   Text: `--text`
-   Utility: `.container-wrap` (max-width 1200px + padding)

### Buttons

-   `.btn` = base
-   `.btn-gold` = gradient gold CTA
-   `.btn-ghost` = transparent secondary CTA

### Hero Background Layers

-   `.hero-bg` = absolute wrapper
-   `.hero-dna` = subtle DNA pattern background
-   `.hero-vignette` = radial vignette overlay

------------------------------------------------------------------------

## Components

### Hero.jsx

-   Split grid (text left, globe right)
-   Animated headline: **AI + Human... with soul**
-   Two CTAs: **Start a Demo** (gold) + **Explore the Globe** (ghost)
-   Background layers: DNA + vignette

### MiniGlobe.jsx

-   Realistic Earth (day/night textures + clouds)
-   Subtle atmosphere rim light
-   Two ravens in golden orbit (sprites)
-   Slow autorotation
-   Assets:
    -   `/public/assets/earth_daymap.jpg`
    -   `/public/assets/earth_nightmap.jpg`
    -   `/public/assets/earth_clouds.jpg`
    -   `/public/images/raven_huginn.png`
    -   `/public/images/raven_muninn.png`

------------------------------------------------------------------------

## Verification Checklist

-   Hero loads fast, typography matches
-   MiniGlobe bright + realistic, ravens orbit cleanly
-   Lighthouse score ≥ 90
-   Reduced motion disables parallax
-   Assets present in `/public/...`
