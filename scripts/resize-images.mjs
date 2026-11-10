#!/usr/bin/env node
/**
 * Batch resize & optimize images with sharp
 * Usage: node scripts/resize-images.mjs
 */

import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const IMAGES_DIR = './public/images';
const QUALITY = 82;
const MAX_WIDTH = 1920;

// Target sizes for responsive images
const RESPONSIVE_SIZES = [320, 640, 960, 1280, 1920];

async function optimizeImage(inputPath, outputPath, options = {}) {
  const {
    width = null,
    height = null,
    quality = QUALITY,
    format = 'webp',
    prefix = '',
  } = options;

  try {
    let pipeline = sharp(inputPath);

    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality, effort: 6 });
    } else if (format === 'avif') {
      pipeline = pipeline.avif({ quality, effort: 6 });
    } else if (format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    } else if (format === 'png') {
      pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
    }

    await pipeline.toFile(outputPath);

    const stats = statSync(outputPath);
    console.log(`  ✓ ${prefix}${basename(outputPath)} (${(stats.size / 1024).toFixed(1)} KB)`);
    return stats.size;
  } catch (err) {
    console.error(`  ✗ ${inputPath}: ${err.message}`);
    return 0;
  }
}

async function processImage(file) {
  const inputPath = join(IMAGES_DIR, file);
  const ext = extname(file).toLowerCase();
  const name = basename(file, ext);

  // Skip already optimized files
  if (name.includes('@') || name.endsWith('-optimized')) return;

  const stats = statSync(inputPath);
  const originalSize = stats.size;

  console.log(`\nProcessing: ${file} (${(originalSize / 1024).toFixed(1)} KB)`);

  let totalSaved = 0;

  // 1. Main optimized version (max 1920px width)
  const mainOutput = join(IMAGES_DIR, `${name}-optimized.webp`);
  const mainSize = await optimizeImage(inputPath, mainOutput, {
    width: MAX_WIDTH,
    prefix: 'Main: ',
  });
  totalSaved += originalSize - mainSize;

  // 2. Generate responsive sizes (optional - for Picture component)
  // Uncomment below if you want to generate srcset images
  /*
  for (const w of RESPONSIVE_SIZES) {
    const respOutput = join(IMAGES_DIR, `${name}@${w}w.webp`);
    await optimizeImage(inputPath, respOutput, {
      width: w,
      prefix: `  ${w}w: `,
    });
  }
  */

  // 3. Convert PNG to WebP if applicable
  if (ext === '.png') {
    const webpOutput = join(IMAGES_DIR, `${name}.webp`);
    const webpSize = await optimizeImage(inputPath, webpOutput, {
      prefix: 'PNG→WebP: ',
    });
    totalSaved += originalSize - webpSize;
  }

  const savings = ((totalSaved / originalSize) * 100).toFixed(1);
  console.log(`  → Saved: ${(totalSaved / 1024).toFixed(1)} KB (${savings}%)`);
}

async function main() {
  console.log('🖼️  Image Optimization with sharp');
  console.log(`   Directory: ${IMAGES_DIR}`);
  console.log(`   Quality: ${QUALITY}%`);
  console.log(`   Max Width: ${MAX_WIDTH}px`);

  if (!existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = readdirSync(IMAGES_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .filter(f => !f.includes('@') && !f.endsWith('-optimized.webp'));

  console.log(`\nFound ${files.length} images to process\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const inputPath = join(IMAGES_DIR, file);
    const stats = statSync(inputPath);
    totalOriginal += stats.size;
    await processImage(file);
    const optimizedStats = statSync(join(IMAGES_DIR, `${basename(file, extname(file))}-optimized.webp`));
    totalOptimized += optimizedStats.size;
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Original total: ${(totalOriginal / 1024).toFixed(1)} KB`);
  console.log(`   Optimized total: ${(totalOptimized / 1024).toFixed(1)} KB`);
  console.log(`   Saved: ${((totalOriginal - totalOptimized) / 1024).toFixed(1)} KB (${(((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1)}%)`);
}

main().catch(console.error);