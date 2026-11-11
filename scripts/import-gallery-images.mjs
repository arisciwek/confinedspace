#!/usr/bin/env node
/**
 * Import gallery images for an article or service.
 *
 * Converts 2–4 source photos (usually from the gitignored `images/` folder) into
 * WebP files named `<slug>-galeri-N.webp`, saved under `public/images/articles/`.
 *
 * Usage:
 *   node scripts/import-gallery-images.mjs \
 *     --src images/IMG_6540.JPG \
 *     --src images/IMG_6541.JPG \
 *     --src images/IMG_6542.JPG \
 *     --slug apa-itu-confined-space
 *
 * Options:
 *   --src      Path to a source image (repeat 2–4 times, required)
 *   --slug     Article or service slug, used as the output filename prefix (required)
 *   --width    Max width in pixels for the full-size slide (default: 1600)
 *   --thumb-width  Max width in pixels for the small grid thumbnail (default: 480)
 *   --quality  WebP quality 1-100 for the full-size slide (default: 82)
 *   --thumb-quality  WebP quality 1-100 for the thumbnail (default: 74)
 *   --out-dir  Output directory (default: ./public/images/articles)
 *
 * Every source photo is deleted from `images/` after a successful conversion,
 * because each raw photo may only be used once.
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, statSync, unlinkSync } from 'fs';
import { join, resolve, sep } from 'path';

const DEFAULTS = {
  width: 1600,
  thumbWidth: 480,
  quality: 82,
  thumbQuality: 74,
  outDir: './public/images/articles',
  min: 2,
  max: 4,
};

function parseArgs(argv) {
  const args = { src: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) {
      console.error(`Missing value for --${key}`);
      process.exit(1);
    }
    if (key === 'src') {
      args.src.push(value);
    } else {
      args[key] = value;
    }
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
  const sources = args.src;
  const slug = args.slug ? slugify(args.slug) : '';

  if (sources.length < DEFAULTS.min || sources.length > DEFAULTS.max) {
    console.error(`Error: pass ${DEFAULTS.min}–${DEFAULTS.max} --src values (got ${sources.length}).`);
    console.error('Example: --src images/A.JPG --src images/B.JPG --src images/C.JPG --slug <slug>');
    process.exit(1);
  }
  if (!slug) {
    console.error('Error: --slug is required. Example: --slug apa-itu-confined-space');
    process.exit(1);
  }

  const uniqueSources = new Set(sources.map((src) => resolve(src)));
  if (uniqueSources.size !== sources.length) {
    console.error('Error: the same source photo is listed more than once. Each photo may only be used once.');
    process.exit(1);
  }

  for (const src of sources) {
    if (!existsSync(src)) {
      console.error(`Error: source image not found: ${src}`);
      process.exit(1);
    }
  }

  const width = Number(args.width ?? DEFAULTS.width);
  const thumbWidth = Number(args['thumb-width'] ?? DEFAULTS.thumbWidth);
  const quality = Number(args.quality ?? DEFAULTS.quality);
  const thumbQuality = Number(args['thumb-quality'] ?? DEFAULTS.thumbQuality);
  const outDir = resolve(args['out-dir'] ?? DEFAULTS.outDir);

  if (!Number.isFinite(width) || width <= 0) {
    console.error('Error: --width must be a positive number');
    process.exit(1);
  }
  if (!Number.isFinite(thumbWidth) || thumbWidth <= 0) {
    console.error('Error: --thumb-width must be a positive number');
    process.exit(1);
  }
  if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
    console.error('Error: --quality must be between 1 and 100');
    process.exit(1);
  }
  if (!Number.isFinite(thumbQuality) || thumbQuality < 1 || thumbQuality > 100) {
    console.error('Error: --thumb-quality must be between 1 and 100');
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });

  const imagesDir = resolve('./images');
  const results = [];

  for (const [index, src] of sources.entries()) {
    const baseName = `${slug}-galeri-${index + 1}`;
    const outputPath = join(outDir, `${baseName}.webp`);
    const thumbPath = join(outDir, `${baseName}-thumb.webp`);
    const metadata = await sharp(src).metadata();
    await sharp(src)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outputPath);
    await sharp(src)
      .rotate()
      .resize({ width: thumbWidth, withoutEnlargement: true })
      .webp({ quality: thumbQuality, effort: 6 })
      .toFile(thumbPath);

    const originalSize = statSync(src).size;
    const outputSize = statSync(outputPath).size;
    const thumbSize = statSync(thumbPath).size;
    const relativePath = outputPath.replace(`${process.cwd()}/`, '');
    const publicPath = `/${relativePath.replace(/^public\//, '')}`;
    const thumbRelativePath = thumbPath.replace(`${process.cwd()}/`, '');
    const thumbPublicPath = `/${thumbRelativePath.replace(/^public\//, '')}`;

    console.log(`Source : ${src} (${(originalSize / 1024 / 1024).toFixed(1)} MB, ${metadata.width}x${metadata.height})`);
    console.log(`Output : ${relativePath} (${(outputSize / 1024).toFixed(1)} KB)`);
    console.log(`Thumb  : ${thumbRelativePath} (${(thumbSize / 1024).toFixed(1)} KB)`);

    // Setiap foto sumber hanya boleh dipakai sekali: hapus dari folder images/ setelah konversi berhasil.
    const sourcePath = resolve(src);
    if (sourcePath.startsWith(`${imagesDir}${sep}`)) {
      unlinkSync(sourcePath);
      console.log('Source : dihapus dari folder images/ (sekali pakai).');
    } else {
      console.log('Source : di luar folder images/, tidak dihapus.');
    }
    console.log('');

    results.push({ publicPath, thumbPublicPath });
  }

  console.log('Tambahkan ke artikel sebagai block gallery:');
  console.log('');
  console.log('- component: gallery');
  console.log('  id: galeri-dokumentasi');
  console.log('  heading: Dokumentasi Kegiatan');
  console.log('  items:');
  for (const result of results) {
    console.log(`    - src: ${result.publicPath}`);
    console.log(`      thumb: ${result.thumbPublicPath}`);
    console.log('      alt: "<deskripsi spesifik isi foto>"');
  }
  console.log('');
  console.log('Aturan: alt foto galeri wajib deskriptif (bukan judul artikel), dan setiap gambar hanya dipakai 1 kali.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
