#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Image processing configuration
const WIDTHS = [1200, 2400];
const QUALITY = 85;
const BUCKETS = ['earth', 'starfields', 'nebulae', 'galaxies', 'processed'];

// Ensure all bucket directories exist
async function ensureBuckets() {
  const imageryDir = path.join(projectRoot, 'public', 'imagery');
  await fs.mkdir(imageryDir, { recursive: true });
  
  for (const bucket of BUCKETS) {
    await fs.mkdir(path.join(imageryDir, bucket), { recursive: true });
  }
}

// Generate LQIP (Low Quality Image Placeholder) blur data
async function generateLQIP(inputPath) {
  try {
    const { data, info } = await sharp(inputPath)
      .resize(20, 20, { fit: 'inside' })
      .blur(1)
      .webp({ quality: 20 })
      .toBuffer({ resolveWithObject: true });
    
    return `data:image/webp;base64,${data.toString('base64')}`;
  } catch (error) {
    console.warn(`Failed to generate LQIP for ${inputPath}:`, error.message);
    return null;
  }
}

// Extract dominant color from image
async function getDominantColor(inputPath) {
  try {
    const { data, info } = await sharp(inputPath)
      .resize(1, 1)
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    const [r, g, b] = Array.from(data);
    return `rgb(${r}, ${g}, ${b})`;
  } catch (error) {
    console.warn(`Failed to get dominant color for ${inputPath}:`, error.message);
    return 'rgb(0, 0, 0)';
  }
}

// Process a single image file
async function processImage(inputPath, outputDir, bucket) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const results = [];
  
  console.log(`Processing ${inputPath}...`);
  
  try {
    // Generate LQIP and dominant color
    const [lqip, dominantColor] = await Promise.all([
      generateLQIP(inputPath),
      getDominantColor(inputPath)
    ]);
    
    // Process each width
    for (const width of WIDTHS) {
      const outputPath = path.join(outputDir, `${filename}-${width}w.webp`);
      
      await sharp(inputPath)
        .resize(width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(outputPath);
      
      results.push({
        width,
        path: path.relative(path.join(projectRoot, 'public'), outputPath),
        size: (await fs.stat(outputPath)).size
      });
    }
    
    return {
      original: path.relative(projectRoot, inputPath),
      bucket,
      filename,
      variants: results,
      lqip,
      dominantColor,
      processed: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to process ${inputPath}:`, error.message);
    return null;
  }
}

// Find all image files in a directory
async function findImageFiles(dir) {
  const files = [];
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...await findImageFiles(fullPath));
      } else if (extensions.some(ext => entry.name.toLowerCase().endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
    console.warn(`Could not read directory ${dir}:`, error.message);
  }
  
  return files;
}

// Determine bucket from file path
function determineBucket(filePath) {
  const pathLower = filePath.toLowerCase();
  
  if (pathLower.includes('earth') || pathLower.includes('globe')) return 'earth';
  if (pathLower.includes('star') || pathLower.includes('constellation')) return 'starfields';
  if (pathLower.includes('nebula') || pathLower.includes('cloud')) return 'nebulae';
  if (pathLower.includes('galaxy') || pathLower.includes('spiral')) return 'galaxies';
  
  return 'processed'; // default bucket
}

// Main processing function
async function main() {
  console.log('🖼️  Starting image processing pipeline...');
  
  await ensureBuckets();
  
  const imageryDir = path.join(projectRoot, 'public', 'imagery');
  const legacyImagesDir = path.join(projectRoot, 'public', 'images');
  const stagingDir = path.join(projectRoot, 'imagery');
  
  // Find all images from various sources
  const allImages = [
    ...await findImageFiles(legacyImagesDir),
    ...await findImageFiles(stagingDir),
    ...await findImageFiles(imageryDir)
  ];
  
  console.log(`Found ${allImages.length} images to process`);
  
  const processedImages = [];
  
  for (const imagePath of allImages) {
    const bucket = determineBucket(imagePath);
    const outputDir = path.join(imageryDir, bucket);
    
    const result = await processImage(imagePath, outputDir, bucket);
    if (result) {
      processedImages.push(result);
    }
  }
  
  // Save processing results
  const resultsPath = path.join(projectRoot, 'scripts', 'processed-images.json');
  await fs.writeFile(resultsPath, JSON.stringify(processedImages, null, 2));
  
  console.log(`✅ Processed ${processedImages.length} images`);
  console.log(`📁 Results saved to ${resultsPath}`);
  
  // Summary by bucket
  const bucketCounts = processedImages.reduce((acc, img) => {
    acc[img.bucket] = (acc[img.bucket] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📊 Summary by bucket:');
  Object.entries(bucketCounts).forEach(([bucket, count]) => {
    console.log(`  ${bucket}: ${count} images`);
  });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { processImage, findImageFiles, generateLQIP, getDominantColor };
