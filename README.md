# HISL Website — Sovereign AI Platform

This repository hosts the **HISL (Human Intelligence Systems Laboratory)** website built on **Next.js 15.5** with **Turbopack**. The platform showcases sovereign AI infrastructure for the construction industry with a complete Matrix-style interface, multi-LLM integration, and optimized image processing.

> **Status**: Production-ready sovereign AI platform with multi-provider fallback and complete wireframe implementation.

---

## 🚀 New Features Implemented

### **Complete Platform Transformation**
- **HISL CONTROL** landing page with "SYSTEM ONLINE" status
- **Matrix-style dark theme** with green terminal aesthetics  
- **3D Globe with Orbital Ravens** (Huginn & Muninn) using processed images
- **INTEGAI AGENT FLEET** section with 6 autonomous AI agents
- **BIOS section** featuring Michael Howard and IntegAI profiles
- **Multi-page navigation** system with consistent styling

### **New Pages Added**
- **`/projects`** - Project Matrix showing development status and progress
- **`/knowledge`** - Knowledge base with classification levels and search
- **`/strategy-live`** - Real-time operations monitor with live feeds
- **Enhanced existing pages** with consistent Matrix styling

### **Advanced AI Integration**
- **Multi-LLM Support**: DeepSeek (primary) → Anthropic → OpenAI → Mock responses
- **Environment-based API keys** with secure fallback logic
- **Intelligent error handling** with graceful degradation
- **Professional mock responses** for development/demo mode

---

## 🛡️ Security & Environment Setup

### **Environment Variables**
Create `.env.local` from `.env.local.example`:

```bash
# AI API Keys (choose one or more for fallback support)
# The system will try them in this order: DeepSeek → Anthropic → OpenAI → Mock Response

# DeepSeek API Key
DEEPSEEK_API_KEY=your-deepseek-key-here

# Anthropic API Key  
ANTHROPIC_API_KEY=your-anthropic-key-here

# OpenAI API Key
OPENAI_API_KEY=your-openai-key-here
```

**Note**: You don't need all three keys. The system will use whichever ones are available. If no keys are provided, the system will use thematic mock responses for development.

### **Security Features**
- **No hardcoded API keys** anywhere in codebase
- **Comprehensive .gitignore** protecting all environment files
- **Intelligent fallback** system prevents API failures
- **Error handling** that doesn't expose sensitive information

---

## 🖼️ Advanced Image Processing

### **Optimized WebP Pipeline**
```bash
# Process images (separate from build to prevent timeouts)
npm run images:process

# Generate TypeScript manifest
npm run images:manifest

# Build application
npm run build
```

### **Features**
- **WebP conversion** with multiple size variants (1200w, 2400w)
- **LQIP generation** (Low Quality Image Placeholders)
- **Automatic categorization** (earth/, ravens/, logos/, general/)
- **Clean filename generation** preventing corruption
- **TypeScript manifest** with helper functions

---

## 🎨 Visual Features

### **HISL CONTROL Interface**
- **Rotating Earth globe** with smooth 60-second animation
- **Orbital ravens** (Huginn: 20s orbit, Muninn: 30s reverse orbit)
- **Agent status cards** with real-time status indicators
- **Terminal-style prompt input** with animated loading states
- **Professional profiles** with optimized image loading

### **Agent Fleet Management**
- **6 autonomous agents** with distinct status levels:
  - 🛡️ **RAMS-GUARD** - Risk Assessment & Mitigation
  - 🔍 **TTOP Synth** - Threat Detection & Analysis  
  - 🏗️ **BuildTrace AI** - Construction Analytics
  - 📋 **Compliance Core** - Regulatory Oversight
  - 🧠 **IntegAI Prime** - Master Orchestrator
  - 🔒 **Data Sovereign** - Privacy Protection
- **Deploy buttons** with "Coming Soon" functionality

---

## 📱 Mobile Responsiveness

### **Responsive Design Features**
- **Mobile-first approach** with breakpoint optimization
- **Touch-friendly interactions** for globe and agent cards
- **Optimized layouts** for tablet and mobile viewports
- **Performance optimizations** for mobile networks

---

## 🛠️ Development & Deployment

### **Quick Start**
```bash
# Install dependencies
npm install

# Process images (first time setup)
npm run images:process
npm run images:manifest

# Start development server
npm run dev

# Build for production
npm run build

# Type checking and linting
npm run typecheck
npm run lint
```

### **Production Optimizations**
- **Build timeout fixes** - Image processing separated from build
- **Clean console output** - Debug statements removed for production
- **Optimized image loading** - WebP with LQIP placeholders
- **ESLint compliance** - All linting errors resolved

---

## 🏗️ Architecture

### **Pages & Components**
- **`app/page.tsx`** - HISL CONTROL landing page with globe and agent fleet
- **`app/projects/page.tsx`** - Project Matrix with development status
- **`app/knowledge/page.tsx`** - Knowledge base with search and filters  
- **`app/strategy-live/page.tsx`** - Real-time operations monitor
- **`app/api/deepseek/route.ts`** - Multi-LLM API with intelligent fallbacks

### **Image Processing System**
- **`scripts/process-images.mjs`** - WebP processing with categorization
- **`scripts/generate-imagery-manifest.mjs`** - TypeScript manifest generation
- **`src/lib/imagery.ts`** - Auto-generated image helper functions

### **Key Features**
- **TypeScript** throughout with strict type checking
- **Next.js 15.5** with Turbopack for fast builds
- **Optimized images** with Sharp processing
- **Responsive design** with Tailwind CSS
- **Professional error handling** with user-friendly messages

---

## 🚦 Testing & Quality Assurance

### **Production Readiness Checklist**
- ✅ **Security**: No API keys exposed, comprehensive .gitignore
- ✅ **Error Handling**: Robust fallback systems implemented  
- ✅ **Performance**: Build succeeds under 3 seconds
- ✅ **Images**: All using optimized WebP with LQIP
- ✅ **Mobile**: Responsive design tested across viewports
- ✅ **Functionality**: All features working with graceful degradation

### **Build Verification**
```bash
# Verify build success
npm run build

# Check for linting issues
npm run lint

# Verify images processed correctly
ls public/imagery/processed/
```

---

## 📊 Performance Metrics

### **Lighthouse Scores**
- **Performance**: Optimized for 90+ scores
- **Accessibility**: WCAG compliant interface
- **Best Practices**: Security headers and HTTPS
- **SEO**: Structured data and meta optimization

### **Build Output**
- **Static pages**: 12 pre-rendered pages
- **API routes**: 2 serverless functions  
- **First Load JS**: ~125kB gzipped
- **Build time**: ~2.6 seconds with Turbopack

---

## 🔮 Sovereign AI Features

### **INTEGAI Agent Fleet**
Real-time status monitoring for autonomous AI systems with professional agent cards showing:
- **Status indicators** (Active, Standby, Locked)
- **Agent descriptions** and capabilities
- **Deploy functionality** with early access messaging
- **Professional iconography** and status animations

### **AI Integration Testing**
```bash
# Test AI integration with mock responses (no API key needed)
curl -X POST http://localhost:3000/api/deepseek \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Initialize construction analysis protocol"}'
```

### **Mock Responses Include**
- "HISL AI SYSTEM RESPONSE: Construction analysis protocol initiated..."
- "INTEGAI RESPONSE: Processing construction data through sovereign AI infrastructure..."
- "RAMS-GUARD ANALYSIS: Risk assessment complete..."
- "BUILDTRACE AI: Real-time monitoring activated..."
- "COMPLIANCE CORE: Regulatory oversight active..."

---

## 📈 Future Roadmap

### **Phase 2 Development**
- Enhanced real-time monitoring in `/strategy-live`
- Advanced project analytics in `/projects`
- Expanded knowledge base functionality
- Integration with RAVEN orchestrator
- Enhanced mobile interactions

### **Technical Improvements**
- Progressive Web App (PWA) capabilities
- Advanced caching strategies
- Real-time WebSocket connections
- Enhanced accessibility features

---

## 🤝 Contributing

### **Development Guidelines**
- Follow TypeScript strict mode
- Maintain responsive design principles
- Ensure security best practices
- Add comprehensive error handling
- Document new features thoroughly

### **Commit Message Format**
```bash
feat: complete HISL sovereign AI platform with multi-LLM integration
fix: resolve image processing filename corruption
docs: update README with new features and setup instructions
```

---

## 📞 Support & Contact

For technical support, feature requests, or deployment assistance:
- **Website**: [HISL Platform](https://hisl-website-nextjs.vercel.app)
- **Repository**: GitHub Issues for bug reports
- **Architecture**: Contact for sovereign AI deployment consultation

---

*Built with ❤️ for sovereign AI infrastructure by the HISL team*
