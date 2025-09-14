// Progressive Web App Configuration
// Future Enhancement - Phase 2 (Q2 2024)

export interface PWAConfig {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  theme_color: string;
  background_color: string;
  icons: PWAIcon[];
  categories: string[];
  orientation: 'any' | 'portrait' | 'landscape';
}

export interface PWAIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

export const hislPWAConfig: PWAConfig = {
  name: 'HISL - Industrial Intelligence Platform',
  short_name: 'HISL',
  description: 'Construction Safety AI & Management Consultancy - Industrial Intelligence for Safety, Sustainability, and Sovereignty',
  start_url: '/',
  display: 'standalone',
  theme_color: '#D9A441', // HISL gold
  background_color: '#0F172A', // Dark slate
  orientation: 'any',
  categories: ['business', 'productivity', 'utilities', 'construction', 'ai'],
  icons: [
    {
      src: '/icons/icon-72x72.png',
      sizes: '72x72',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-96x96.png',
      sizes: '96x96',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-144x144.png',
      sizes: '144x144',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-152x152.png',
      sizes: '152x152',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: '/icons/maskable-icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable'
    },
    {
      src: '/icons/maskable-icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable'
    }
  ]
};

// Service Worker Configuration
export const serviceWorkerConfig = {
  // Cache construction AI data for offline use
  cacheName: 'hisl-industrial-v1',
  cacheAssets: [
    '/',
    '/projects',
    '/knowledge',
    '/strategy-live',
    '/imagery/processed/earth/earth_daymap-1200w.webp',
    '/imagery/processed/ravens/raven_huginn-1200w.webp',
    '/imagery/processed/ravens/raven_muninn-1200w.webp',
    '/imagery/processed/general/ai_construction_bridge-2400w.webp'
  ],
  
  // Offline fallback strategies
  offlineStrategy: {
    pages: '/offline',
    images: '/imagery/offline-placeholder.webp',
    api: { message: 'Offline mode - AI services unavailable' }
  },

  // Push notification settings
  pushNotifications: {
    vapidPublicKey: 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U', // Replace with actual key
    subject: 'mailto:notifications@hisl.ie',
    categories: [
      'safety-alerts',
      'system-status',
      'construction-updates',
      'ai-insights'
    ]
  }
};

// Installation prompt handling
export class PWAInstaller {
  private deferredPrompt: any = null;
  
  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });
    }
  }

  async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    
    return outcome === 'accepted';
  }

  isInstallable(): boolean {
    return this.deferredPrompt !== null;
  }
}

// Usage when implementing:
// 1. Add manifest.json to public/ folder with hislPWAConfig
// 2. Create service worker with serviceWorkerConfig
// 3. Generate PWA icons for all sizes
// 4. Implement PWAInstaller in main app
// 5. Add offline page and error boundaries
