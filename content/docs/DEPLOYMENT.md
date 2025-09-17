# HISL Website Deployment Guide

## Production Deployment Status ✅

**Current Branch:** `next-main`  
**Platform:** Vercel  
**Build Time:** ~2.6 seconds  
**Domain:** hisl.ie

## Pre-Deployment Checklist

### 1. Image Processing Pipeline
```bash
# Clean processed directory
rm -rf public/imagery/processed/*

# Process images for optimization
npm run images:process

# Generate image manifest
npm run images:manifest

# Verify processed images
ls -la public/imagery/processed/
```

### 2. Build Verification
```bash
# Test local build
npm run build

# Expected output: 15 static pages generated
# Expected time: < 5 seconds
```

### 3. Environment Setup
Required environment variables in production:
- `DEEPSEEK_API_KEY` - DeepSeek API integration
- `SENTRY_DSN` - Error monitoring
- `NODE_ENV=production`

## Vercel Deployment Configuration

### Build Settings
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (default)
- **Install Command:** `npm ci`
- **Node.js Version:** 18.x

### Environment Variables
Set in Vercel dashboard under Project Settings > Environment Variables:
```
DEEPSEEK_API_KEY=your_deepseek_api_key
SENTRY_DSN=your_sentry_dsn
NODE_ENV=production
```

### Domain Configuration
- **Production Domain:** hisl.ie
- **Preview Deployments:** Auto-generated Vercel URLs
- **SSL:** Automatic (Let's Encrypt)

## Security Configuration

### Headers (next.config.ts)
- **Content Security Policy:** Restrictive CSP with specific allowed sources
- **HSTS:** Enabled with 1-year max-age
- **X-Frame-Options:** DENY
- **X-Content-Type-Options:** nosniff

### Performance Optimizations
- **Image Processing:** Sharp with WebP conversion
- **Bundle Size:** Tree-shaking enabled
- **Loading:** LQIP placeholders for images
- **Caching:** Static asset optimization

## Manual Deployment Steps

### 1. Pre-flight Checks
```bash
# Verify current branch
git branch

# Should be on: next-main
# Clean working directory
git status
```

### 2. Image Processing
```bash
# Process images (run locally before push)
npm run images:process
npm run images:manifest

# Commit processed images
git add public/imagery/processed/
git commit -m "Update processed imagery assets"
```

### 3. Build Test
```bash
# Test production build locally
npm run build
npm start

# Verify at http://localhost:3000
```

### 4. Deploy to Production
```bash
# Push to production branch
git push origin next-main

# Vercel will automatically deploy
# Monitor deployment in Vercel dashboard
```

## Monitoring & Health Checks

### Build Monitoring
- Monitor Vercel build logs for errors
- Check deployment status in dashboard
- Verify Core Web Vitals metrics

### Performance Monitoring
- **Expected Build Time:** < 5 seconds
- **Expected Page Load:** < 2.5s LCP
- **Image Loading:** WebP with LQIP fallbacks

### Health Endpoints
- `/api/health` - API status check
- Main site availability monitoring

## Rollback Procedures

### Quick Rollback
```bash
# Revert to previous deployment in Vercel
# Or revert Git commit:
git revert HEAD
git push origin next-main
```

### Emergency Procedures
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check image processing pipeline
5. Rollback if needed

## Performance Benchmarks

### Build Performance
- **Static Pages:** 15 pages generated
- **Build Time:** 2.6 seconds average
- **Bundle Size:** Optimized with tree-shaking

### Runtime Performance
- **First Contentful Paint:** < 1.8s target
- **Largest Contentful Paint:** < 2.5s target
- **Cumulative Layout Shift:** < 0.1 target

## Troubleshooting

### Common Issues

#### Build Timeout
- **Issue:** Build taking > 5 minutes
- **Solution:** Verify image processing not running in build
- **Check:** `package.json` build script should only be `next build`

#### Image Loading Errors
- **Issue:** Images not displaying
- **Solution:** Verify processed images exist in `public/imagery/processed/`
- **Command:** `npm run images:process && npm run images:manifest`

#### Environment Variables
- **Issue:** API endpoints failing
- **Solution:** Verify environment variables in Vercel dashboard
- **Check:** `DEEPSEEK_API_KEY` and other required vars

### Support Contacts
- **Technical Issues:** Check PERFORMANCE.md
- **Deployment Issues:** Verify pre-deployment checklist
- **Domain/DNS Issues:** Contact domain registrar

## Future Enhancements

### Planned Improvements
- Analytics integration hooks
- PWA capabilities
- i18n internationalization
- WhatsApp Business integration
- IoT dashboard connectivity

### Monitoring Additions
- Real user monitoring (RUM)
- Error boundary reporting
- Performance regression detection
- Automated accessibility testing

---

**Last Updated:** 2024-12-14  
**Document Version:** 1.0  
**Deployment Status:** ✅ OPERATIONAL
