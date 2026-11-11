#!/usr/bin/env node
/**
 * Import a featured image for an article.
 *
 * Converts a source photo (usually from the gitignored `images/` folder) into a
 * WebP file named after the article slug, saved under `public/images/articles/`.
 *
 * Usage:
 *   node scripts/import-featured-image.mjs --src images/IMG_6540.JPG --slug apa-itu-confined-space
 *
 * Options:
 *   --src      Path to the source image (required)
 *   --slug     Article slug, used as the output filename (required)
 *   --width    Max width in pixels (default: 1600)
 *   --quality  WebP quality 1-100 (default: 82)
 *   --out-dir  Output directory (default: ./public/images/articles)
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const DEFAULTS = {
  width: 1600,
  quality: 82,
  outDir: './public/images/articles',
};

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      console.error(`Missing value for --${key}`);
      process.exit(1);
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const src = args.src;
  const slug = args.slug ? slugify(args.slug) : '';

  if (!src) {
    console.error('Error: --src is required. Example: --src images/IMG_6540.JPG');
    process.exit(1);
  }
  if (!slug) {
    console.error('Error: --slug is required. Example: --slug apa-itu-confined-space');
    process.exit(1);
  }
  if (!existsSync(src)) {
    console.error(`Error: source image not found: ${src}`);
    process.exit(1);
  }

  const width = Number(args.width ?? DEFAULTS.width);
  const quality = Number(args.quality ?? DEFAULTS.quality);
  const outDir = resolve(args['out-dir'] ?? DEFAULTS.outDir);
  const outputPath = join(outDir, `${slug}.webp`);

  if (!Number.isFinite(width) || width <= 0) {
    console.error('Error: --width must be a positive number');
    process.exit(1);
  }
  if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
    console.error('Error: --quality must be between 1 and 100');
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });

  const metadata = await sharp(src).metadata();
  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outputPath);

  const originalSize = statSync(src).size;
  const outputSize = statSync(outputPath).size;
  const relativePath = outputPath.replace(`${process.cwd()}/`, '');
  const publicPath = `/${relativePath.replace(/^public\//, '')}`;

  console.log(`Source : ${src} (${(originalSize / 1024 / 1024).toFixed(1)} MB, ${metadata.width}x${metadata.height})`);
  console.log(`Output : ${relativePath} (${(outputSize / 1024).toFixed(1)} KB)`);
  console.log('');
  console.log('Tambahkan ke frontmatter artikel:');
  console.log(`  featuredImage: ${publicPath}`);
  console.log('  featuredImageAlt: "<judul artikel, harus sama persis>"');
  console.log('');
  console.log('Aturan: featuredImageAlt wajib sama persis dengan title artikel (SEO gambar).');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
