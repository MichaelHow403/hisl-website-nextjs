#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SIZES = [1200, 2400];
const INPUT_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/imagery/processed');

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];

// Image categorization rules
const CATEGORIES = {
  earth: ['earth_daymap', 'animated_globe', 'globe_3d', 'rotating_globe'],
  ravens: ['raven_huginn', 'raven_muninn'],
  logos: ['HISL_Logo', 'IngegAI Logo'],
  general: [] // fallback category
};

/**
 * Clean filename by removing spaces and special characters
 */
function cleanFilename(filename) {
  return filename
    .replace(/\s+/g, '_')  // Replace spaces with underscores
    .replace(/[^\w.-]/g, '') // Remove special characters except dots, dashes, underscores
    .toLowerCase();
}

/**
 * Determine category for an image based on filename
 */
function categorizeImage(filename) {
  const baseName = path.basename(filename, path.extname(filename)).toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (category === 'general') continue;
    
    for (const keyword of keywords) {
      if (baseName.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  
  return 'general';
}

/**
 * Generate output filename with size suffix
 */
function generateOutputFilename(inputFilename, size) {
  const ext = path.extname(inputFilename);
  const basename = path.basename(inputFilename, ext);
  const cleanName = cleanFilename(basename);
  return `${cleanName}-${size}w.webp`;
}

/**
 * Generate LQIP (Low Quality Image Placeholder)
 */
async function generateLQIP(inputPath, outputDir, cleanBasename) {
  try {
    const lqipPath = path.join(outputDir, `${cleanBasename}-lqip.webp`);
    
    await sharp(inputPath)
      .resize(20, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 20 })
      .toFile(lqipPath);
    
    console.log(`  Generated LQIP: ${cleanBasename}-lqip.webp`);
    return `${cleanBasename}-lqip.webp`;
  } catch (error) {
    console.error(`Error generating LQIP for ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Process a single image file
 */
async function processImage(inputPath, outputBaseDir) {
  try {
    const filename = path.basename(inputPath);
    const ext = path.extname(filename).toLowerCase();
    
    if (!SUPPORTED_FORMATS.includes(ext)) {
      console.log(`Skipping unsupported format: ${filename}`);
      return null;
    }

    console.log(`Processing: ${filename}`);
    
    // Determine category and create output directory
    const category = categorizeImage(filename);
    const outputDir = path.join(outputBaseDir, category);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original size: ${metadata.width}x${metadata.height}`);
    console.log(`  Category: ${category}`);

    const basename = path.basename(filename, ext);
    const cleanBasename = cleanFilename(basename);
    const processedFiles = [];

    // Generate LQIP
    const lqipFile = await generateLQIP(inputPath, outputDir, cleanBasename);
    if (lqipFile) {
      processedFiles.push({
        size: 'lqip',
        filename: lqipFile,
        width: 20,
        height: Math.round((20 * metadata.height) / metadata.width)
      });
    }

    // Process each size
    for (const size of SIZES) {
      // Skip if original is smaller than target size
      if (metadata.width < size) {
        console.log(`  Skipping ${size}w (original is smaller)`);
        continue;
      }

      const outputFilename = generateOutputFilename(filename, size);
      const outputPath = path.join(outputDir, outputFilename);
      
      // Check if file already exists with correct naming
      try {
        await fs.access(outputPath);
        console.log(`  ${size}w already exists, skipping`);
        
        // Still add to processed files list
        const resizedHeight = Math.round((size * metadata.height) / metadata.width);
        processedFiles.push({
          size: `${size}w`,
          filename: outputFilename,
          width: size,
          height: resizedHeight
        });
        continue;
      } catch {
        // File doesn't exist, proceed with processing
      }

      // Process the image
      const resizedHeight = Math.round((size * metadata.height) / metadata.width);
      
      await sharp(inputPath)
        .resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`  Generated: ${outputFilename}`);
      
      processedFiles.push({
        size: `${size}w`,
        filename: outputFilename,
        width: size,
        height: resizedHeight
      });
    }

    return {
      original: filename,
      category,
      cleanName: cleanBasename,
      originalWidth: metadata.width,
      originalHeight: metadata.height,
      processed: processedFiles
    };
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Main processing function
 */
async function processImages() {
  try {
    console.log('Starting image processing...');
    
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Read input directory
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_FORMATS.includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log('No images found to process');
      return [];
    }

    console.log(`Found ${imageFiles.length} images to process`);

    const processedImages = [];

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const result = await processImage(inputPath, OUTPUT_DIR);
      if (result) {
        processedImages.push(result);
      }
    }

    console.log(`\nImage processing completed successfully!`);
    console.log(`Processed ${processedImages.length} images`);
    
    // Log summary by category
    const categorySummary = {};
    processedImages.forEach(img => {
      categorySummary[img.category] = (categorySummary[img.category] || 0) + 1;
    });
    
    console.log('\nSummary by category:');
    Object.entries(categorySummary).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} images`);
    });

    return processedImages;
  } catch (error) {
    console.error('Error during image processing:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processImages();
}

export { processImages };
