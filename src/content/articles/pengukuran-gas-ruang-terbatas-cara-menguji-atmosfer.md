---
id: 10
ulid: 01K9ZD0000000000000000000A
type: article
schemaType: TechArticle
slug: pengukuran-gas-ruang-terbatas-cara-menguji-atmosfer
title: "Pengukuran Gas Ruang Terbatas: Cara Menguji Oksigen, Gas Mudah Terbakar, dan Gas Beracun"
description: "Panduan pengukuran gas ruang terbatas meliputi pemeriksaan oksigen, gas mudah terbakar, gas beracun, urutan sampling, pengujian berlapis, interpretasi hasil, dan pemantauan atmosfer selama pekerjaan."
draft: false
pubDate: '2026-11-12T14:10:00Z'
updatedDate: '2026-11-12T14:10:00Z'
author:
  name: Tim Confined Space Indonesia
  type: Organization
  url: https://betracomtraining.com/
category: Pelatihan dan Sertifikasi K3 Ruang Terbatas
tags: [pengukuran gas ruang terbatas, pengujian atmosfer, tes gas sebelum masuk, oksigen ruang terbatas, gas mudah terbakar, gas beracun, atmospheric testing]
relatedServices: [111]
relatedArticles: [5, 2]
blocks:
  - component: section
    id: tujuan-pengukuran-gas-ruang-terbatas
    heading: Mengapa Pengukuran Gas Ruang Terbatas Harus Dilakukan?
    content:
      - type: p
        text: Pengukuran gas ruang terbatas dilakukan untuk mengetahui kondisi atmosfer sebelum pekerja masuk dan selama pekerjaan berlangsung. Ruang seperti tangki, bejana, silo, sumur, pit, saluran, atau ruang proses dapat memiliki oksigen yang tidak memadai, gas mudah terbakar, maupun kontaminan beracun. Kondisi tersebut sering tidak dapat dikenali hanya dengan melihat atau mencium udara.
      - type: p
        text: Atmosfer di dalam ruang dapat berubah akibat sisa bahan, proses produksi, pembersihan, pengelasan, penggunaan bahan kimia, kebocoran, aktivitas mikrobiologis, atau perubahan ventilasi. Karena itu, satu kali pengukuran tidak selalu mewakili kondisi sepanjang pekerjaan. Pengujian harus menjadi bagian dari sistem izin masuk, identifikasi bahaya, pengendalian risiko, dan pemantauan.
      - type: p
        text: "Pengukuran juga harus menjawab pertanyaan yang tepat: parameter apa yang perlu diuji, di titik mana sampel diambil, berapa lama alat merespons, apakah kondisi atmosfer berlapis, dan kapan pengujian perlu diulang. Jawabannya ditentukan oleh karakteristik ruang dan potensi bahaya, bukan hanya kebiasaan menggunakan satu jenis monitor."
  - component: note
    id: peringatan-atmosfer-tidak-dinilai-dari-bau
    variant: warning
    title: Jangan menilai atmosfer dari bau atau gejala pekerja
    text: Beberapa gas berbahaya tidak berwarna dan tidak berbau, sementara kemampuan penciuman dapat menurun atau tidak dapat diandalkan pada paparan tertentu. Pengujian harus menggunakan alat atau metode yang sesuai. Jangan memasuki ruang untuk mengambil sampel tanpa pengendalian dan prosedur yang telah ditetapkan.
  - component: section
    id: parameter-utama-pengujian-atmosfer
    heading: Parameter Utama dalam Pengujian Atmosfer
    content:
      - type: p
        text: Pemeriksaan atmosfer umumnya mempertimbangkan kadar oksigen, gas atau uap mudah terbakar, dan gas beracun. Parameter tambahan perlu ditentukan dari riwayat ruang dan bahan yang mungkin ada. Pemantauan tidak boleh dibatasi pada kanal yang tersedia di alat apabila identifikasi bahaya menunjukkan adanya kontaminan lain.
  - component: feature-card-grid
    id: tiga-parameter-pengukuran-atmosfer
    title: Tiga Kelompok Pengujian yang Umum Dilakukan
    columns: 3
    items:
      - title: Kadar oksigen (O₂)
        description: Memeriksa apakah konsentrasi oksigen berada pada rentang yang dipersyaratkan untuk pekerjaan.
        points:
          - Kekurangan oksigen dapat menyebabkan gangguan fungsi tubuh hingga kehilangan kesadaran.
          - Kelebihan oksigen meningkatkan intensitas dan risiko kebakaran.
          - Hasil umumnya dinyatakan dalam persen volume.
      - title: Gas mudah terbakar
        description: Memeriksa potensi atmosfer menyala atau meledak akibat gas dan uap yang mudah terbakar.
        points:
          - Hasil alat umumnya ditampilkan dalam %LEL.
          - Respons bergantung jenis gas dan teknologi sensor.
          - Sumber penyalaan dan pekerjaan panas harus dikendalikan.
      - title: Gas beracun
        description: Memeriksa zat yang dapat menimbulkan efek kesehatan akut atau kronis.
        points:
          - Contoh yang umum diperiksa adalah H₂S dan CO.
          - Hasil dapat dinyatakan dalam ppm.
          - Gas target ditentukan dari bahan dan proses di ruang tersebut.
  - component: section
    id: pengukuran-oksigen
    heading: Cara Memahami Pengukuran Oksigen
    content:
      - type: p
        text: Sensor oksigen mengukur persentase volume oksigen dalam sampel udara. Pembacaan perlu dibandingkan dengan kriteria yang digunakan dalam regulasi, standar teknis, dan prosedur perusahaan. Nilai yang terlalu rendah dapat menunjukkan displacement oleh gas lain, proses konsumsi oksigen, korosi, atau aktivitas biologis. Nilai yang terlalu tinggi dapat meningkatkan risiko kebakaran karena mempercepat pembakaran bahan.
      - type: p
        text: Jangan menganggap angka oksigen normal sebagai bukti bahwa atmosfer bebas dari gas beracun atau mudah terbakar. Setiap parameter memiliki sensor dan batas evaluasi sendiri. Pengukuran oksigen juga perlu dilakukan dengan memperhatikan waktu respons, kondisi alat, dan kemungkinan perubahan atmosfer selama pekerjaan.
  - component: section
    id: pengukuran-gas-mudah-terbakar
    heading: Pengukuran Gas dan Uap Mudah Terbakar
    content:
      - type: p
        text: Gas atau uap mudah terbakar sering diukur sebagai persentase Lower Explosive Limit (%LEL). LEL merupakan konsentrasi terendah suatu gas atau uap di udara yang dapat menyala ketika terdapat sumber penyalaan dan kondisi yang mendukung. Pembacaan %LEL bukan persentase volume gas, melainkan perbandingan terhadap batas bawah kemudahan terbakar dari gas acuan atau gas target sesuai konfigurasi alat.
      - type: p
        text: Teknisi harus mengetahui gas kalibrasi yang digunakan, jenis sensor, faktor koreksi, dan keterbatasan respons terhadap gas lain. Sensor katalitik memerlukan oksigen yang memadai untuk proses pengukuran dan dapat terpengaruh oleh zat yang meracuni sensor. Sensor inframerah memiliki daftar gas target tertentu dan tidak dapat digunakan untuk mendeteksi semua jenis gas mudah terbakar.
      - type: p
        text: Hasil pengukuran perlu ditindaklanjuti dengan pengendalian sumber penyalaan, isolasi, ventilasi, dan pembatasan pekerjaan sesuai prosedur. Nilai yang berada di bawah batas tertentu tidak otomatis membuat pekerjaan aman apabila masih ada potensi pelepasan gas atau perubahan atmosfer.
  - component: section
    id: pengukuran-gas-beracun
    heading: Pengukuran Gas Beracun seperti H₂S dan CO
    content:
      - type: p
        text: Gas beracun dapat berasal dari bahan yang tersimpan, proses produksi, pembusukan bahan organik, pembakaran, atau reaksi kimia. Hidrogen sulfida (H₂S) dan karbon monoksida (CO) merupakan contoh gas yang sering menjadi perhatian, tetapi bukan satu-satunya kontaminan yang mungkin ada. Pemilihan sensor harus mengikuti informasi proses, lembar data keselamatan, dan penilaian risiko.
      - type: p
        text: Hasil sensor elektrokimia umumnya ditampilkan dalam satuan ppm. Nilai tersebut harus dibandingkan dengan batas paparan atau kriteria yang relevan untuk tujuan pengukuran. Perlu diperhatikan bahwa batas paparan kerja, batas alarm alat, dan kriteria izin masuk dapat memiliki tujuan serta dasar penetapan yang berbeda. Jangan menyamakan ketiganya tanpa memeriksa acuan yang digunakan.
      - type: p
        text: Jika bahan atau proses dapat menghasilkan VOC, amonia, klorin, sulfur dioksida, atau zat lain, monitor empat gas standar mungkin tidak memadai. Diperlukan sensor khusus, PID, tabung detektor, atau metode pengujian lain yang sesuai dengan sifat kontaminan dan tujuan pemeriksaan.
  - component: section
    id: persiapan-sebelum-pengukuran
    heading: Persiapan Sebelum Melakukan Pengukuran
    content:
      - type: p
        text: Sebelum pengujian, personel perlu memahami ruang yang akan diperiksa, pekerjaan yang direncanakan, bahan yang pernah berada di dalamnya, potensi sumber kontaminan, dan kondisi proses yang terhubung. Informasi tersebut membantu menentukan parameter, titik sampling, aksesori, serta tindakan yang harus dilakukan jika hasil berada di luar kriteria.
  - component: checklist-card
    id: checklist-persiapan-atmosfer
    title: Checklist Persiapan Pengujian Atmosfer
    description: Pastikan aspek berikut diperiksa sebelum pengambilan sampel dilakukan.
    items:
      - label: Tinjau identifikasi bahaya dan riwayat ruang
        detail: Periksa bahan tersimpan, residu, proses, pekerjaan sebelumnya, dan potensi reaksi.
        required: true
      - label: Tentukan gas atau kontaminan target
        detail: Tetapkan parameter berdasarkan penilaian risiko, bukan hanya kanal alat yang tersedia.
        required: true
      - label: Periksa status alat ukur
        detail: Pastikan identitas alat, masa kalibrasi, pemeriksaan fungsi, baterai, sensor, dan alarm.
        required: true
      - label: Periksa pompa dan aksesori sampling
        detail: Pastikan selang, probe, filter, dan sambungan sesuai serta tidak bocor atau tersumbat.
        required: false
      - label: Tentukan titik dan kedalaman sampling
        detail: Pertimbangkan bentuk ruang, kemungkinan stratifikasi, dan lokasi pekerja akan berada.
        required: true
      - label: Pastikan komunikasi dan tindakan darurat
        detail: Tetapkan cara menyampaikan hasil tidak aman dan menghentikan proses masuk.
        required: true
  - component: section
    id: urutan-pengujian-atmosfer
    heading: Urutan Pengujian Atmosfer Ruang Terbatas
    content:
      - type: p
        text: Panduan teknis pengujian atmosfer umumnya menggunakan urutan pemeriksaan oksigen, gas atau uap mudah terbakar, kemudian gas beracun. Urutan tersebut membantu memastikan kondisi yang dapat memengaruhi pembacaan sensor lain diperiksa terlebih dahulu. Personel tetap harus mengikuti instruksi produsen, prosedur perusahaan, serta standar dan regulasi yang berlaku.
      - type: p
        text: Sebelum pengujian, alat perlu dinyalakan dan distabilkan sesuai petunjuknya. Jika menggunakan pompa dan selang, perhitungkan waktu yang dibutuhkan sampel untuk mencapai sensor serta waktu respons sensor. Jangan membaca hasil terlalu cepat sebelum sampel mewakili atmosfer pada titik yang diuji. Panjang selang, diameter, aliran pompa, filter, dan sifat gas dapat memengaruhi waktu transportasi.
  - component: steps
    id: langkah-pengujian-atmosfer
    heading: Langkah Umum Pengujian Sebelum Masuk
    items:
      - title: Tinjau izin masuk dan rencana pengujian
        text: Pastikan ruang, pekerjaan, parameter, titik sampling, kriteria penerimaan, serta personel yang bertanggung jawab telah ditentukan.
      - title: Periksa kesiapan alat
        text: Lakukan pemeriksaan visual dan fungsi, termasuk status sensor, baterai, alarm, pompa, selang, serta kelayakan kalibrasi.
      - title: Ambil sampel dari luar ruang
        text: Gunakan probe atau selang dari posisi aman. Hindari memasukkan kepala atau tubuh ke dalam ruang untuk mengambil sampel.
      - title: Uji oksigen
        text: Periksa kadar oksigen dan tunggu hingga pembacaan stabil sesuai waktu respons alat.
      - title: Uji gas mudah terbakar
        text: Periksa %LEL dengan memperhatikan jenis gas target, gas kalibrasi, dan keterbatasan sensor.
      - title: Uji gas beracun dan kontaminan lain
        text: Periksa gas target yang telah ditentukan dari identifikasi bahaya, termasuk kebutuhan sensor khusus.
      - title: Ulangi pada titik dan kedalaman berbeda
        text: Lakukan sampling berlapis jika bentuk ruang atau karakteristik gas memungkinkan perbedaan komposisi atmosfer.
      - title: Catat dan evaluasi hasil
        text: Dokumentasikan nilai, lokasi, waktu, identitas alat, nama penguji, dan keputusan sesuai kriteria yang berlaku.
  - component: section
    id: sampling-berlapis-dan-stratifikasi
    heading: Pengambilan Sampel pada Beberapa Ketinggian
    content:
      - type: p
        text: Atmosfer di dalam ruang terbatas tidak selalu homogen. Perbedaan densitas gas, suhu, aliran udara, bentuk ruang, penghalang, dan ventilasi dapat menyebabkan konsentrasi berbeda pada lokasi tertentu. Karena itu, pengujian pada satu titik saja dapat melewatkan kondisi berbahaya di bagian lain.
      - type: p
        text: Sampling dapat dilakukan pada bagian atas, tengah, dan bawah ruang atau pada titik yang mewakili lokasi kerja serta jalur pergerakan pekerja. Jarak antar titik dan kedalaman pengambilan sampel ditentukan oleh geometri ruang, akses, metode kerja, dan prosedur yang digunakan. Personel harus memperhitungkan waktu transportasi sampel pada setiap perubahan kedalaman.
      - type: p
        text: Jangan menggunakan asumsi sederhana bahwa semua gas berat selalu berada di bawah atau semua gas ringan selalu berada di atas. Suhu, turbulensi, ventilasi, dan proses dapat mengubah distribusi gas. Pengujian berlapis diperlukan untuk memperoleh gambaran atmosfer yang lebih representatif.
  - component: section
    id: interpretasi-hasil-pengukuran
    heading: Cara Membaca dan Menginterpretasikan Hasil
    content:
      - type: p
        text: Hasil pengukuran harus dibandingkan dengan kriteria yang ditetapkan dalam regulasi, standar, penilaian risiko, dan prosedur izin masuk. Perhatikan satuan, rentang ukur, resolusi, akurasi, batas alarm, serta faktor koreksi. Nilai yang terlihat kecil tidak boleh dianggap aman sebelum dipastikan bahwa sensor memang sesuai untuk zat yang sedang diuji.
      - type: p
        text: Jika hasil tidak memenuhi kriteria atau pembacaan tidak stabil, proses masuk tidak boleh dilanjutkan sampai penyebabnya dievaluasi dan tindakan pengendalian dilakukan. Tindakan dapat mencakup ventilasi, isolasi sumber, pembersihan, perubahan metode kerja, penggunaan perlindungan tambahan, atau pengujian ulang. Keputusan harus mengikuti otoritas dan prosedur yang berlaku.
      - type: p
        text: Personel juga perlu memahami perbedaan antara nilai sesaat, nilai rata-rata paparan, batas alarm perangkat, dan batas yang digunakan untuk izin masuk. Masing-masing memiliki konteks penggunaan yang berbeda. Jangan mengubah setelan alarm atau mengabaikan peringatan tanpa dasar teknis dan persetujuan yang sesuai.
  - component: comparison-table
    id: tabel-respons-hasil-pengujian
    title: Tindak Lanjut Berdasarkan Hasil Pengukuran
    headers: [Kondisi hasil, Respons yang perlu dilakukan]
    rows:
      - ["Hasil memenuhi seluruh kriteria dan stabil", "Dokumentasikan hasil dan lanjutkan proses sesuai izin masuk serta pengendalian lain yang dipersyaratkan."]
      - ["Satu atau lebih parameter di luar kriteria", "Jangan izinkan masuk atau hentikan pekerjaan; lakukan evaluasi dan pengendalian sesuai prosedur."]
      - ["Pembacaan tidak stabil atau alat memberi fault", "Periksa alat, sensor, pompa, selang, dan kondisi sampling; gunakan alat layak setelah masalah ditangani."]
      - ["Diduga ada kontaminan yang tidak terdeteksi sensor", "Hentikan asumsi bahwa atmosfer aman; tentukan sensor atau metode pengujian tambahan."]
      - ["Atmosfer berubah selama pekerjaan", "Hentikan atau evaluasi pekerjaan, keluarkan pekerja bila diperlukan, lakukan pengujian ulang dan revisi pengendalian."]
    note: Tabel ini merupakan panduan respons umum, bukan pengganti prosedur tanggap darurat atau kriteria izin masuk perusahaan.
  - component: section
    id: pemantauan-atmosfer-selama-pekerjaan
    heading: Pemantauan Atmosfer Selama Pekerjaan Berlangsung
    content:
      - type: p
        text: Atmosfer dapat berubah ketika pekerjaan berjalan. Pengelasan, pemotongan, pembersihan kimia, penggunaan pelarut, pengadukan residu, kebocoran, atau kegagalan ventilasi dapat menghasilkan kondisi yang berbeda dari hasil pemeriksaan awal. Karena itu, kebutuhan pemantauan berkelanjutan atau pengujian berkala harus ditentukan melalui penilaian risiko.
      - type: p
        text: Jika digunakan monitor personal, posisi pemasangan harus mengikuti karakteristik bahaya, instruksi produsen, dan prosedur kerja. Untuk pemantauan jarak jauh atau sampling berkala, petugas perlu memastikan titik ukur tetap mewakili atmosfer yang dihirup pekerja. Perubahan kondisi harus segera dikomunikasikan kepada pekerja di dalam, petugas jaga, pengawas, dan tim tanggap darurat sesuai mekanisme yang ditetapkan.
      - type: p
        text: Apabila alarm berbunyi, pembacaan melewati batas, atau alat mengalami gangguan, pekerja harus mengikuti prosedur penghentian dan evakuasi. Jangan menonaktifkan alarm atau melanjutkan pekerjaan hanya karena pembacaan kembali normal sesaat tanpa memahami penyebab perubahan.
  - component: section
    id: pencatatan-dan-dokumentasi-pengukuran
    heading: Pencatatan dan Dokumentasi Hasil Pengukuran
    content:
      - type: p
        text: Dokumentasi menjadi bukti bahwa pengujian dilakukan pada waktu dan lokasi tertentu dengan alat serta personel yang dapat ditelusuri. Catatan yang lengkap membantu pengawas mengevaluasi perubahan atmosfer, membandingkan hasil antarwaktu, dan memutuskan apakah kondisi masih sesuai dengan izin masuk.
  - component: checklist-card
    id: data-wajib-form-pengukuran
    title: Informasi yang Perlu Dicatat
    items:
      - label: Identitas ruang dan lokasi pengujian
        detail: Cantumkan nama ruang, area, titik sampling, dan kedalaman bila relevan.
        required: true
      - label: Tanggal dan waktu pengukuran
        detail: Catat waktu setiap pembacaan, bukan hanya waktu pengujian pertama.
        required: true
      - label: Identitas alat dan status kalibrasi
        detail: Nomor seri, jenis sensor, tanggal pemeriksaan, dan status kelayakan.
        required: true
      - label: Parameter, satuan, dan hasil
        detail: Catat setiap kanal serta sensor atau metode tambahan yang digunakan.
        required: true
      - label: Nama dan kompetensi personel penguji
        detail: Identitas teknisi yang melakukan pengukuran dan pihak yang meninjau hasil.
        required: true
      - label: Kondisi pekerjaan dan tindakan korektif
        detail: Catat ventilasi, proses, perubahan kondisi, alarm, penghentian, dan pengujian ulang.
        required: false
  - component: section
    id: kompetensi-personel-pengukuran-gas
    heading: Kompetensi Personel yang Melakukan Pengukuran
    content:
      - type: p
        text: Pengukuran atmosfer memerlukan pemahaman mengenai bahaya gas, karakteristik sensor, prinsip kerja alat, metode sampling, waktu respons, faktor koreksi, interpretasi hasil, dan tindakan ketika pembacaan tidak memenuhi kriteria. Personel juga perlu memahami prosedur izin masuk, komunikasi, serta batas kewenangan dalam memberikan rekomendasi.
      - type: p
        text: Permenaker Nomor 11 Tahun 2023 mengatur Teknisi Deteksi Gas Ruang Terbatas sebagai salah satu personel K3. Pasal 27 memuat tugas dan kewenangan yang berkaitan dengan pengukuran Gas Atmosfer Berbahaya serta pemberian rekomendasi berdasarkan hasil pengukuran. Ketentuan kompetensi dan lisensi personel perlu dibaca bersama Pasal 19 sampai dengan Pasal 22 dan status regulasi terkini.
  - component: source-links
    id: referensi-pengukuran-atmosfer
    title: Referensi Regulasi dan Teknis
    intro: Regulasi Indonesia menjadi acuan utama. Referensi OSHA berikut merupakan panduan teknis tambahan dan tidak menggantikan ketentuan Indonesia.
    items:
      - label: Permenaker Nomor 11 Tahun 2023 — JDIH Kemnaker
        url: https://jdih.kemnaker.go.id/peraturan/detail/2412/peraturan-menteri-nomor-11-tahun-2023
        description: Ketentuan K3 ruang terbatas, termasuk pengujian atmosfer dan personel Teknisi Deteksi Gas.
      - label: OSHA — Procedures for Atmospheric Testing in Confined Spaces
        url: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146AppB
        description: Panduan teknis mengenai urutan pengujian, waktu respons, dan pengujian atmosfer berlapis.
      - label: OSHA — Permit-Required Confined Spaces
        url: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146
        description: Referensi tambahan mengenai pengendalian bahaya dan program ruang terbatas.
  - component: faq
    id: faq-pengukuran-gas-ruang-terbatas
    heading: Pertanyaan Umum tentang Pengukuran Gas Ruang Terbatas
    items:
      - question: Kapan pengukuran gas harus dilakukan?
        answer: Pengujian atmosfer dilakukan sebelum pekerja masuk dan selama pekerjaan sesuai ketentuan, penilaian risiko, serta prosedur yang berlaku. Frekuensi atau pemantauan berkelanjutan ditentukan dari kemungkinan perubahan atmosfer.
      - question: Gas apa saja yang perlu diuji?
        answer: Umumnya pemeriksaan mencakup oksigen, gas atau uap mudah terbakar, dan gas beracun yang mungkin ada. Parameter tambahan ditentukan berdasarkan riwayat ruang, bahan, proses, dan identifikasi bahaya.
      - question: Mengapa pengujian dilakukan pada beberapa ketinggian?
        answer: Komposisi atmosfer dapat berbeda pada bagian atas, tengah, dan bawah karena bentuk ruang, densitas gas, suhu, aliran udara, dan ventilasi. Sampling berlapis membantu memperoleh gambaran yang lebih representatif.
      - question: Mengapa oksigen diuji terlebih dahulu?
        answer: Urutan pengujian teknis yang umum dimulai dari oksigen, kemudian gas mudah terbakar, lalu gas beracun. Ikuti petunjuk alat dan prosedur yang digunakan karena kondisi serta teknologi sensor dapat memengaruhi metode.
      - question: Apakah monitor empat gas selalu cukup?
        answer: Tidak. Monitor empat gas biasanya mengukur O₂, %LEL, H₂S, dan CO. Kontaminan lain memerlukan sensor atau metode pengujian tambahan sesuai identifikasi bahaya.
      - question: Apa yang dilakukan jika hasil pengukuran tidak aman?
        answer: Jangan izinkan pekerja masuk atau hentikan pekerjaan sesuai prosedur. Evaluasi penyebab, lakukan pengendalian, dan ulangi pengujian sebelum keputusan berikutnya diambil.
      - question: Apakah pengujian awal cukup untuk seluruh durasi pekerjaan?
        answer: Tidak selalu. Atmosfer dapat berubah akibat proses, aktivitas kerja, ventilasi, atau kebocoran. Kebutuhan pemantauan berkelanjutan atau berkala harus ditetapkan melalui penilaian risiko.
      - question: Siapa yang bertanggung jawab melakukan pengukuran?
        answer: Pengukuran harus dilakukan oleh personel kompeten dan ditunjuk sesuai ketentuan serta prosedur perusahaan. Untuk fungsi personel K3 ruang terbatas, perhatikan ketentuan Teknisi Deteksi Gas dalam Permenaker 11 Tahun 2023.
  - component: cta
    id: cta-pelatihan-teknisi-deteksi-gas-pengukuran
    heading: Siapkan Personel yang Kompeten Melakukan Pengujian Atmosfer
    message: Pengukuran yang andal membutuhkan personel yang memahami karakteristik gas, sensor, metode sampling, interpretasi hasil, dan tindakan saat kondisi tidak memenuhi kriteria. Pelajari program Pelatihan Teknisi Deteksi Gas Ruang Terbatas untuk memetakan kebutuhan kompetensi personel perusahaan.
    button: Lihat Pelatihan Teknisi Deteksi Gas
    serviceHref: /services/teknisi-deteksi-gas-ruang-terbatas/
    serviceLabel: Pelatihan Teknisi Deteksi Gas Ruang Terbatas

---