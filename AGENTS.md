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

## Aturan penggunaan gambar

- Setiap foto sumber di `images/` **hanya boleh dipakai 1 kali**.
- `scripts/import-featured-image.mjs` otomatis menghapus foto sumber dari `images/` setelah konversi WebP berhasil. Jangan menyalin/mengembalikan foto yang sudah dipakai.
- `featuredImage` yang sama **tidak boleh dipakai di lebih dari 1 artikel**. Validator build menolak duplikat.
- Jika butuh gambar untuk artikel lain, pilih foto lain dari folder `images/` yang belum dipakai.

## Aturan galeri artikel

- Galeri adalah block `gallery` di dalam `blocks` artikel, berisi **2, 3, atau 4 foto** sesuai kebutuhan (`min(2).max(4)`).
- Setiap foto galeri tetap mengikuti aturan sekali pakai: sumber di `images/` dihapus setelah konversi.
- Konversi galeri:
  `node scripts/import-gallery-images.mjs --src images/A.JPG --src images/B.JPG --src images/C.JPG --slug <slug>`
  Tambahkan `--service-slug <slug-layanan>` bila foto pertama menjadi representasi layanan.
  Script menghasilkan `<slug>-N.webp` (slide penuh) dan `<slug>-N-thumb.webp` (thumbnail grid), lalu menghapus setiap source.
- Penamaan default: **slug + nomor urut** (`<slug>-1.webp`, `<slug>-2.webp`, dst.).
- **Satu foto** per galeri (foto pertama) memakai slug layanan: `<slug-layanan>-1.webp`. Foto ini menjadi representasi layanan, dan `alt`-nya diawali `<judul layanan> adalah ...`.
- Foto sisanya memakai slug artikel/layanan induk dengan nomor urut (`<slug>-1.webp`, `<slug>-2.webp`, dst.).
- Thumbnail grid memakai file `-thumb` (maks 480 px) agar halaman ringan; slide layar penuh memakai file utama (maks 1600 px).
- `alt` foto galeri adalah **deskripsi spesifik isi foto**, bukan judul artikel. Contoh:
  `Peserta praktik pemasangan tripod dan harness sebelum masuk ruang terbatas`.
  Pengecualian: foto representasi layanan memakai pola `<judul layanan> adalah <deskripsi singkat>`.
- `src` gambar galeri harus unik: tidak boleh duplikat di dalam satu galeri, dan tidak boleh sama dengan `featuredImage` atau foto galeri artikel lain.
- Thumbnail ditampilkan kecil (grid 2/3/4 kolom, rasio 4:3) agar menyatu dengan halaman artikel; klik foto membuka slide layar penuh.
- Lightbox memakai `<dialog>` native + CSS scroll-snap (tanpa plugin): tombol prev/next, tombol panah keyboard, swipe di mobile, dan `Esc` untuk menutup.
- Divalidasi di:
  - `src/content.config.ts` — schema block `gallery` (2–4 item).
  - `src/utils/content-validation.ts` — jumlah item, duplikat `src`, pemakaian gambar sekali pakai, pola nama file (`<slug>-N`), dan alt foto layanan (`<judul layanan> adalah ...`).
