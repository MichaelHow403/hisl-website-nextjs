# HISL Website - Next.js Stack

## Architecture  
- **Framework**: Next.js 15.5.0 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5
- **Deployment**: Vercel
- **Build**: Turbopack (--turbopack flag)

## Key Dependencies
- React Three Fiber + Drei (3D Globe)
- Framer Motion (Animations) 
- OpenAI SDK (AI Integration)
- Radix UI (Components)
- React Hook Form + Zod (Forms)

## Development
\`\`\`bash
npm run dev        # Development with Turbopack
npm run build      # Production build  
npm run start      # Production server
npm run lint       # ESLint check
\`\`\`

## Deployment Pipeline
1. Push to \`next-main\` branch
2. Vercel auto-builds and deploys
3. Domain: hisl.ie (via Blacknight DNS)

## Environment Variables (Vercel)
- \`NEXT_PUBLIC_API_URL\`
- \`INTEGAI_API_KEY\`
- \`DEEPSEEK_API_KEY\`
- \`OPENAI_API_KEY\`

## Compliance Notes
- Security headers configured in next.config.ts
- GDPR-compliant data handling
- NIS2 alignment considerations
- Privacy-first analytics ready
