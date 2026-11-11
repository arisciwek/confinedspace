import { site } from './site.ts';

/** HowTo untuk halaman detail jadwal (spesifik batch). */
export const jadwalHowTo = [
  {
    name: 'Cara Mendaftar Pelatihan Teknisi K3 Ruang Terbatas',
    description: 'Langkah-langkah pendaftaran angkatan Teknisi K3 Ruang Terbatas di PT Betracom Gemilang Nusa.',
    steps: [
      {
        name: 'Unduh & Isi Formulir',
        text: 'Unduh formulir pendaftaran di tombol "Unduh Formulir Pendaftaran" pada halaman ini, lalu isi dengan data lengkap dan benar.',
        image: `${site.url}/images/formulir-pendaftaran.webp`,
      },
      {
        name: 'Kirim Formulir & Dokumen',
        text: 'Kirim formulir yang sudah diisi beserta fotokopi KTP, pas foto 3×4, dan surat keterangan sehat via WhatsApp ke nomor resmi kami.',
        image: `${site.url}/images/kirim-wa.webp`,
      },
      {
        name: 'Pembayaran DP / Lunas',
        text: 'Lakukan pembayaran DP minimal 50% atau lunas sesuai kesepakatan untuk mengunci kursi. Bukti transfer dikirim via WhatsApp.',
        image: `${site.url}/images/bayar.webp`,
      },
      {
        name: 'Konfirmasi & Surat Undangan',
        text: 'Tim kami akan mengonfirmasi pembayaran dan mengirim surat undangan resmi beserta jadwal detail ke WhatsApp/email Anda.',
        image: `${site.url}/images/undangan.webp`,
      },
    ],
  },
  {
    name: 'Cara Persiapan Mengikuti Pelatihan',
    description: 'Persiapan fisik dan dokumen sebelum hari pelatihan dimulai.',
    steps: [
      {
        name: 'Dokumen Wajib Dibawa',
        text: 'KTP asli, surat keterangan sehat dari dokter (masih berlaku), kartu peserta (dikirim via WA), dan formulir pendaftaran asli.',
      },
      {
        name: 'Pakaian & APD Pribadi',
        text: 'Pakaian kerja lengkap (lengan panjang, celana panjang), sepatu safety/boots, helm proyek (jika punya), sarung tangan kerja. APD khusus (SCBA, harness, gas detector) disediakan oleh panitia.',
      },
      {
        name: 'Kesehatan & Fisik',
        text: 'Pastikan kondisi fisik prima, tidak sakit, dan mampu melakukan aktivitas fisik berat (naik turun tangga, simulasi evakuasi). Istirahat cukup semalam sebelum pelatihan.',
      },
      {
        name: 'Kedatangan Tepat Waktu',
        text: 'Datang minimal 30 menit sebelum pukul 08.00 untuk re-registrasi dan pembagian APD. Terlambat berisiko tidak diizinkan mengikuti praktik keselamatan.',
      },
    ],
  },
];

/** FAQ spesifik halaman jadwal (bukan duplikat homepage). */
export const jadwalFaq = [
  {
    question: 'Apa saja fasilitas yang didapat peserta selama pelatihan?',
    answer: 'Sertifikat & Lisensi Kemnaker RI, Surat Keterangan Lulus, Modul Pelatihan (softcopy & hardcopy), Instruktur Berpengalaman, Konsumsi (Coffee Break & Lunch), Souvenir Tas, Praktik Menggunakan Peralatan Lengkap (Gas Detector, SCBA, Tripod Rescue, Harness, Lifeline, APD).',
  },
  {
    question: 'Apakah biaya sudah termasuk akomodasi dan transport?',
    answer: 'Tidak. Biaya pelatihan tidak mencakup penginapan, transportasi ke lokasi, maupun uang saku. Peserta mengatur sendiri akomodasi dan transport. Kami bisa merekomendasikan hotel terdekat venue jika diperlukan.',
  },
  {
    question: 'Bisa ganti jadwal (pindah batch) kalau tiba-tiba berhalangan?',
    answer: 'Bisa, dengan syarat mengajukan permohonan minimal 7 hari kerja sebelum batch dimulai dan tersedia kursi kosong pada batch tujuan. Perubahan hanya diperbolehkan maksimal 1× per pendaftaran.',
  },
  {
    question: 'Berapa lama sertifikat dan lisensi keluar setelah lulus?',
    answer: 'Proses verifikasi dan penerbitan sertifikat serta lisensi resmi Kemnaker RI membutuhkan waktu sekitar 3–4 bulan setelah evaluasi kompetensi selesai. Surat Keterangan Lulus (SKL) diterbitkan lebih cepat (1–2 minggu) sebagai bukti sementara.',
  },
  {
    question: 'Apakah wajib cek kesehatan / medical check-up sebelum pelatihan?',
    answer: 'Ya. Surat keterangan sehat dari dokter (praktik umum / RS) wajib disertakan saat pendaftaran dan dibawa asli saat pelatihan. Pemeriksaan meliputi: tekanan darah, fungsi paru (spirometri direkomendasikan), EKG (jika >45 th), dan bebas narkoba. Peserta dengan kondisi medis tertentu (claustrofobia, asma berat, penyakit jantung) disarankan berkonsultasi dulu.',
  },
  {
    question: 'Apakah tersedia program In House Training di lokasi perusahaan kami?',
    answer: 'Ya. PT Betracom Gemilang Nusa melayani In House Training di seluruh Indonesia. Materi, jadwal, dan kuota disesuaikan kebutuhan perusahaan. Hubungi tim kami via WhatsApp untuk penawaran custom.',
  },
];