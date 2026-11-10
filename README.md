# PT Betracom Gemilang Nusa — Sertifikasi Confined Space

Situs resmi pelatihan & sertifikasi **Teknisi K3 Ruang Terbatas (Confined Space)** Kemnaker RI.

## Stack

- **Framework**: Astro 7.x (Static Site Generation)
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`)
- **Content**: Markdown + Frontmatter (Astro Content Collections)
- **Deploy**: Vercel (SSG)

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview build output
npm run preview
```

## Vercel Deployment

### Build Configuration (auto-detected)

| Setting | Value |
|---------|-------|
| **Framework Preset** | Astro |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

> `astro.config.mjs` sudah include `output: 'static'` (default), jadi Vercel otomatis mendeteksi `dist/`.

### Environment Variables (Vercel Project Settings)

| Variable | Description | Required |
|----------|-------------|----------|
| `SITE_URL` | Production URL (e.g. `https://betracomtraining.com`) | Yes |
| `VERCEL_PROJECT_PRODUCTION_URL` | Auto-set by Vercel, fallback untuk `SITE_URL` | No |

> `astro.config.mjs` memakai `SITE_URL` atau `VERCEL_PROJECT_PRODUCTION_URL` untuk `site` config (canonical URL, sitemap, JSON-LD).

### Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add domain → DNS records → Verify
3. HTTPS auto-provisioned (Let's Encrypt)

## Project Structure

```
src/
├── components/
│   ├── blocks/          # Block components (Card, FAQ, Steps, Table, dll)
│   └── shared/          # SiteHeader, SiteFooter, BlockRenderer
├── config/
│   ├── home.ts          # Homepage data (hero, stats, legal, program, schedule, FAQ, pricing, CTA)
│   ├── site.ts          # Business identity, address, contact, social
│   └── ui.ts            # All UI labels, buttons, nav, footer tagline
├── content/
│   ├── articles/        # Blog/panduan (Markdown + frontmatter)
│   ├── pages/           # Static pages (home, kontak, 404, articles index, services index)
│   ├── schedule/        # Jadwal angkatan 2026 (CourseInstance JSON-LD)
│   └── services/        # Layanan aktif (3 program K3 Ruang Terbatas)
├── layouts/
│   ├── BaseLayout.astro # Root layout (SEO, JSON-LD, fonts, sprite icons)
│   └── ArticleLayout.astro
├── pages/
│   ├── index.astro      # Homepage (hero, stats, legal, program, schedule table, FAQ, pricing, CTA)
│   ├── jadwal/
│   │   ├── index.astro  # Listing jadwal 2026
│   │   └── [slug].astro # Detail angkatan + CourseInstance JSON-LD
│   ├── services/
│   │   ├── index.astro  # Daftar layanan
│   │   └── [slug].astro # Detail layanan + FAQPage JSON-LD
│   └── articles/[slug].astro
├── scripts/
│   └── schedule-status.ts   # Client-side status badge (Dibuka/Ditutup)
├── styles/
│   └── global.css       # Design system (CSS variables, utilities, components)
├── utils/
│   ├── content-validation.ts # Validator (unique ID/ULID/slug, date logic, relations)
│   ├── howto.ts         # HowTo JSON-LD builder
│   └── related.ts       # Related content helpers
└── content.config.ts    # Collections schema (Zod)
```

## Key Features

- **Content-as-Data**: Semua konten di `src/content/` (Markdown + frontmatter), validasi via `content-validation.ts`
- **JSON-LD Connected Graph**: Organization, WebSite, WebPage, Course, CourseInstance, FAQPage, BreadcrumbList, ProfessionalService
- **Schedule as Content**: 9 angkatan 2026 → halaman detail `/jadwal/[slug]/` dengan `CourseInstance` schema + `url` per item
- **Dynamic Footer**: Tagline per halaman layanan (`PT Betracom Gemilang Nusa Menyediakan Pelatihan dan Sertifikasi <Layanan>`)
- **Lighthouse Optimized**: Hero preload, font preload+media=print, script defer, inline critical JS
- **Accessibility**: Semantic HTML, skip link, focus management, ARIA, color contrast, reduced motion

## Validation Gates

```bash
# Full validation (run via npm run build)
npm run build
# Includes:
# - TypeScript check (astro sync && tsc --noEmit)
# - Content validation (unique ID/ULID/slug, date logic, relations)
# - Static generation (19 pages)
# - Output verification (headings, images, alt text)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (localhost:4321) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview `dist/` locally |
| `npm run astro` | Astro CLI (sync, check, etc) |

## Content Authoring

### Tambah Layanan Baru
1. Buat file `src/content/services/nama-layanan.md` (copy pola existing)
2. Frontmatter wajib: `id`, `ulid`, `title`, `description`, `slug`, `pubDate`, `updatedDate`, `blocks[]`
3. `blocks` minimal: `stats-grid`, `section` (ruang lingkup), `steps` (alur), `faq`

### Tambah Jadwal Angkatan
1. Buat file `src/content/schedule/dd-bulan-tahun.md`
2. Field wajib: `batchNo`, `dateLabel`, `startDate`, `endDate`, `mode`, `attendanceMode`
3. Otomatis muncul di `/jadwal/` + halaman detail + `CourseInstance` di home

### Tambah Artikel
1. Buat file `src/content/articles/slug.md`
2. Frontmatter: `relatedType: 'service'`, `relatedId: <service-id>` untuk CTA & footer layanan

## License

PT Betracom Gemilang Nusa — All rights reserved.