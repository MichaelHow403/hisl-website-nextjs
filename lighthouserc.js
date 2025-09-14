module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/globe',
        'http://localhost:3000/about/michael',
        'http://localhost:3000/about/integai',
        'http://localhost:3000/poem'
      ],
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'Ready on',
      startServerReadyTimeout: 30000,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': 'off', // PWA not required for this project
        
        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        
        // Accessibility
        'color-contrast': 'error',
        'heading-order': 'error',
        'html-has-lang': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        
        // Best practices
        'uses-https': 'error',
        'is-on-https': 'error',
        'uses-http2': 'warn',
        'no-vulnerable-libraries': 'error',
        
        // Performance
        'unused-javascript': 'warn',
        'unused-css-rules': 'warn',
        'modern-image-formats': 'warn',
        'uses-optimized-images': 'warn',
        'uses-webp-images': 'warn',
        'uses-responsive-images': 'warn',
        'efficient-animated-content': 'warn',
        'preload-lcp-image': 'warn',
        
        // SEO
        'meta-description': 'error',
        'document-title': 'error',
        'crawlable-anchors': 'error',
        'robots-txt': 'warn',
        'canonical': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
