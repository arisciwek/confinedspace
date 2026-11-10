import { site } from './site.ts';

/** Path halaman layanan tunggal: Pelatihan Teknisi K3 Ruang Terbatas. */
export const trainingServiceHref = '/services/pelatihan-teknisi-k3-ruang-terbatas/';

/** Ikon stroke 24x24 (dipakai lewat set:html pada kartu materi). */
const strokeIcon = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

const trainingLink = `<a href="${trainingServiceHref}">Teknisi K3 Ruang Terbatas</a>`;

export const home = {
  hero: {
    eyebrow: 'Sertifikasi Resmi Kemnaker RI',
    title: 'Sertifikasi Confined Space',
    subtitle: 'Pelatihan Teknisi K3 Ruang Terbatas Kemnaker RI',
    leadHtml: `Pelatihan <strong>${trainingLink}</strong> (sertifikasi Confined Space Kemnaker RI) bertujuan meningkatkan kompetensi tenaga kerja dalam melaksanakan pekerjaan di ruang terbatas secara aman sesuai Permenaker Nomor 11 Tahun 2023. Program ini mengombinasikan teori, praktik lapangan, dan simulasi penyelamatan sehingga peserta siap bekerja sesuai standar nasional.`,
    silabusLabel: 'Lihat Silabus',
    daftarLabel: 'Daftar Sekarang',
    image: {
      src: '/images/hero-teknisi-k3-ruang-terbatas.webp',
      alt: 'Peserta pelatihan Teknisi K3 Ruang Terbatas PT Betracom Gemilang Nusa, angkatan 6–10 April 2026',
      width: 960,
      height: 1280,
    },
  },

  stats: {
    title: 'Pelatihan Resmi Kemnaker RI',
    subtitle: 'Instruktur Profesional • Sertifikat Resmi • Lisensi Kemnaker RI',
    items: [
      { count: 5000, suffix: '+', display: '5.000+', label: 'Alumni' },
      { count: 500, suffix: '+', display: '500+', label: 'Klien' },
      { count: 100, suffix: '+', display: '100+', label: 'Program' },
    ],
  },

  legal: {
    eyebrow: 'Legalitas Resmi',
    headingHtml: 'Terdaftar Resmi sebagai <span>PJK3 Kemnaker RI</span>',
    paragraphs: [
      'PT Betracom Gemilang Nusa merupakan Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) yang memiliki legalitas resmi dari Kementerian Ketenagakerjaan Republik Indonesia. Oleh karena itu, seluruh program pelatihan dan sertifikasi kami diselenggarakan sesuai regulasi yang berlaku serta didukung oleh instruktur profesional yang berpengalaman.',
    ],
    items: [
      'SKP PJK3 Kemnaker RI',
      'Instruktur Berpengalaman',
      'Sertifikat Resmi Kemnaker RI',
      'Pelatihan Sesuai Regulasi',
    ],
    image: {
      src: '/images/skp-pjk3-ruang-terbatas.webp',
      alt: 'Surat Keterangan Penunjukan (SKP) PJK3 bidang Ruang Terbatas dari Kemnaker RI atas nama PT Betracom Gemilang Nusa',
      caption: 'SKP PJK3 Ruang Terbatas — Kemnaker RI',
      width: 1000,
      height: 1647,
    },
  },

  about: {
    eyebrow: 'Tentang Pelatihan',
    heading: 'Teknisi K3 Ruang Terbatas Sertifikasi Kemnaker RI',
    paragraphs: [
      `Pelatihan <strong>${trainingLink}</strong> merupakan program sertifikasi resmi yang dirancang untuk membekali peserta dengan kompetensi dalam mengidentifikasi bahaya, melakukan pengendalian risiko, menerapkan sistem izin kerja, menggunakan alat pelindung diri, melakukan pengujian atmosfer, hingga melaksanakan prosedur penyelamatan pada ruang terbatas.`,
      'Selain itu, peserta akan mengikuti praktik penggunaan gas detector, breathing apparatus, tripod rescue, full body harness, serta simulasi evakuasi korban sesuai standar Kemnaker RI.',
    ],
    linkHref: '/articles/apa-itu-confined-space/',
    linkLabel: 'Baca panduan: Apa itu confined space?',
    image: {
      src: '/images/tentang-pelatihan-teknisi-k3.webp',
      alt: 'Kegiatan pelatihan Teknisi K3 Ruang Terbatas Betracom, angkatan 20–24 Oktober 2025',
      width: 1199,
      height: 984,
    },
  },

  program: {
    eyebrow: 'Materi Pelatihan',
    heading: 'Materi yang Akan Dipelajari',
    description: 'Seluruh materi mengacu pada regulasi Kemnaker RI serta kebutuhan industri sehingga peserta mampu bekerja secara aman di ruang terbatas.',
    items: [
      {
        title: 'Peraturan Perundangan',
        textHtml: 'Undang-Undang K3, Permenaker, standar confined space, dan kewajiban tenaga kerja.',
        icon: strokeIcon('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>'),
      },
      {
        title: 'Identifikasi Bahaya',
        textHtml: 'Mengenali potensi bahaya fisik, kimia, biologis, dan mekanik pada ruang terbatas.',
        icon: strokeIcon('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
      },
      {
        title: 'Pengukuran Atmosfer',
        textHtml: 'Penggunaan gas detector untuk mendeteksi oksigen, LEL, H₂S, CO, dan gas berbahaya lainnya.',
        icon: strokeIcon('<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>'),
      },
      {
        title: 'Sistem Izin Kerja',
        textHtml: 'Penerapan <em>Permit to Work</em> sebelum memasuki confined space.',
        icon: strokeIcon('<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>'),
      },
      {
        title: 'Penggunaan APD',
        textHtml: 'Pemilihan dan penggunaan APD sesuai jenis pekerjaan serta tingkat risiko.',
        icon: strokeIcon('<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>'),
      },
      {
        title: 'Ventilasi Ruang Terbatas',
        textHtml: 'Teknik ventilasi alami maupun mekanis agar area kerja tetap aman.',
        icon: strokeIcon('<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/>'),
      },
      {
        title: 'SCBA & Escape Set',
        textHtml: 'Penggunaan <em>Self Contained Breathing Apparatus</em> dan alat bantu pernapasan.',
        icon: strokeIcon('<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>'),
      },
      {
        title: 'Rescue System',
        textHtml: 'Tripod, rescue winch, full body harness, dan teknik evakuasi korban.',
        icon: strokeIcon('<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>'),
      },
      {
        title: 'Simulasi Lapangan',
        textHtml: 'Praktik masuk ruang terbatas, komunikasi, monitoring, hingga penyelamatan korban.',
        icon: strokeIcon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
      },
    ],
  },

  requirement: {
    eyebrow: 'Persyaratan',
    heading: 'Syarat Mengikuti Pelatihan',
    items: [
      'Minimal pendidikan SMA / SMK sederajat.',
      'Fotokopi KTP.',
      'Pas foto berwarna ukuran 3x4.',
      'Surat keterangan sehat dari dokter.',
      'Mengisi formulir pendaftaran.',
      'Memiliki pengalaman kerja menjadi nilai tambah.',
    ],
  },

  benefit: {
    eyebrow: 'Benefit',
    heading: 'Fasilitas Peserta',
    items: [
      { title: 'Sertifikat Resmi', text: 'Sertifikat dan Lisensi Teknisi K3 Ruang Terbatas Kemnaker RI.' },
      { title: 'Instruktur Profesional', text: 'Dibimbing oleh praktisi dan instruktur berpengalaman.' },
      { title: 'Modul Pelatihan', text: 'Materi lengkap dalam bentuk softcopy maupun hardcopy.' },
      { title: 'Peralatan Praktik', text: 'Gas detector, SCBA, tripod rescue, harness, lifeline, dan APD lengkap.' },
      { title: 'Coffee Break & Lunch', text: 'Konsumsi selama kegiatan pelatihan berlangsung.' },
      { title: 'Konsultasi Gratis', text: 'Pendampingan setelah pelatihan serta konsultasi implementasi K3.' },
    ],
  },

  schedule: {
    eyebrow: 'Jadwal',
    heading: 'Jadwal Pelatihan 2026',
    tableCaption: 'Jadwal pelatihan Teknisi K3 Ruang Terbatas tahun 2026 beserta status pendaftaran',
    note: 'Jadwal dapat berubah. Untuk <em>In House Training</em> atau jadwal khusus, hubungi tim kami via WhatsApp.',
  },

  gallery: {
    eyebrow: 'Galeri Pelatihan',
    heading: 'Dokumentasi Kegiatan',
    items: [
      { src: '/images/galeri-pelatihan-1.webp', alt: 'Dokumentasi pelatihan Teknisi K3 Ruang Terbatas Betracom, angkatan 6–10 April 2026 (foto 1)', width: 800, height: 600 },
      { src: '/images/galeri-pelatihan-2.webp', alt: 'Dokumentasi pelatihan Teknisi K3 Ruang Terbatas Betracom, angkatan 9–13 Februari 2026 (foto 1)', width: 800, height: 600 },
      { src: '/images/galeri-pelatihan-3.webp', alt: 'Dokumentasi pelatihan Teknisi K3 Ruang Terbatas Betracom, angkatan 9–13 Februari 2026 (foto 2)', width: 800, height: 1067 },
      { src: '/images/galeri-pelatihan-4.webp', alt: 'Dokumentasi pelatihan Teknisi K3 Ruang Terbatas Betracom, angkatan 6–10 April 2026 (foto 2)', width: 800, height: 1067 },
      { src: '/images/galeri-pelatihan-5.webp', alt: 'Dokumentasi pelatihan Teknisi K3 Ruang Terbatas Betracom, angkatan 6–10 April 2026 (foto 3)', width: 800, height: 1067 },
      { src: '/images/galeri-pelatihan-6.webp', alt: 'Dokumentasi pelatihan Teknisi K3 Ruang Terbatas Betracom, angkatan 6–10 April 2026 (foto 4)', width: 800, height: 450 },
    ],
  },

  pricing: {
    eyebrow: 'Biaya Pelatihan',
    heading: 'Investasi Pelatihan Teknisi K3 Ruang Terbatas',
    description: 'Biaya pelatihan sudah termasuk teori, praktik, evaluasi, sertifikat resmi Kemnaker RI, serta fasilitas pelatihan lengkap.',
    fromLabel: 'Mulai dari',
    currency: 'Rp',
    amount: '6.000.000',
    value: 6000000,
    currencyCode: 'IDR',
    unit: 'per peserta',
    includes: [
      'Sertifikat & Lisensi Kemnaker RI',
      'Surat Keterangan Lulus',
      'Modul Pelatihan',
      'Instruktur Berpengalaman',
      'Konsumsi Selama Pelatihan',
      'Souvenir Tas',
      'Coffee Break',
      'Praktik Menggunakan Peralatan Lengkap',
    ],
    formulirLabel: 'Unduh Formulir Pendaftaran',
  },

  faq: {
    eyebrow: 'FAQ',
    heading: 'Pertanyaan yang Sering Diajukan',
    items: [
      {
        question: 'Apa itu Pelatihan Teknisi K3 Ruang Terbatas?',
        answer: 'Program sertifikasi resmi Kemnaker RI untuk membekali tenaga kerja agar mampu bekerja secara aman di ruang terbatas sesuai regulasi.',
      },
      {
        question: 'Berapa lama durasi pelatihan?',
        answer: 'Pelatihan berlangsung selama 5 hari yang terdiri dari teori, praktik lapangan, dan evaluasi kompetensi.',
      },
      {
        question: 'Apakah peserta mendapatkan sertifikat?',
        answer: 'Ya. Peserta yang dinyatakan lulus akan memperoleh Sertifikat serta Lisensi resmi Kemnaker RI sesuai ketentuan yang berlaku.',
      },
      {
        question: 'Berapa biaya pelatihan Teknisi K3 Ruang Terbatas?',
        answer: 'Biaya pelatihan mulai dari Rp6.000.000 per peserta, sudah termasuk sertifikat dan lisensi Kemnaker RI, modul, konsumsi, coffee break, souvenir tas, serta praktik dengan peralatan lengkap.',
      },
      {
        question: 'Apa saja syarat mengikuti pelatihan?',
        answer: 'Minimal pendidikan SMA/SMK sederajat, fotokopi KTP, pas foto berwarna 3x4, surat keterangan sehat dari dokter, dan mengisi formulir pendaftaran. Pengalaman kerja menjadi nilai tambah.',
      },
      {
        question: 'Apa dasar hukum K3 ruang terbatas?',
        answer: 'K3 ruang terbatas diatur dalam Peraturan Menteri Ketenagakerjaan Nomor 11 Tahun 2023 tentang Keselamatan dan Kesehatan Kerja di Ruang Terbatas.',
      },
      {
        question: 'Apakah tersedia In House Training?',
        answer: 'Ya. PT Betracom Gemilang Nusa melayani In House Training di seluruh Indonesia sesuai kebutuhan perusahaan.',
      },
    ],
  },

  cta: {
    eyebrow: 'Daftar Sekarang',
    heading: 'Siap Mengikuti Pelatihan Teknisi K3 Ruang Terbatas?',
    text: `Hubungi tim ${site.name} untuk mendapatkan jadwal terbaru, penawaran harga, serta informasi lengkap mengenai sertifikasi Teknisi K3 Ruang Terbatas Kemnaker RI.`,
    primaryLabel: 'Konsultasi via WhatsApp',
    secondaryLabel: 'Unduh Formulir Pendaftaran',
  },
};
