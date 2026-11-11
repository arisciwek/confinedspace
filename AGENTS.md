# AGENTS.md

## Aturan konten & SEO gambar artikel

- Artikel yang memiliki `featuredImage` **wajib** mengisi `featuredImageAlt`.
- Nilai `featuredImageAlt` **harus sama persis dengan `title` artikel** — tanpa prefix, suffix, atau deskripsi tambahan. Ini aturan SEO gambar: alt yang identik dengan judul memperkuat relevansi judul–gambar di mesin pencari.
- `featuredImage` dipakai sebagai foto utama halaman artikel, `og:image`, `twitter:image`, dan `image` pada JSON-LD `BlogPosting`.
- Hasil konversi WebP disimpan di `public/images/articles/<slug>.webp` dan ikut di-commit. Foto mentah tetap di `images/` (gitignored).
- Konversi gambar:
  `node scripts/import-featured-image.mjs --src images/IMG_xxxx.JPG --slug <slug>`
- Aturan ini divalidasi di dua tempat:
  - `src/content.config.ts` — `superRefine` pada schema artikel (gagal saat `astro sync`).
  - `src/utils/content-validation.ts` — validasi saat build (gagal saat `npm run build`).

## Aturan relasi layanan artikel

- Satu artikel **hanya boleh terkait ke 1 layanan** (`relatedServices` maksimal 1 item).
- Meskipun isi artikel menyinggung beberapa layanan, tetap pilih satu layanan yang paling relevan.
- Jangan menggabungkan `relatedServices` dengan `relatedType: service` + `relatedId` yang berbeda; total layanan unik tetap harus 1.
- Alasan: relasi ini membentuk klaim di footer, misalnya:
  `PT Betracom Gemilang Nusa Menyediakan Pelatihan dan Sertifikasi <judul layanan>`
  Klaim harus menyebut satu layanan saja, bukan daftar.
- Divalidasi di:
  - `src/content.config.ts` — `max(1)` + `superRefine` (gagal saat `astro sync`).
  - `src/utils/content-validation.ts` — validasi saat build (gagal saat `npm run build`).
