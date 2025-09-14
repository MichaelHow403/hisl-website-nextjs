# HISL Website - Next.js

A world-class, motion-forward website for HISL (Human Intelligence Systems Laboratory) featuring a cinematic imagery pipeline, interactive globe visualization, and sovereign AI infrastructure demonstration.

## 🌟 Features

- **Interactive Globe Visualization**: "Where Your Prompts Go" - visualize AI prompt routing across global data centers
- **Cinematic Imagery Pipeline**: Automated WebP conversion, LQIP generation, and manifest system
- **Sovereign AI Gateway**: Demo LLM endpoint with energy estimation and routing simulation
- **Content Management**: MDX-powered bios and poetry with frontmatter
- **Observability**: Sentry error tracking and PostHog analytics (env-gated)
- **Performance**: Lighthouse CI, Core Web Vitals monitoring, and accessibility compliance
- **Quality Gates**: Comprehensive CI/CD with TypeScript, ESLint, testing, and E2E validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:MichaelHow403/hisl-website-nextjs.git
   cd hisl-website-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Process imagery and generate manifest**
   ```bash
   npm run images:process
   npm run images:manifest
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
hisl-website-nextjs/
├── .github/workflows/     # CI/CD pipelines
├── content/              # MDX content files
├── public/
│   └── imagery/         # Processed images by category
├── scripts/             # Build and processing scripts
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── data/          # Static data and configurations
│   └── lib/           # Utilities and helpers
├── tests/             # E2E tests
└── docs/             # Additional documentation
```

## 🛠 Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint

### Testing
- `npm run test` - Run unit tests with Vitest
- `npm run e2e` - Run E2E tests with Playwright
- `npm run lighthouse:ci` - Run Lighthouse CI audits

### Imagery Pipeline
- `npm run images:process` - Process images with Sharp (WebP conversion, LQIP)
- `npm run images:manifest` - Generate TypeScript imagery manifest

### Quality Assurance
- `npm run ci:verify` - Run all quality gates (lint, typecheck, test, build)

## 🖼️ Imagery Pipeline

The automated imagery pipeline processes all images for optimal web performance:

### Structure
```
public/imagery/
├── earth/        # Globe textures and earth imagery
├── starfields/   # Background star fields
├── nebulae/      # Nebula imagery
├── galaxies/     # Galaxy imagery
└── processed/    # General processed images
```

### Processing Features
- **WebP Conversion**: Automatic conversion to WebP format
- **Multi-Resolution**: Generates 1200px and 2400px variants
- **LQIP Generation**: Low-Quality Image Placeholders for smooth loading
- **Dominant Color**: Extracts dominant colors for backgrounds
- **Attribution**: NASA/ESA/ESO credits where applicable

### Usage
```typescript
import { getImageSrc, getImageLQIP } from '@/app/lib/imagery';

// Get optimized image source
const imageSrc = getImageSrc('earth', 'earth_daymap', 1200);

// Get LQIP for placeholder
const placeholder = getImageLQIP('earth', 'earth_daymap');
```

### Adding New Images
1. Place images in appropriate `public/imagery/{category}/` folder
2. Run `npm run images:process`
3. Run `npm run images:manifest`
4. Import and use via the imagery helpers

## 🌍 Globe Visualization

The interactive globe demonstrates "Where Your Prompts Go" through:

### Features
- **3D Earth**: Rotating earth with cloud layers using Three.js
- **Data Center Pins**: Global infrastructure visualization
- **Raven Sprites**: Huginn and Muninn orbital intelligence
- **Pulse Animation**: Prompt routing visualization
- **Accessibility**: Graceful degradation for reduced motion preferences
- **WebGL Fallback**: Static imagery when WebGL unavailable

### Components
- `GlobeScene`: Three.js 3D rendering
- `GlobeVisualizer`: UI and interaction layer
- `DataCenter`: Global infrastructure data

### Usage
```typescript
import GlobeVisualizer from '@/components/globe/GlobeVisualizer';

export default function GlobePage() {
  return <GlobeVisualizer />;
}
```

## 🤖 LLM Gateway Demo

The demo endpoint simulates AI prompt processing:

### Endpoint: `/api/deepseek`

**Request:**
```json
{
  "agentId": "claude-3-5-sonnet",
  "prompt": "Your prompt here",
  "context": "Optional context"
}
```

**Response:**
```json
{
  "response": "AI response",
  "metadata": {
    "agentId": "claude-3-5-sonnet",
    "processingTime": 1234,
    "energyEstimate": 0.001,
    "promptLength": 15,
    "hasContext": true,
    "mode": "mock"
  }
}
```

### Features
- **Input Validation**: Zod schema validation
- **PII Sanitization**: Automatic removal of sensitive data from logs
- **Energy Estimation**: Simple length-based energy calculation
- **Mock Mode**: Works without API keys for demonstration
- **Error Handling**: Comprehensive error responses

## 📝 Content Management

Content is managed through MDX files with frontmatter:

### Structure
```
content/
├── michael-bio.mdx      # Founder biography
├── integai-bio.mdx      # IntegAI system description
└── site-poem.mdx        # Vision poetry
```

### Frontmatter Format
```yaml
---
title: "Page Title"
updated: "2025-09-14"
summary: "Brief description"
---
```

### Adding Content
1. Create `.mdx` file in `content/` directory
2. Add frontmatter with required fields
3. Write content in Markdown/MDX
4. Create corresponding page in `src/app/`
5. Use `MDXRemote` to render content

## 📊 Observability

### Sentry Error Tracking
- **Environment-Gated**: Only active when `SENTRY_DSN` provided
- **Privacy-First**: Filters sensitive headers and data
- **Development Mode**: Disabled unless `SENTRY_DEBUG=true`
- **Performance Monitoring**: Configurable trace sampling

### PostHog Analytics
- **Privacy-Compliant**: Respects Do Not Track headers
- **Minimal Tracking**: Manual event capture only
- **Environment-Gated**: Only active with `NEXT_PUBLIC_POSTHOG_KEY`
- **Globe Events**: Tracks simulation runs with metadata

### Health Monitoring
- **Health Check**: `/api/health` endpoint with comprehensive status
- **Footer Badge**: Real-time status indicator
- **Metrics**: Response time, commit hash, environment info

## 🎯 Performance & Accessibility

### Core Web Vitals Targets
- **LCP**: ≤ 2.5s (Largest Contentful Paint)
- **CLS**: ≤ 0.1 (Cumulative Layout Shift)
- **FCP**: ≤ 1.8s (First Contentful Paint)

### Accessibility Features
- **Semantic HTML**: Proper heading structure and landmarks
- **Alt Text**: Comprehensive image descriptions
- **Focus Management**: Keyboard navigation support
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Color Contrast**: WCAG AA compliance
- **Screen Reader**: ARIA labels and descriptions

### Performance Optimizations
- **Image Optimization**: WebP format with multiple resolutions
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Edge Runtime**: API routes optimized for edge deployment
- **Static Generation**: Pre-rendered pages where possible

## 🔧 CI/CD Pipeline

### Quality Gates
1. **Lint Check**: ESLint with Next.js configuration
2. **Type Check**: TypeScript strict mode validation
3. **Unit Tests**: Vitest with React Testing Library
4. **Build Verification**: Production build success
5. **E2E Tests**: Playwright cross-browser testing
6. **Lighthouse CI**: Performance and accessibility audits
7. **Security Scan**: npm audit and vulnerability checks

### Deployment
- **Vercel Integration**: Automatic preview deployments
- **Branch Protection**: Requires all checks to pass
- **Preview Comments**: Automatic PR comments with links
- **Environment Promotion**: Staging → Production workflow

## 🌐 Environment Variables

### Required
```bash
# No required variables - app works in demo mode
```

### Optional - Observability
```bash
SENTRY_DSN=your_sentry_dsn
SENTRY_DEBUG=true  # Enable in development
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Optional - LLM APIs
```bash
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
DEEPSEEK_API_KEY=your_deepseek_key
GOOGLE_API_KEY=your_google_key
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```
- **Framework**: Vitest with React Testing Library
- **Coverage**: Component and utility function testing
- **Mocking**: API and external service mocks

### E2E Tests
```bash
npm run e2e
```
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: iOS Safari, Android Chrome
- **Features**: Full user journey testing

### Lighthouse CI
```bash
npm run lighthouse:ci
```
- **Performance**: Core Web Vitals validation
- **Accessibility**: WCAG compliance checking
- **SEO**: Search engine optimization audit
- **Best Practices**: Security and modern web standards

## 📚 Additional Documentation

- [Observability Guide](docs/observability.md)
- [Imagery Pipeline](docs/imagery.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Deployment Guide](docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run quality gates: `npm run ci:verify`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is proprietary to HISL (Human Intelligence Systems Laboratory).

## 🆘 Support

For support and questions:
- **Issues**: GitHub Issues for bug reports and feature requests
- **Discussions**: GitHub Discussions for general questions
- **Email**: [Contact HISL](mailto:contact@hisl.ai)

---

**Built with ❤️ by the HISL team**

*Where your prompts go, dreams follow.*
