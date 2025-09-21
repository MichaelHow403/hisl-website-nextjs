
# Wireframe Implementation Checklist

## Routes to create
- `/` (Home / Landing)
- `/globe` (Where Your Prompts Go)
- `/deploy` (IntegAI Agent Deployment Platform)
- `/news` (Live News)
- `/about`
- `/contact`

## Home sections (Contentlayer slugs)
1. `01-hero.mdx`
2. `02-capabilities.mdx`
3. `03-features.mdx`
4. `04-ethos.mdx`
5. `05-chat-preview.mdx`
6. `99-footer.mdx`

## Globe page
- Three.js canvas, pins, pulse paths, gold ravens
- POST `/api/integai/simulate` → output panel
- Legend + metrics

## Deploy page
- Intake form → POST `/api/integai/assess` → simulate → result

## News page
- GET `/api/news/search` proxy → list

## About
- Render `/content/bios/hisl.mdx` and `/content/bios/integai.mdx`

## Contact
- Form → thank you confirmation


