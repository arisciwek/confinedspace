# Arsitektur Schedule — Standar Bersama Damkar & Confined Space

**Status:** Rencana arsitektur; belum diimplementasikan.  
**Repositori:** `arisciwek/confinedspace` dan `arisciwek/damkar`  
**Tujuan:** Menetapkan kontrak schedule yang konsisten pada kedua situs dan siap diintegrasikan dengan situs induk.

## 1. Tujuan dan prinsip

Satu file Markdown merepresentasikan satu penyelenggaraan/angkatan pelatihan dan menghasilkan satu halaman detail permanen. Halaman arsip bulanan tetap menjadi halaman agregasi yang menampilkan beberapa schedule.

Schedule memiliki lifecycle:
1. Sebelum pelatihan: informasi, tanggal, lokasi, persyaratan, biaya/kuota bila relevan, dan pendaftaran.
2. Saat pelatihan: status pelaksanaan dan informasi operasional.
3. Setelah pelatihan: informasi selesai, peserta yang boleh dipublikasikan, nomor sertifikat sesuai kebijakan, dan dokumentasi foto.

Penambahan informasi pascapelatihan memperbarui `updatedDate` dan sitemap `lastmod`. Penambahan tersebut **tidak mengubah** `startDate` atau `endDate`. Tanggal pelaksanaan hanya boleh berubah jika koreksi faktual diperlukan.

Prinsip wajib:
- Satu schedule = satu Markdown = satu URL detail.
- Arsip bulanan tetap ada dan menautkan setiap schedule ke halaman detail.
- Struktur folder, field inti, enum, dan semantik data sama di kedua repo.
- Identitas training dan schedule stabil; jangan bergantung pada nama file atau path.
- `pubDate`/`updatedDate` adalah metadata editorial, sedangkan `startDate`/`endDate` adalah waktu pelaksanaan.
- Tampilan dan konten khusus situs boleh berbeda tanpa mengubah kontrak data bersama.

## 2. Struktur direktori

Gunakan collection plural yang sama di kedua repo:

```text
src/content/
├── trainings/
│   ├── <training-slug-1>.md
│   └── <training-slug-2>.md
└── schedules/
    ├── 2026/
    │   ├── <training-slug-1>/
    │   │   ├── <schedule-slug-1>.md
    │   │   └── <schedule-slug-2>.md
    │   └── <training-slug-2>/
    │       └── <schedule-slug-1>.md
    └── 2027/
        └── ...
```

Aturan:
- Folder tahun adalah tahun dari `startDate` dalam format `YYYY`.
- Folder berikutnya adalah `trainingSlug`.
- File Markdown memakai `scheduleSlug`.
- File schedule harus ditemukan secara rekursif oleh loader Astro (`**/*.md`).
- Path file bukan sumber identitas integrasi atau URL.
- Schedule yang melintasi tahun disimpan pada folder tahun tanggal mulai.
- Setiap schedule hanya disimpan satu kali.

## 3. Standar URL

Pola detail yang disepakati:

```text
/jadwal/<YYYY-MM>/<schedule-slug>/
```

Contoh:

```text
/jadwal/2026-11/november-2026-gelombang-1/
```

Halaman pendukung:

| Jenis | URL |
|---|---|
| Indeks jadwal | `/jadwal/` |
| Arsip bulanan | `/jadwal/2026-11/` |
| Detail schedule | `/jadwal/2026-11/<schedule-slug>/` |
| Indeks pelatihan | `/pelatihan/` |
| Detail pelatihan | `/pelatihan/<training-slug>/` |

Aturan URL:
- Bulan diturunkan dari `startDate` menggunakan timezone schedule.
- Arsip bulanan mengelompokkan seluruh schedule berdasarkan bulan mulai.
- Setiap kartu di arsip bulanan menaut ke detail schedule.
- Route detail dibangun dari data collection dengan `getStaticPaths()`.
- Validasi build harus menolak URL duplikat.
- Canonical detail menunjuk ke URL detail schedule itu sendiri.
- Karena kedua situs belum live, pola URL lama tidak perlu dipertahankan hanya untuk kompatibilitas indeks mesin pencari.

## 4. Identitas dan relasi lintas situs

### Training

Setiap jenis pelatihan memiliki identitas global yang stabil.

```yaml
type: training
trainingId: teknisi-k3-ruang-terbatas
slug: teknisi-k3-ruang-terbatas
name: Teknisi K3 Ruang Terbatas
```

- `trainingId` adalah kunci relasi dan sinkronisasi ke situs induk.
- Training yang sama pada Damkar dan Confined Space harus memakai `trainingId` yang sama hanya jika definisi programnya memang sama.
- Program/kelas berbeda harus memiliki ID berbeda meskipun topiknya berdekatan.
- Nama tampilan dan SEO title boleh berubah tanpa mengubah `trainingId`.

### Schedule

Setiap penyelenggaraan memiliki `scheduleId` unik dan permanen.

Field minimum:
- `scheduleId`: ID global satu penyelenggaraan; tidak berubah saat tanggal/konten/judul dikoreksi.
- `publisherId`: identitas situs penerbit, yaitu `damkar` atau `confinedspace`.
- `trainingId`: relasi ke training.
- `slug`: slug halaman detail lokal.

Gunakan ID unik yang tidak diturunkan dari tanggal atau judul. Format final (misalnya UUID/ULID dengan namespace penerbit) ditetapkan saat implementasi. Jangan memakai Astro entry ID atau lokasi file sebagai primary key.

## 5. Kontrak frontmatter Schedule

Kedua repositori menggunakan nama field dan makna yang sama. Contoh acuan:

```yaml
---
type: schedule

scheduleId: confinedspace_01JXXXXXXXXXXXXXXX
publisherId: confinedspace
trainingId: teknisi-k3-ruang-terbatas

slug: november-2026-gelombang-1
title: Jadwal Teknisi K3 Ruang Terbatas — November 2026
description: Informasi penyelenggaraan pelatihan bulan November 2026.

startDate: 2026-11-20T08:00:00+07:00
endDate: 2026-11-22T17:00:00+07:00
dateLabel: 20–22 November 2026
timezone: Asia/Jakarta

pubDate: 2026-09-01T08:00:00+07:00
updatedDate: 2026-11-25T08:00:00+07:00
draft: false

status: completed

registration:
  status: closed
  deadline: 2026-11-15T23:59:00+07:00
  capacity: 20

delivery:
  mode: offline
  attendanceMode: offline

venue:
  name: Nama tempat
  address: Alamat tempat
  city: Kota
  province: Provinsi
  countryCode: ID

completion:
  completedDate: 2026-11-22
  participants:
    - name: Nama peserta
      certificateNumber: NOMOR-SERTIFIKAT
  gallery:
    - src: /images/schedules/teknisi-k3-ruang-terbatas/november-2026-gelombang-1/foto-01.webp
      alt: Peserta mengikuti pelatihan
      caption: Dokumentasi kegiatan
---
```

Ketentuan field:
- `startDate` dan `endDate` wajib; gunakan ISO 8601. Untuk datetime wajib menyertakan offset. Jika hanya tanggal yang diketahui, gunakan `YYYY-MM-DD` secara konsisten.
- `timezone` menyatakan zona waktu IANA, misalnya `Asia/Jakarta`.
- `dateLabel` hanya untuk presentasi, bukan sumber kalkulasi.
- `pubDate` dan `updatedDate` menggunakan ISO 8601 dengan offset; `updatedDate` tidak boleh lebih awal dari `pubDate`.
- `draft` adalah boolean.
- `status` adalah lifecycle penyelenggaraan, bukan status pendaftaran.
- `registration.status` terpisah dari status schedule.
- Field yang tidak relevan untuk suatu situs boleh opsional, tetapi nama dan semantiknya tetap sama.
- Hindari menggandakan data master training ke setiap schedule jika dapat direlasikan melalui `trainingId`.

## 6. Status dan lifecycle

Gunakan enum bersama untuk `status`:

| Status | Makna | Schema.org EventStatus |
|---|---|---|
| `scheduled` | Penyelenggaraan direncanakan | `EventScheduled` |
| `ongoing` | Pelatihan sedang berlangsung | `EventScheduled` |
| `completed` | Pelatihan selesai | `EventCompleted` |
| `postponed` | Pelatihan ditunda | `EventPostponed` |
| `cancelled` | Pelatihan dibatalkan | `EventCancelled` |

Status pendaftaran menggunakan enum tersendiri: `not-open`, `open`, `closed`. Pendaftaran ditutup tidak berarti Event dibatalkan atau selesai.

Status terminal seperti `completed`, `postponed`, dan `cancelled` dinyatakan eksplisit. Validasi perlu mencegah kombinasi data yang kontradiktif.

## 7. Data pascapelatihan

Data completion ditambahkan pada Markdown schedule yang sama. Tidak dibuat entitas atau URL baru.

### Peserta dan nomor sertifikat
- Simpan pada `completion.participants[]`.
- Publikasikan nama dan nomor sertifikat hanya jika ada dasar persetujuan yang sesuai.
- Pertimbangkan masking nomor sertifikat atau mekanisme verifikasi resmi.
- Jangan menyimpan data pribadi yang tidak diperlukan seperti nomor identitas, alamat, atau nomor telepon.
- Jika data belum tersedia, hilangkan bagian tersebut; jangan render section kosong.

### Foto dan galeri
- Simpan aset di repository, bukan hotlink.
- Lokasi yang disarankan: `public/images/schedules/<training-slug>/<schedule-slug>/`.
- Setiap foto wajib mempunyai `src` dan `alt`; `caption` opsional.
- Optimalkan format dan ukuran gambar.
- Pastikan izin dokumentasi/publikasi foto peserta telah diperoleh.

## 8. Perilaku halaman

### Indeks `/jadwal/`
- Menampilkan schedule mendatang dan/atau arsip sesuai desain masing-masing situs.
- Jadwal dikelompokkan per bulan.
- Kartu schedule menampilkan ringkasan dan tautan ke detail.

### Arsip `/jadwal/YYYY-MM/`
- Menampilkan seluruh schedule pada bulan tersebut.
- Satu bulan dapat berisi dua, tiga, empat, atau lebih schedule.
- Tiap schedule memiliki tautan detail tersendiri.
- Label status pendaftaran dan status lifecycle harus dibedakan.

### Detail `/jadwal/YYYY-MM/slug/`
- Satu halaman mewakili satu penyelenggaraan.
- Pra-pelatihan: informasi, waktu, lokasi, metode, biaya/kuota bila relevan, persyaratan, dan CTA.
- Pascapelatihan: status selesai, peserta/sertifikat yang boleh dipublikasikan, dan galeri.
- Bagian yang belum memiliki data tidak dirender.
- URL dan identitas schedule tetap sama sepanjang lifecycle.

## 9. JSON-LD

Kontrak tanggal dan URL harus sama, tetapi graph schema.org boleh mengikuti konteks masing-masing program.

- `startDate` JSON-LD bersumber hanya dari frontmatter `startDate`.
- `endDate` JSON-LD bersumber hanya dari frontmatter `endDate`.
- `eventStatus` mengikuti lifecycle.
- URL Event/CourseInstance mengarah ke canonical URL detail schedule.
- `pubDate` dan `updatedDate` bukan pengganti tanggal Event.
- Menambahkan peserta, sertifikat, atau foto tidak boleh menggeser tanggal Event.
- Jangan menambahkan properti JSON-LD yang tidak sesuai vocabulary Schema.org.
- Confined Space saat ini memakai graph Course/CourseInstance/Event; evaluasi dan pertahankan tipe yang relevan.
- Damkar saat ini menggunakan Event; evaluasi apakah Course/CourseInstance relevan, tanpa memaksakan tipe yang tidak akurat.
- Hindari duplikasi Event yang sama dengan @id berbeda.

## 10. Sitemap dan lastmod

- Detail schedule: `lastmod = updatedDate`.
- Untuk data legacy selama migrasi, `pubDate` boleh menjadi fallback sementara; setelah migrasi `updatedDate` diwajibkan.
- Arsip bulanan: `lastmod` merupakan tanggal editorial terbaru dari schedule yang ditampilkan, dan metadata halaman arsip jika ada.
- Indeks jadwal: `lastmod` mengikuti perubahan editorial bermakna pada data yang disajikan dan metadata halaman indeks.
- Perubahan foto/peserta/sertifikat yang mengubah konten halaman memperbarui `updatedDate`.
- Build atau deploy tanpa perubahan konten tidak boleh mengubah `updatedDate`.
- Jangan menggunakan tanggal pelaksanaan sebagai sitemap `lastmod`.

## 11. Collection dan validasi Astro

Kedua repo harus menyediakan:
1. Collection `trainings`.
2. Collection `schedules` dengan loader Markdown rekursif.
3. Schema Zod dengan kontrak inti yang sama.
4. Validasi bahwa setiap `trainingId` menunjuk ke training yang tersedia.
5. Validasi keunikan `scheduleId` dan URL hasil generasi.
6. Validasi tahun direktori sesuai tahun `startDate`.
7. Validasi folder training sesuai relasi training.
8. Validasi `updatedDate >= pubDate`.
9. Validasi `endDate >= startDate`.
10. Validasi enum status dan delivery/registration.
11. Helper terpusat untuk URL, grouping bulanan, lifecycle, dan sitemap lastmod.
12. Route statis untuk arsip bulanan dan detail schedule.

Jangan menyebarkan aturan grouping/status/URL ke banyak komponen. Jadikan helper data sebagai sumber kebenaran untuk indeks, arsip, detail, JSON-LD, dan sitemap.

## 12. Ruang perbedaan yang diizinkan

Boleh berbeda:
- Desain, komponen UI, CSS, copywriting, CTA, dan informasi khusus program.
- Field tambahan khusus situs yang tidak mengubah semantik field inti.
- Graph JSON-LD yang berbeda jika sesuai dengan jenis pelatihan dan tetap menggunakan tanggal, URL, serta status yang konsisten.

Tidak boleh berbeda:
- Nama dan makna field inti.
- Format identitas dan relasi training/schedule.
- Struktur folder.
- Pola URL detail dan arsip bulanan.
- Semantik tanggal editorial dan tanggal pelaksanaan.
- Lifecycle dan aturan sitemap lastmod.

## 13. Pemetaan kondisi awal dan migrasi Damkar

Kondisi awal yang perlu diperhitungkan:
- Collection saat ini bernama `schedule` dan loader membaca file Markdown flat di `src/content/schedule/`.
- Schema menggunakan field seperti `class`, `batch`, `start`, `end`, `label`, `pubDate`, `updatedDate`, dan `draft`.
- Dokumen migrasi menyebut 57 file schedule.
- Data kelas saat ini dikelola pada collection `kelas`.

Rencana:
1. Audit seluruh 57 file dan seluruh consumer collection.
2. Petakan setiap kelas ke training record dan `trainingId` yang stabil; jangan hilangkan perbedaan kelas/jenjang.
3. Petakan `batch` menjadi nomor/label angkatan, bukan primary key.
4. Migrasikan `start`/`end` ke `startDate`/`endDate` dengan nilai waktu yang sama.
5. Petakan `label` ke `dateLabel` bila maknanya sesuai.
6. Tambahkan identitas, relasi, status, dan metadata sesuai kontrak.
7. Pindahkan Markdown ke `src/content/schedules/YYYY/<training-slug>/`.
8. Buat route indeks, arsip bulanan, dan detail schedule.
9. Perbarui semua pemakai collection: halaman kelas, jadwal, helper, JSON-LD, sitemap, serta tautan internal.
10. Pertahankan desain yang sudah disetujui kecuali perubahan yang dibutuhkan untuk navigasi detail.

## 14. Pemetaan kondisi awal dan migrasi Confined Space

Kondisi awal yang perlu diperhitungkan:
- Collection saat ini bernama `schedule` dan konten berada di `src/content/schedule/`.
- README mencatat sembilan angkatan tahun 2026.
- Field tanggal saat ini menggunakan `startDate` dan `endDate`.
- Implementasi schedule memakai field seperti `batchNo`, `dateLabel`, `mode`, `attendanceMode`, `venue`, `virtualUrl`, `title`, `description`, `seoTitle`, `socialImage`, `canonical`, dan `noindex`.
- Detail saat ini memakai route `/jadwal/[slug]/` dan graph Course/CourseInstance/Event.

Rencana:
1. Audit semua Markdown schedule dan pemakai collection.
2. Tetapkan training record dan `trainingId` untuk program yang benar-benar berbeda.
3. Petakan `batchNo` menjadi nomor angkatan dan pertahankan `dateLabel`.
4. Petakan `mode`/`attendanceMode` ke struktur `delivery` standar.
5. Pertahankan informasi `venue` dan `virtualUrl` dalam struktur bersama yang sesuai.
6. Pindahkan Markdown ke `src/content/schedules/YYYY/<training-slug>/`.
7. Ganti route detail dengan pola `/jadwal/YYYY-MM/<schedule-slug>/` dan bangun arsip bulanan.
8. Perbarui status, canonical, JSON-LD, sitemap, navigasi, dan seluruh internal link.
9. Pertahankan konten program global seperti FAQ/HowTo pada level yang tepat; jangan menggandakannya ke setiap schedule tanpa kebutuhan.

## 15. Tahapan implementasi dan gerbang verifikasi

### Tahap 0 — Audit dan baseline
- Inventarisasi file, field, route, helper, consumer, JSON-LD, sitemap, dan link internal.
- Catat jumlah file, identitas, dan tanggal sebelum migrasi.
- Jalankan baseline `npm run check` dan `npm run build`.
- Hasil: mapping lengkap; tidak ada file schedule yang belum terpetakan.

### Tahap 1 — Training dan schema
- Tambahkan collection `trainings` dan `schedules`.
- Terapkan schema inti bersama, enum, dan validasi relasi.
- Tambahkan training records dan ID stabil.
- Hasil: semua data lama dapat dipetakan dan type-check lulus.

### Tahap 2 — Migrasi Markdown
- Pindahkan semua file ke struktur tahun/training.
- Pertahankan isi, tanggal, dan informasi penting.
- Tambahkan identitas dan field standar.
- Hasil: jumlah file sebelum/sesudah sama; ID unik; relasi valid; tanggal tidak berubah tanpa catatan.

### Tahap 3 — Route dan halaman
- Buat indeks, arsip bulanan, dan detail schedule.
- Hubungkan setiap kartu ke URL detail.
- Implementasikan tampilan pra/pasca-pelatihan.
- Perbarui breadcrumb, canonical, dan internal links.
- Hasil: setiap schedule memiliki satu URL detail; semua route dan link valid.

### Tahap 4 — JSON-LD dan sitemap
- Perbarui URL/ID graph structured data.
- Pastikan tanggal Event berasal dari startDate/endDate.
- Terapkan eventStatus sesuai lifecycle.
- Terapkan updatedDate sebagai lastmod detail dan agregasi arsip.
- Hasil: JSON-LD dan XML sitemap valid.

### Tahap 5 — Uji lifecycle
Uji satu schedule melalui: scheduled, registration closed, ongoing, completed tanpa peserta, completed dengan peserta, completed dengan galeri, dan pembaruan galeri.
- Hasil: URL, scheduleId, startDate, dan endDate tetap; updatedDate/lastmod berubah pada perubahan konten bermakna.

### Tahap 6 — Uji kesetaraan lintas repo
- Bandingkan nama field, tipe, enum, struktur folder, URL, dan aturan validasi.
- Pastikan trainingId global sama untuk program yang memang sama.
- Hasil: kedua repo lulus checklist kontrak bersama.

### Tahap 7 — Build dan review
- Jalankan `npm run check` dan `npm run build` di kedua repo.
- Uji route, canonical, breadcrumb, internal links, JSON-LD, sitemap, gambar, dan tampilan responsif.
- Pastikan tidak ada perubahan tidak terkait pada artikel, layanan, atau desain.
- Hasil: kedua build lulus dan audit akhir bersih.

## 16. Checklist penerimaan

- [ ] Kedua repo memakai `src/content/trainings/` dan `src/content/schedules/`.
- [ ] Schedule berada pada `<tahun>/<training-slug>/<schedule-slug>.md`.
- [ ] Loader membaca Markdown rekursif.
- [ ] Satu Markdown menghasilkan satu URL detail.
- [ ] URL detail mengikuti `/jadwal/YYYY-MM/<schedule-slug>/`.
- [ ] Arsip bulanan mengagregasi semua schedule bulan itu.
- [ ] Field dan enum inti sama di kedua repo.
- [ ] `trainingId` stabil dan lintas situs.
- [ ] `scheduleId` unik, stabil, dan tidak berbasis tanggal/judul.
- [ ] Data peserta, sertifikat, dan galeri dapat ditambahkan pascapelatihan.
- [ ] Privasi dan persetujuan publikasi diperhatikan.
- [ ] `updatedDate` memperbarui sitemap `lastmod`.
- [ ] Penambahan completion tidak mengubah `startDate`/`endDate`.
- [ ] JSON-LD memakai tanggal pelaksanaan dan URL detail.
- [ ] Lifecycle EventStatus sesuai.
- [ ] Kedua repo lulus check dan build.

## 17. Batas dokumen

Dokumen ini adalah rencana dan spesifikasi target, bukan perubahan implementasi. Pembuatan collection, pemindahan Markdown, perubahan route, JSON-LD, sitemap, dan desain dilakukan pada tahap implementasi terpisah setelah audit dan persetujuan. Jangan mengubah file schedule atau halaman produksi hanya dengan mengacu pada rencana ini.

---
# Addendum — Sumber Data Terpusat dan Situs Induk

> Addendum ini memperluas spesifikasi sebelumnya. Jika ada pertentangan mengenai integrasi situs utama, aturan dalam addendum ini yang berlaku. Dokumen ini tetap merupakan rencana; bukan instruksi untuk langsung mengubah kode atau konten produksi.

## 18. Satu repository sebagai sumber data kanonis

Gunakan repository khusus, misalnya arisciwek/schedule-data, sebagai single source of truth untuk data training dan schedule. Situs spesifik (Confined Space, Damkar, dan situs lain) serta situs utama membaca file Markdown yang sama.

```text
arisciwek/schedule-data/
└── src/content/
    ├── trainings/
    │   ├── teknisi-k3-ruang-terbatas.md
    │   ├── damkar-kelas-d.md
    │   └── ...
    └── schedules/
        └── 2026/
            └── teknisi-k3-ruang-terbatas/
                └── 07-11-desember-2026.md

             ┌──────────────────────┐
             │ schedule-data        │
             │ satu sumber Markdown │
             └──────────┬───────────┘
                  ┌─────┴─────┐
                  ▼           ▼
             Confined Space  Situs utama
             filter publisher agregasi semua publisher
             URL lokal        URL portal
```

Ketentuan:

- Satu penyelenggaraan hanya memiliki satu file Markdown kanonis.
- File schedule tidak boleh disalin menjadi salinan yang diedit terpisah di setiap situs.
- Data master training juga berada di repository sumber agar relasi dan identitas konsisten.
- Repository sumber mengelola data; situs konsumen mengelola route, layout, UI, SEO halaman, dan proses build/deploy.
- Repository sumber tidak memerlukan backend, database, atau API untuk kebutuhan ini.
- Perubahan data dilakukan pada repository sumber, kemudian situs konsumen memperbarui referensi commit sumber dan menjalankan build.

## 19. Struktur repository sumber

```text
schedule-data/
└── src/content/
    ├── trainings/
    │   └── <training-slug>.md
    └── schedules/
        ├── 2026/
        │   └── <training-slug>/
        │       └── <schedule-slug>.md
        └── 2027/
            └── ...
```

Folder tahun mengikuti tahun dari startDate. Folder training mengikuti identitas/slug master training. Nama file adalah slug schedule. Path file bukan primary key dan tidak menentukan URL publik.

## 20. Kontrak frontmatter dan perbedaan presentasi per situs

Nama serta makna field inti tetap sama untuk seluruh schedule. Nilai field boleh berbeda antar-schedule karena setiap penyelenggaraan memiliki fakta sendiri. Jika satu schedule memerlukan judul, deskripsi, CTA, atau URL pendaftaran yang berbeda pada tiap situs, gunakan kelompok sites opsional.

Contoh acuan:

```yaml
---
type: schedule
scheduleId: confinedspace_01JXXXXXXXXXXXXXXX
publisherId: confinedspace
trainingId: teknisi-k3-ruang-terbatas
slug: 07-11-desember-2026

title: Jadwal Teknisi K3 Ruang Terbatas
description: Informasi penyelenggaraan pelatihan Teknisi K3 Ruang Terbatas.

startDate: 2026-12-07T08:00:00+07:00
endDate: 2026-12-11T17:00:00+07:00
dateLabel: 7–11 Desember 2026
timezone: Asia/Jakarta

pubDate: 2026-10-01T08:00:00+07:00
updatedDate: 2026-11-20T08:00:00+07:00
draft: false
status: scheduled

registration:
  status: open
  deadline: 2026-12-01T23:59:00+07:00
  capacity: 20

delivery:
  mode: offline
  attendanceMode: offline

venue:
  name: Nama tempat
  address: Alamat tempat
  city: Jakarta
  province: DKI Jakarta
  countryCode: ID

sites:
  confinedspace:
    enabled: true
    title: Jadwal Pelatihan Teknisi K3 Ruang Terbatas Desember 2026
    description: Informasi jadwal dan pendaftaran pelatihan.
    ctaLabel: Daftar Pelatihan
    registrationUrl: https://confinedspace.example/daftar/

  main:
    enabled: true
    title: Jadwal Teknisi K3 Ruang Terbatas — 7–11 Desember 2026
    description: Jadwal pelatihan dari penyelenggara Confined Space.
    ctaLabel: Lihat Detail dan Pendaftaran
---
```

Aturan override:

- title dan description pada root adalah nilai default.
- sites.<siteId> hanya menyimpan perbedaan presentasi yang diperlukan situs terkait.
- Jika override tidak tersedia, situs menggunakan nilai root.
- enabled: false mengecualikan schedule dari situs tersebut tanpa menghapus record kanonis.
- publisherId adalah identitas penerbit/penyelenggara asal, bukan situs konsumen.
- sites.main mengatur presentasi di portal; key situs lain mengikuti ID situs yang ditetapkan.
- URL pendaftaran boleh spesifik situs. Jangan menebak URL dari domain atau slug.
- Fakta inti seperti tanggal, lokasi, status, kapasitas, dan identitas tidak boleh berbeda hanya karena override presentasi.
- Schema harus memvalidasi struktur sites, tipe field, dan ID situs yang diizinkan.

## 21. Identitas dan aturan distribusi

| Field | Makna |
|---|---|
| scheduleId | Identitas global satu penyelenggaraan |
| trainingId | Identitas global jenis/program pelatihan |
| publisherId | Identitas situs penerbit/penyelenggara asal |

Situs Confined Space mengambil schedule dengan publisherId confinedspace dan sites.confinedspace.enabled true. Situs Damkar menggunakan publisherId damkar dan flag situsnya. Portal mengambil seluruh schedule yang sites.main.enabled true, tanpa membatasi satu publisher.

Jangan menyamakan publisherId dengan target distribusi. Satu schedule dapat diterbitkan oleh satu situs dan didistribusikan ke beberapa situs.

## 22. URL lokal dan URL portal

Satu record sumber boleh menghasilkan URL berbeda karena setiap situs memiliki struktur navigasi sendiri.

**Situs spesifik**

Confined Space mempertahankan URL lokal yang telah digunakan, misalnya:

```text
/jadwal/07-11-desember-2026/
```

Damkar mempertahankan pola route lokal yang disepakati pada tahap implementasinya. Khusus arsip bulanan yang sudah ada, URL dan fungsinya tidak diganti oleh arsitektur portal.

**Situs utama**

Pola detail portal:

```text
/jadwal/<YYYY-MM>/<training-slug>/<schedule-slug>/
```

Contoh:

```text
/jadwal/2026-12/teknisi-k3-ruang-terbatas/07-11-desember-2026/
```

Aturan:

- Segmen YYYY-MM diturunkan dari bulan startDate menurut timezone schedule.
- Contoh tanggal 7–11 Desember 2026 masuk ke /jadwal/2026-12/, bukan /jadwal/2026-11/. Bulan November pada contoh data adalah bulan editorial, bukan bulan pelaksanaan.
- Arsip /jadwal/YYYY-MM/ tetap merupakan halaman agregasi. Pada portal, arsip menggabungkan semua training dan publisher yang aktif untuk portal.
- Setiap kartu di arsip menaut ke detail schedule.
- Detail portal memuat konteks training dan publisher serta tautan ke situs penyelenggara bila relevan.
- Slug training berasal dari master training yang stabil, bukan dari SEO title yang dapat berubah.
- Canonical detail ditentukan oleh masing-masing situs dan menunjuk ke URL detail pada domain situs itu. URL lokal dan URL portal adalah dua presentasi atas entitas data yang sama, bukan satu URL lintas-domain.

## 23. Integrasi teknis repository sumber

Rekomendasi awal adalah Git submodule pada masing-masing situs konsumen.

```text
confinedspace/
└── data/
    └── schedule-data/  # submodule

main-site/
└── data/
    └── schedule-data/  # submodule yang sama
```

Ketentuan:

- Kedua situs menunjuk ke repository sumber yang sama.
- Submodule mengunci commit tertentu agar build dapat direproduksi.
- Update data dilakukan dengan memperbarui pointer submodule pada branch situs konsumen.
- Astro membaca Markdown secara rekursif dari direktori submodule; jangan membuat salinan konten saat build.
- Schema lokal harus memvalidasi kontrak sumber. Bila kelak schema/helper dipaketkan bersama, pastikan tidak ada dua definisi yang menyimpang.
- Tidak perlu menambahkan API, backend, atau database untuk membaca file statis.
- Evaluasi mekanisme distribusi lain hanya jika submodule terbukti menghambat workflow; hindari kembali ke duplikasi manual.

## 24. Pembagian tanggung jawab

| Area | schedule-data | Situs spesifik | Situs utama |
|---|---|---|---|
| Data schedule kanonis | Pemilik | Konsumen | Konsumen |
| Master training | Pemilik | Konsumen | Konsumen |
| Identitas dan relasi | Pemilik | Validasi | Validasi |
| Override presentasi | Menyimpan | Menggunakan | Menggunakan |
| Filter publisher | — | Publisher sendiri | Gabungan |
| Route dan URL | — | Route lokal | Route portal |
| Layout, UI, CSS | — | Pemilik | Pemilik |
| Canonical dan SEO halaman | — | Pemilik | Pemilik |
| Build dan deploy | — | Pemilik | Pemilik |

## 25. Tahap implementasi tambahan untuk portal

Tahapan berikut dilakukan sebagai pekerjaan terpisah dan tidak otomatis dimulai hanya karena dokumen ini direvisi.

**Tahap A — Bentuk repository sumber**
- Buat repository arisciwek/schedule-data.
- Siapkan master trainings dan schedules dengan struktur kanonis.
- Tetapkan schema, enum, identitas, dan fixture.
- Gerbang: satu schedule contoh terbaca dari satu file dan seluruh ID/relasi valid.

**Tahap B — Integrasi satu situs spesifik**
- Hubungkan Confined Space ke repository sumber sebagai submodule.
- Filter berdasarkan publisherId dan sites.confinedspace.enabled.
- Pertahankan URL lokal yang telah ada pada tahap ini.
- Gerbang: situs membaca sumber, bukan salinan lokal; hasil build sesuai baseline.

**Tahap C — Integrasi situs utama**
- Hubungkan portal ke repository sumber yang sama.
- Filter schedule dengan sites.main.enabled.
- Bangun indeks, arsip bulanan, dan detail sesuai pola URL portal.
- Gerbang: satu perubahan pada file sumber dapat tercermin pada kedua situs setelah pointer submodule diperbarui dan build dijalankan.

**Tahap D — Konsistensi operasional**
- Uji schedule yang tampil di dua situs dengan copy berbeda.
- Uji schedule yang hanya aktif di satu situs.
- Uji perubahan tanggal, status, venue, dan registration; fakta operasional harus konsisten pada semua konsumen.
- Dokumentasikan alur update submodule dan urutan deploy.
- Gerbang: tidak ada salinan schedule yang menjadi sumber kebenaran kedua.

## 26. Penegasan khusus untuk Damkar

Perluasan ke portal tidak membatalkan atau mengganti arsip bulanan Damkar yang sudah ada.

- /jadwal/2026-11/ tetap halaman arsip bulanan Damkar.
- Halaman tersebut tetap menampilkan kumpulan schedule November 2026.
- Setiap kartu/baris schedule ditautkan ke detail schedule yang sesuai.
- Data schedule nantinya dibaca dari file kanonis di repository sumber.
- Integrasi sumber data tidak boleh menghilangkan fungsi arsip, merusak desain/DOM yang telah disepakati, atau mengubah URL arsip tanpa persetujuan terpisah.

## 27. Checklist tambahan integrasi sumber data

- [ ] Repository schedule-data menjadi satu-satunya pemilik Markdown schedule kanonis.
- [ ] Master training juga berada di repository sumber.
- [ ] Satu penyelenggaraan hanya memiliki satu file sumber.
- [ ] Kedua situs mengonsumsi repository dan commit sumber yang sama.
- [ ] Tidak ada salinan schedule yang diedit secara independen di situs konsumen.
- [ ] Field inti sama; nilai antar-schedule boleh berbeda sesuai fakta.
- [ ] Override copy/CTA per situs berada dalam kelompok sites.
- [ ] publisherId menunjukkan penerbit, bukan target distribusi.
- [ ] Situs spesifik memfilter publisher dan flag situsnya.
- [ ] Portal mengagregasi semua publisher yang diaktifkan untuk portal.
- [ ] URL portal mengikuti /jadwal/YYYY-MM/<training-slug>/<schedule-slug>/.
- [ ] Bulan URL berasal dari startDate.
- [ ] Arsip bulanan Damkar tetap ada dan tidak diganti.
- [ ] Canonical dibuat per domain situs konsumen.
- [ ] Build dapat direproduksi dari commit sumber yang terkunci.
- [ ] Perubahan satu file sumber dapat dipropagasikan ke seluruh konsumen melalui update submodule.

## 28. Batas perubahan addendum

Addendum ini hanya menetapkan arsitektur dan rencana. Ia tidak membuat repository schedule-data, tidak memindahkan file schedule, tidak menambahkan submodule, dan tidak mengubah route, JSON-LD, sitemap, atau tampilan situs. Implementasi dilakukan sebagai tahap terpisah setelah audit dan persetujuan.
