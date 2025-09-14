#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// NASA/ESA/ESO attribution mapping
const ATTRIBUTION_MAP = {
  'earth': 'NASA/NOAA',
  'starfields': 'NASA/ESA Hubble Space Telescope',
  'nebulae': 'NASA/ESA/ESO',
  'galaxies': 'NASA/ESA Hubble Space Telescope',
  'processed': ''
};

// Scan processed images and generate manifest
async function generateManifest() {
  console.log('📋 Generating imagery manifest...');
  
  const imageryDir = path.join(projectRoot, 'public', 'imagery');
  const processedResultsPath = path.join(projectRoot, 'scripts', 'processed-images.json');
  
  let processedImages = [];
  
  // Try to load processed images data
  try {
    const data = await fs.readFile(processedResultsPath, 'utf-8');
    processedImages = JSON.parse(data);
  } catch (error) {
    console.warn('No processed images data found, scanning directories...');
    
    // Fallback: scan directories directly
    processedImages = await scanImageryDirectories(imageryDir);
  }
  
  // Build imagery manifest
  const imagery = {};
  const attribution = {};
  const lqip = {};
  const dominantColors = {};
  
  // Deduplicate by bucket/filename
  const seen = new Set();
  
  for (const image of processedImages) {
    const key = `${image.bucket}/${image.filename}`;
    
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    
    // Find best WebP variant (largest width)
    const bestVariant = image.variants?.reduce((best, current) => 
      current.width > best.width ? current : best
    );
    
    if (bestVariant) {
      imagery[key] = {
        src: `/${bestVariant.path}`,
        width: bestVariant.width,
        sizes: image.variants?.map(v => ({
          src: `/${v.path}`,
          width: v.width,
          size: v.size
        })) || []
      };
      
      // Attribution
      attribution[key] = ATTRIBUTION_MAP[image.bucket] || '';
      
      // LQIP and dominant color
      if (image.lqip) {
        lqip[key] = image.lqip;
      }
      if (image.dominantColor) {
        dominantColors[key] = image.dominantColor;
      }
    }
  }
  
  // Generate TypeScript manifest file
  const manifestContent = `// Auto-generated imagery manifest
// Do not edit manually - run 'npm run images:manifest' to regenerate

export interface ImageVariant {
  src: string;
  width: number;
  size: number;
}

export interface ImageEntry {
  src: string;
  width: number;
  sizes: ImageVariant[];
}

export const IMAGERY: Record<string, ImageEntry> = ${JSON.stringify(imagery, null, 2)};

export const ATTRIBUTION: Record<string, string> = ${JSON.stringify(attribution, null, 2)};

export const LQIP: Record<string, string> = ${JSON.stringify(lqip, null, 2)};

export const DOMINANT_COLORS: Record<string, string> = ${JSON.stringify(dominantColors, null, 2)};

// Helper functions
export function getImage(bucket: string, filename: string): ImageEntry | null {
  const key = \`\${bucket}/\${filename}\`;
  return IMAGERY[key] || null;
}

export function getImageSrc(bucket: string, filename: string, width?: number): string | null {
  const image = getImage(bucket, filename);
  if (!image) return null;
  
  if (!width) return image.src;
  
  // Find closest width
  const variant = image.sizes.reduce((closest, current) => 
    Math.abs(current.width - width) < Math.abs(closest.width - width) ? current : closest
  );
  
  return variant.src;
}

export function getImageLQIP(bucket: string, filename: string): string | null {
  const key = \`\${bucket}/\${filename}\`;
  return LQIP[key] || null;
}

export function getImageAttribution(bucket: string, filename: string): string {
  const key = \`\${bucket}/\${filename}\`;
  return ATTRIBUTION[key] || '';
}

export function getDominantColor(bucket: string, filename: string): string {
  const key = \`\${bucket}/\${filename}\`;
  return DOMINANT_COLORS[key] || 'rgb(0, 0, 0)';
}

// Bucket helpers
export const BUCKETS = ['earth', 'starfields', 'nebulae', 'galaxies', 'processed'] as const;
export type ImageBucket = typeof BUCKETS[number];

export function getImagesByBucket(bucket: ImageBucket): Record<string, ImageEntry> {
  return Object.fromEntries(
    Object.entries(IMAGERY).filter(([key]) => key.startsWith(\`\${bucket}/\`))
  );
}

// Random image helpers
export function getRandomImage(bucket?: ImageBucket): ImageEntry | null {
  const images = bucket ? getImagesByBucket(bucket) : IMAGERY;
  const keys = Object.keys(images);
  
  if (keys.length === 0) return null;
  
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return images[randomKey];
}

// Generated at: ${new Date().toISOString()}
// Total images: ${Object.keys(imagery).length}
`;
  
  // Ensure lib directory exists
  const libDir = path.join(projectRoot, 'src', 'app', 'lib');
  await fs.mkdir(libDir, { recursive: true });
  
  // Write manifest file
  const manifestPath = path.join(libDir, 'imagery.ts');
  await fs.writeFile(manifestPath, manifestContent);
  
  console.log(`✅ Generated imagery manifest with ${Object.keys(imagery).length} images`);
  console.log(`📁 Manifest saved to ${path.relative(projectRoot, manifestPath)}`);
  
  // Summary by bucket
  const bucketCounts = Object.keys(imagery).reduce((acc, key) => {
    const bucket = key.split('/')[0];
    acc[bucket] = (acc[bucket] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📊 Manifest summary by bucket:');
  Object.entries(bucketCounts).forEach(([bucket, count]) => {
    console.log(`  ${bucket}: ${count} images`);
  });
  
  return manifestPath;
}

// Fallback: scan imagery directories directly
async function scanImageryDirectories(imageryDir) {
  const images = [];
  const buckets = ['earth', 'starfields', 'nebulae', 'galaxies', 'processed'];
  
  for (const bucket of buckets) {
    const bucketDir = path.join(imageryDir, bucket);
    
    try {
      const files = await fs.readdir(bucketDir);
      
      for (const file of files) {
        if (file.endsWith('.webp')) {
          const match = file.match(/^(.+)-(\d+)w\.webp$/);
          if (match) {
            const [, filename, width] = match;
            const filePath = path.join(bucketDir, file);
            const stats = await fs.stat(filePath);
            
            // Find or create image entry
            let imageEntry = images.find(img => img.filename === filename && img.bucket === bucket);
            if (!imageEntry) {
              imageEntry = {
                filename,
                bucket,
                variants: [],
                lqip: null,
                dominantColor: 'rgb(0, 0, 0)'
              };
              images.push(imageEntry);
            }
            
            imageEntry.variants.push({
              width: parseInt(width),
              path: path.relative(path.join(projectRoot, 'public'), filePath),
              size: stats.size
            });
          }
        }
      }
    } catch (error) {
      console.warn(`Could not scan bucket ${bucket}:`, error.message);
    }
  }
  
  return images;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateManifest().catch(console.error);
}

export { generateManifest };
