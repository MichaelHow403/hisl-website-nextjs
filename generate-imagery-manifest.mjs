#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROCESSED_DIR = path.join(__dirname, '../public/imagery/processed');
const MANIFEST_PATH = path.join(__dirname, '../src/lib/imagery.ts');

/**
 * Scan processed directory and build image manifest
 */
async function scanProcessedImages() {
  try {
    const manifest = {
      earth: {},
      ravens: {},
      logos: {},
      general: {}
    };

    // Check if processed directory exists
    try {
      await fs.access(PROCESSED_DIR);
    } catch {
      console.log('Processed directory does not exist yet. Run npm run images:process first.');
      return manifest;
    }

    // Scan each category directory
    for (const category of Object.keys(manifest)) {
      const categoryDir = path.join(PROCESSED_DIR, category);
      
      try {
        const files = await fs.readdir(categoryDir);
        const imageGroups = {};

        // Group files by base name
        for (const file of files) {
          if (!file.endsWith('.webp')) continue;

          // Extract base name and size/type
          const match = file.match(/^(.+?)-(lqip|\d+w)\.webp$/);
          if (!match) continue;

          const [, baseName, sizeType] = match;
          
          if (!imageGroups[baseName]) {
            imageGroups[baseName] = {
              name: baseName,
              category,
              sizes: {},
              lqip: null
            };
          }

          if (sizeType === 'lqip') {
            imageGroups[baseName].lqip = `/imagery/processed/${category}/${file}`;
          } else {
            const size = parseInt(sizeType.replace('w', ''));
            imageGroups[baseName].sizes[size] = `/imagery/processed/${category}/${file}`;
          }
        }

        // Convert to final format
        for (const [baseName, data] of Object.entries(imageGroups)) {
          manifest[category][baseName] = {
            name: data.name,
            category: data.category,
            lqip: data.lqip,
            sizes: data.sizes,
            // Generate srcSet for responsive images
            srcSet: Object.entries(data.sizes)
              .map(([size, path]) => `${path} ${size}w`)
              .join(', '),
            // Default src (largest available)
            src: data.sizes[Math.max(...Object.keys(data.sizes).map(Number))] || null
          };
        }

        console.log(`Found ${Object.keys(imageGroups).length} image groups in ${category}`);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          console.error(`Error scanning ${category}:`, error.message);
        }
      }
    }

    return manifest;
  } catch (error) {
    console.error('Error scanning processed images:', error.message);
    return {};
  }
}

/**
 * Generate TypeScript manifest file
 */
async function generateManifest() {
  try {
    console.log('Generating imagery manifest...');

    const manifest = await scanProcessedImages();
    
    // Count total images
    const totalImages = Object.values(manifest).reduce((sum, category) => {
      return sum + Object.keys(category).length;
    }, 0);

    if (totalImages === 0) {
      console.log('No processed images found. Run npm run images:process first.');
      return;
    }

    // Generate TypeScript content
    const tsContent = `// Auto-generated imagery manifest
// Generated on: ${new Date().toISOString()}
// Total images: ${totalImages}

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

export const imagery: ImageManifest = ${JSON.stringify(manifest, null, 2)};

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
`;

    // Ensure lib directory exists
    const libDir = path.dirname(MANIFEST_PATH);
    await fs.mkdir(libDir, { recursive: true });

    // Write the manifest file
    await fs.writeFile(MANIFEST_PATH, tsContent, 'utf8');

    console.log(`✅ Manifest generated successfully!`);
    console.log(`📁 Location: ${MANIFEST_PATH}`);
    console.log(`📊 Total images: ${totalImages}`);
    
    // Log summary by category
    console.log('\nImages by category:');
    Object.entries(manifest).forEach(([category, images]) => {
      const count = Object.keys(images).length;
      if (count > 0) {
        console.log(`  ${category}: ${count} images`);
      }
    });

  } catch (error) {
    console.error('Error generating manifest:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateManifest();
}

export { generateManifest };
