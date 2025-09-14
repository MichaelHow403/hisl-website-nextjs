// Auto-generated imagery manifest
// Generated on: 2025-09-14T12:16:48.775Z
// Total images: 14

export interface ImageData {
  name: string;
  category: string;
  lqip: string | null;
  sizes: Record<number, string>;
  srcSet: string;
  src: string | null;
}

export interface ImageManifest {
  earth: Record<string, ImageData>;
  ravens: Record<string, ImageData>;
  logos: Record<string, ImageData>;
  general: Record<string, ImageData>;
}

export const imagery: ImageManifest = {
  "earth": {
    "animated_globe": {
      "name": "animated_globe",
      "category": "earth",
      "lqip": "/imagery/processed/earth/animated_globe-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/earth/animated_globe-1200w.webp"
      },
      "srcSet": "/imagery/processed/earth/animated_globe-1200w.webp 1200w",
      "src": "/imagery/processed/earth/animated_globe-1200w.webp"
    },
    "earth_daymap": {
      "name": "earth_daymap",
      "category": "earth",
      "lqip": "/imagery/processed/earth/earth_daymap-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/earth/earth_daymap-1200w.webp"
      },
      "srcSet": "/imagery/processed/earth/earth_daymap-1200w.webp 1200w",
      "src": "/imagery/processed/earth/earth_daymap-1200w.webp"
    },
    "globe_3d_with_ravens": {
      "name": "globe_3d_with_ravens",
      "category": "earth",
      "lqip": "/imagery/processed/earth/globe_3d_with_ravens-lqip.webp",
      "sizes": {},
      "srcSet": "",
      "src": null
    },
    "rotating_globe_animation": {
      "name": "rotating_globe_animation",
      "category": "earth",
      "lqip": "/imagery/processed/earth/rotating_globe_animation-lqip.webp",
      "sizes": {},
      "srcSet": "",
      "src": null
    }
  },
  "ravens": {
    "raven_huginn": {
      "name": "raven_huginn",
      "category": "ravens",
      "lqip": "/imagery/processed/ravens/raven_huginn-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/ravens/raven_huginn-1200w.webp"
      },
      "srcSet": "/imagery/processed/ravens/raven_huginn-1200w.webp 1200w",
      "src": "/imagery/processed/ravens/raven_huginn-1200w.webp"
    },
    "raven_muninn": {
      "name": "raven_muninn",
      "category": "ravens",
      "lqip": "/imagery/processed/ravens/raven_muninn-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/ravens/raven_muninn-1200w.webp"
      },
      "srcSet": "/imagery/processed/ravens/raven_muninn-1200w.webp 1200w",
      "src": "/imagery/processed/ravens/raven_muninn-1200w.webp"
    }
  },
  "logos": {
    "hisl_logo": {
      "name": "hisl_logo",
      "category": "logos",
      "lqip": "/imagery/processed/logos/hisl_logo-lqip.webp",
      "sizes": {},
      "srcSet": "",
      "src": null
    },
    "ingegai_logo": {
      "name": "ingegai_logo",
      "category": "logos",
      "lqip": "/imagery/processed/logos/ingegai_logo-lqip.webp",
      "sizes": {},
      "srcSet": "",
      "src": null
    }
  },
  "general": {
    "ai_construction_bridge": {
      "name": "ai_construction_bridge",
      "category": "general",
      "lqip": "/imagery/processed/general/ai_construction_bridge-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/general/ai_construction_bridge-1200w.webp",
        "2400": "/imagery/processed/general/ai_construction_bridge-2400w.webp"
      },
      "srcSet": "/imagery/processed/general/ai_construction_bridge-1200w.webp 1200w, /imagery/processed/general/ai_construction_bridge-2400w.webp 2400w",
      "src": "/imagery/processed/general/ai_construction_bridge-2400w.webp"
    },
    "ai_dna": {
      "name": "ai_dna",
      "category": "general",
      "lqip": "/imagery/processed/general/ai_dna-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/general/ai_dna-1200w.webp",
        "2400": "/imagery/processed/general/ai_dna-2400w.webp"
      },
      "srcSet": "/imagery/processed/general/ai_dna-1200w.webp 1200w, /imagery/processed/general/ai_dna-2400w.webp 2400w",
      "src": "/imagery/processed/general/ai_dna-2400w.webp"
    },
    "ai_dna2": {
      "name": "ai_dna2",
      "category": "general",
      "lqip": "/imagery/processed/general/ai_dna2-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/general/ai_dna2-1200w.webp"
      },
      "srcSet": "/imagery/processed/general/ai_dna2-1200w.webp 1200w",
      "src": "/imagery/processed/general/ai_dna2-1200w.webp"
    },
    "feather": {
      "name": "feather",
      "category": "general",
      "lqip": "/imagery/processed/general/feather-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/general/feather-1200w.webp"
      },
      "srcSet": "/imagery/processed/general/feather-1200w.webp 1200w",
      "src": "/imagery/processed/general/feather-1200w.webp"
    },
    "michael_howard": {
      "name": "michael_howard",
      "category": "general",
      "lqip": "/imagery/processed/general/michael_howard-lqip.webp",
      "sizes": {},
      "srcSet": "",
      "src": null
    },
    "reach_for_the_stars": {
      "name": "reach_for_the_stars",
      "category": "general",
      "lqip": "/imagery/processed/general/reach_for_the_stars-lqip.webp",
      "sizes": {
        "1200": "/imagery/processed/general/reach_for_the_stars-1200w.webp"
      },
      "srcSet": "/imagery/processed/general/reach_for_the_stars-1200w.webp 1200w",
      "src": "/imagery/processed/general/reach_for_the_stars-1200w.webp"
    }
  }
};

// Helper functions for easier image access
export function getImage(category: keyof ImageManifest, name: string): ImageData | null {
  return imagery[category][name] || null;
}

export function getImageSrc(category: keyof ImageManifest, name: string, preferredSize = 1200): string | null {
  const image = getImage(category, name);
  if (!image) return null;
  
  // Try to get the preferred size, fallback to largest available
  return image.sizes[preferredSize] || image.src;
}

export function getImageSrcSet(category: keyof ImageManifest, name: string): string | null {
  const image = getImage(category, name);
  return image?.srcSet || null;
}

export function getLQIP(category: keyof ImageManifest, name: string): string | null {
  const image = getImage(category, name);
  return image?.lqip || null;
}

// Category helpers
export const earthImages = imagery.earth;
export const ravenImages = imagery.ravens;
export const logoImages = imagery.logos;
export const generalImages = imagery.general;

// All images flattened
export const allImages = Object.values(imagery).reduce((acc, category) => {
  return { ...acc, ...category };
}, {} as Record<string, ImageData>);
