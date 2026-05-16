export type JenjangKey = "sd" | "smp" | "sma";
export type FaseCode = "A" | "B" | "C" | "D" | "E" | "F";

export type CapaianMap = Record<string, string>;

export type SubjectCurriculum = {
  name: string;
  capaian: CapaianMap;
  capaianKeys: string[];
};

export type FaseCurriculum = {
  code: FaseCode;
  label: string;
  jenjangKey: JenjangKey;
  jenjangLabel: string;
  grades: string[];
  subjects: Record<string, SubjectCurriculum>;
};

export type JenjangOption = {
  key: JenjangKey;
  label: string;
  faseCodes: FaseCode[];
  grades: string[];
};

export type FaseOption = {
  code: FaseCode;
  label: string;
  jenjangKey: JenjangKey;
  jenjangLabel: string;
  grades: string[];
  subjects: string[];
};

export const jenjangOptions: JenjangOption[] = [
  {
    "key": "sd",
    "label": "SD/MI",
    "faseCodes": [
      "A",
      "B",
      "C"
    ],
    "grades": [
      "Kelas 1",
      "Kelas 2",
      "Kelas 3",
      "Kelas 4",
      "Kelas 5",
      "Kelas 6"
    ]
  },
  {
    "key": "smp",
    "label": "SMP/MTs",
    "faseCodes": [
      "D"
    ],
    "grades": [
      "Kelas 7",
      "Kelas 8",
      "Kelas 9"
    ]
  },
  {
    "key": "sma",
    "label": "SMA/MA",
    "faseCodes": [
      "E",
      "F"
    ],
    "grades": [
      "Kelas 10",
      "Kelas 11",
      "Kelas 12"
    ]
  }
];

export const faseOptions: FaseOption[] = [
  {
    "code": "A",
    "label": "Fase A",
    "jenjangKey": "sd",
    "jenjangLabel": "SD/MI",
    "grades": [
      "Kelas 1",
      "Kelas 2"
    ],
    "subjects": [
      "Bahasa Indonesia",
      "Matematika"
    ]
  },
  {
    "code": "B",
    "label": "Fase B",
    "jenjangKey": "sd",
    "jenjangLabel": "SD/MI",
    "grades": [
      "Kelas 3",
      "Kelas 4"
    ],
    "subjects": [
      "Bahasa Indonesia",
      "Matematika",
      "IPAS"
    ]
  },
  {
    "code": "C",
    "label": "Fase C",
    "jenjangKey": "sd",
    "jenjangLabel": "SD/MI",
    "grades": [
      "Kelas 5",
      "Kelas 6"
    ],
    "subjects": [
      "Bahasa Indonesia",
      "Matematika",
      "IPAS"
    ]
  },
  {
    "code": "D",
    "label": "Fase D",
    "jenjangKey": "smp",
    "jenjangLabel": "SMP/MTs",
    "grades": [
      "Kelas 7",
      "Kelas 8",
      "Kelas 9"
    ],
    "subjects": [
      "Bahasa Indonesia",
      "Matematika",
      "IPA",
      "IPS"
    ]
  },
  {
    "code": "E",
    "label": "Fase E",
    "jenjangKey": "sma",
    "jenjangLabel": "SMA/MA",
    "grades": [
      "Kelas 10"
    ],
    "subjects": [
      "Bahasa Indonesia",
      "Matematika",
      "IPA",
      "IPS"
    ]
  },
  {
    "code": "F",
    "label": "Fase F",
    "jenjangKey": "sma",
    "jenjangLabel": "SMA/MA",
    "grades": [
      "Kelas 11",
      "Kelas 12"
    ],
    "subjects": [
      "Bahasa Indonesia",
      "Matematika",
      "Kimia",
      "Fisika",
      "Biologi",
      "Sosiologi",
      "Ekonomi",
      "Geografi"
    ]
  }
];

export const subjectOptions: string[] = [
  "Bahasa Indonesia",
  "Biologi",
  "Ekonomi",
  "Fisika",
  "Geografi",
  "IPA",
  "IPAS",
  "IPS",
  "Kimia",
  "Matematika",
  "Sosiologi"
];

export const curriculumData: Record<FaseCode, FaseCurriculum> = {
  "A": {
    "code": "A",
    "label": "Fase A",
    "jenjangKey": "sd",
    "jenjangLabel": "SD/MI",
    "grades": [
      "Kelas 1",
      "Kelas 2"
    ],
    "subjects": {
      "Bahasa Indonesia": {
        "name": "Bahasa Indonesia",
        "capaian": {
          "Menyimak": "Peserta didik mampu bersikap menjadi pendengar yang penuh perhatian. Peserta didik menunjukkan minat pada tuturan yang didengar serta mampu memahami informasi dari media audio, teks aural (teks yang dibacakan dan/atau didengar), instruksi lisan, dan percakapan yang berkaitan dengan diri, keluarga, dan/atau lingkungan.",
          "Membaca dan Memirsa": "Peserta didik mampu bersikap menjadi pembaca dan pemirsa yang menunjukkan minat terhadap teks yang dibaca atau dipirsa. Peserta didik mampu membaca kata-kata yang dikenali sehari-hari dengan fasih. Peserta didik mampu memahami informasi dari bacaan dan tayangan yang dipirsa tentang diri dan lingkungan, narasi imajinatif, dan puisi anak. Peserta didik mampu memaknai kosakata baru dan/atau kosakata Bahasa Indonesia serapan dari bahasa daerah dari teks yang dibaca atau tayangan yang dipirsa dengan bantuan ilustrasi.",
          "Berbicara dan Mempresentasikan": "Peserta didik mampu berbicara dengan santun tentang beragam topik yang dikenali menggunakan volume dan intonasi yang tepat sesuai konteks. Peserta didik mampu merespons dengan bertanya tentang sesuatu, menjawab, dan menanggapi komentar orang lain (teman, guru, dan/atau orang dewasa) dengan baik dan santun dalam suatu percakapan. Peserta didik mampu mengungkapkan perasaan dan gagasan secara lisan dengan atau tanpa bantuan gambar/ilustrasi. Peserta didik mampu menceritakan kembali suatu isi informasi yang dibaca atau didengar; dan menceritakan kembali teks narasi yang dibacakan atau dibaca dengan topik diri, keluarga, dan/atau lingkungan.",
          "Menulis": "Peserta didik mampu menunjukkan keterampilan menulis permulaan dengan benar di atas kertas dan/atau melalui media digital. Peserta didik mampu mengembangkan tulisan tangan yang semakin baik. Peserta didik mampu menulis berbagai teks tentang diri, keluarga, dan/atau lingkungan dengan beberapa kalimat sederhana."
        },
        "capaianKeys": [
          "Menyimak",
          "Membaca dan Memirsa",
          "Berbicara dan Mempresentasikan",
          "Menulis"
        ]
      },
      "Matematika": {
        "name": "Matematika",
        "capaian": {
          "Bilangan": "Peserta didik menunjukkan pemahaman dan memiliki intuisi bilangan (number sense) pada bilangan cacah sampai 100. Peserta didik dapat membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, serta melakukan komposisi (menyusun) dan dekomposisi (mengurai) bilangan. Mereka dapat melakukan operasi penjumlahan dan pengurangan menggunakan benda-benda konkret yang banyaknya sampai 20. Peserta didik menunjukkan pemahaman pecahan sebagai bagian dari keseluruhan melalui konteks membagi sebuah benda atau kumpulan benda sama banyak (pecahan yang diperkenalkan adalah setengah dan seperempat).",
          "Aljabar": "Peserta didik dapat menunjukkan pemahaman makna simbol matematika = dalam suatu kalimat matematika yang terkait dengan penjumlahan dan pengurangan bilangan cacah sampai 20 menggunakan gambar. Peserta didik dapat mengenali, meniru, dan melanjutkan pola bukan bilangan (misalnya, gambar, warna, bunyi/suara).",
          "Pengukuran": "Peserta didik dapat membandingkan panjang dan berat benda secara langsung, dan membandingkan durasi waktu. Mereka dapat mengukur dan mengestimasi panjang benda menggunakan satuan tidak baku.",
          "Geometri": "Peserta didik dapat mengenal berbagai bangun datar (segitiga, segiempat, segibanyak, lingkaran) dan bangun ruang (balok, kubus, kerucut, dan bola). Mereka dapat melakukan komposisi (penyusunan) dan dekomposisi (penguraian) suatu bangun datar (segitiga, segiempat, dan segi banyak). Mereka juga dapat menentukan posisi benda terhadap benda lain (kanan, kiri, depan belakang, bawah, atas).",
          "Analisis Data dan Peluang": "Peserta didik dapat mengurutkan, menyortir, mengelompokkan, membandingkan, dan menyajikan data dari banyak benda dengan menggunakan turus dan piktogram paling banyak 4 kategori."
        },
        "capaianKeys": [
          "Bilangan",
          "Aljabar",
          "Pengukuran",
          "Geometri",
          "Analisis Data dan Peluang"
        ]
      }
    }
  },
  "B": {
    "code": "B",
    "label": "Fase B",
    "jenjangKey": "sd",
    "jenjangLabel": "SD/MI",
    "grades": [
      "Kelas 3",
      "Kelas 4"
    ],
    "subjects": {
      "Bahasa Indonesia": {
        "name": "Bahasa Indonesia",
        "capaian": {
          "Menyimak": "Peserta didik mampu memahami ide pokok (gagasan) suatu pesan lisan, informasi dari media audio, teks aural (teks yang dibacakan dan/atau didengar), dan instruksi lisan yang berkaitan dengan hal-hal menarik di lingkungan sekitar. Peserta didik mampu memahami dan memaknai teks narasi yang dibacakan atau dari media audio.",
          "Membaca dan Memirsa": "Peserta didik mampu membaca kata-kata baru dengan pola kombinasi huruf yang telah dikenali dengan fasih. Peserta didik mampu memaknai kosakata baru dan/atau kosakata Bahasa Indonesia serapan dari bahasa daerah dari teks yang dibaca atau tayangan yang dipirsa mengenai hal-hal menarik di lingkungan sekitar. Peserta didik mampu memahami pesan dan informasi tentang kehidupan sehari-hari, teks narasi, dan puisi anak dalam bentuk cetak atau elektronik. Peserta didik mampu memahami ide pokok dan ide pendukung pada teks informatif dan teks narasi.",
          "Berbicara dan Mempresentasikan": "Peserta didik mampu berbicara dengan pilihan kata dan sikap tubuh/gestur yang santun, menggunakan volume dan intonasi yang tepat sesuai konteks. Peserta didik mampu terlibat secara aktif dalam suatu percakapan dan diskusi sesuai tata cara. Peserta didik mampu menceritakan kembali suatu informasi yang dibaca atau didengar dari teks narasi mengenai hal-hal menarik di lingkungan sekitar.",
          "Menulis": "Peserta didik mampu menulis berbagai teks sederhana dengan rangkaian kalimat yang beragam dan informasi mengenai hal-hal menarik di lingkungan sekitar. Peserta didik mampu menggunakan kaidah sederhana kebahasaan dan kosakata baru yang memiliki makna denotatif untuk menulis teks sesuai dengan konteks. Peserta didik terampil menulis kalimat dalam tulisan Latin dan tegak bersambung."
        },
        "capaianKeys": [
          "Menyimak",
          "Membaca dan Memirsa",
          "Berbicara dan Mempresentasikan",
          "Menulis"
        ]
      },
      "Matematika": {
        "name": "Matematika",
        "capaian": {
          "Bilangan": "Peserta didik menunjukkan pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 10.000. Mereka dapat membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, menggunakan nilai tempat, melakukan komposisi dan dekomposisi bilangan tersebut. Mereka juga dapat menyelesaikan masalah berkaitan dengan uang menggunakan ribuan sebagai satuan. Mereka dapat melakukan operasi penjumlahan dan pengurangan bilangan cacah sampai 1.000. Mereka dapat melakukan operasi perkalian dan pembagian bilangan cacah sampai 100 menggunakan benda-benda konkret, gambar, dan simbol matematika. Mereka juga dapat menyelesaikan masalah berkaitan dengan kelipatan dan faktor. Peserta didik dapat membandingkan dan mengurutkan antar-pecahan dengan pembilang satu dan antar-pecahan dengan penyebut yang sama. Mereka dapat mengenali pecahan senilai menggunakan gambar dan simbol matematika. Peserta didik menunjukkan pemahaman dan intuisi bilangan (number sense) pada bilangan desimal. Mereka dapat menyatakan pecahan desimal persepuluhan dan perseratusan, serta menghubungkan pecahan desimal perseratusan dengan konsep persen.",
          "Aljabar": "Peserta didik dapat mengisi nilai yang belum diketahui dalam sebuah kalimat matematika yang berkaitan dengan penjumlahan dan pengurangan pada bilangan cacah sampai 100. Peserta didik dapat mengidentifikasi, meniru, dan mengembangkan pola gambar atau objek sederhana dan pola bilangan membesar dan mengecil yang melibatkan penjumlahan dan pengurangan pada bilangan cacah sampai 100.",
          "Pengukuran": "Peserta didik dapat mengukur panjang dan berat benda menggunakan satuan baku. Mereka dapat menentukan hubungan antar-satuan baku panjang (cm, m). Mereka dapat mengukur dan mengestimasi luas dan volume menggunakan satuan tidak baku dan satuan baku berupa bilangan cacah.",
          "Geometri": "Peserta didik dapat mendeskripsikan ciri berbagai bentuk bangun datar (segiempat, segitiga, segi banyak). Mereka dapat menyusun (komposisi) dan mengurai (dekomposisi) berbagai bangun datar dengan lebih dari satu cara jika memungkinkan.",
          "Analisis Data dan Peluang": "Peserta didik dapat mengurutkan, membandingkan, menyajikan, menganalisis dan menginterpretasi data dalam bentuk tabel, diagram gambar, piktogram, dan diagram batang (skala satu satuan)."
        },
        "capaianKeys": [
          "Bilangan",
          "Aljabar",
          "Pengukuran",
          "Geometri",
          "Analisis Data dan Peluang"
        ] 
      },
      "IPAS": {
        "name": "IPAS",
        "capaian": {
          "Pemahaman IPAS": "Peserta didik memahami bentuk dan fungsi pancaindra; siklus hidup makhluk hidup dan upaya pelestariannya; masalah yang berkaitan dengan pelestarian sumber daya alam sebagai upaya mitigasi perubahan iklim; proses perubahan wujud zat dan perubahan bentuk energi; sumber dan bentuk energi serta proses perubahan bentuk energi dalam kehidupan sehari hari; gejala kemagnetan dalam kehidupan sehari-hari, jenis gaya dan pengaruhnya terhadap arah, gerak, dan bentuk benda; peran, tugas, dan tanggung jawab serta interaksi sosial yang terjadi di sekitar tempat tinggal dan sekolah; mengenal letak kota/kabupaten dan provinsi tempat tinggalnya melalui peta konvensional/digital; ragam bentang alam serta keterkaitannya dengan profesi masyarakat; keanekaragaman hayati, keragaman budaya, kearifan lokal, sejarah keluarga dan masyarakat tempat tinggalnya, dan upaya pelestariannya; serta perbedaan kebutuhan dan keinginan, nilai mata uang dan fungsinya.",
          "Keterampilan Proses": "1. Mengamati Di akhir fase ini, peserta didik mengamati fenomena dan peristiwa secara sederhana dengan menggunakan pancaindra dan dapat mencatat hasil pengamatannya. 2. Mempertanyakan dan memprediksi Dengan menggunakan panduan, peserta didik mengidentifikasi pertanyaan yang dapat diselidiki secara ilmiah dan membuat prediksi berdasarkan pengetahuan yang dimiliki sebelumnya. 3. Merencanakan dan melakukan penyelidikan Dengan panduan, peserta didik membuat rencana dan melakukan langkah-langkah operasional untuk menjawab pertanyaan yang diajukan. Menggunakan alat dan bahan yang sesuai dengan mengutamakan keselamatan. Peserta didik menggunakan alat bantu pengukuran untuk mendapatkan data yang akurat. 4. Memproses, menganalisis data dan informasi Mengorganisasikan data dalam bentuk tabel dan grafik sederhana untuk menyajikan data dan mengidentifikasi pola. Peserta didik membandingkan antara hasil pengamatan dengan prediksi dan memberikan alasan yang bersifat ilmiah. 5. Mengevaluasi dan refleksi Mengevaluasi kesimpulan melalui perbandingan dengan teori yang ada. Menunjukkan kelebihan dan kekurangan proses penyelidikan. 6. Mengomunikasikan hasil Mengomunikasikan hasil penyelidikan secara Lisan dan tertulis dalam berbagai format."
        },
        "capaianKeys": [
          "Pemahaman IPAS",
          "Keterampilan Proses"
        ]
      }
    }
  },
  "C": {
    "code": "C",
    "label": "Fase C",
    "jenjangKey": "sd",
    "jenjangLabel": "SD/MI",
    "grades": [
      "Kelas 5",
      "Kelas 6"
    ],
    "subjects": {
      "Bahasa Indonesia": {
        "name": "Bahasa Indonesia",
        "capaian": {
          "Menyimak": "Peserta didik mampu menganalisis informasi dengan mengidentifikasikan ciri objek, urutan proses kejadian dan nilai-nilai dari berbagai tipe teks nonfiksi dan fiksi yang disajikan dalam bentuk lisan, teks aural (teks yang dibacakan dan/atau didengar), dan audio.",
          "Membaca dan Memirsa": "Peserta didik mampu membaca kata-kata dengan berbagai pola kombinasi huruf dalam kata dengan fasih dan indah. Peserta didik mampu memahami informasi dan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk mengidentifikasi objek, fenomena, dan karakter. Peserta didik mampu menganalisis informasi dari berbagai tipe teks serta nilai-nilai yang terkandung dalam teks sastra dari teks visual dan/atau audiovisual. Peserta didik mampu membaca hasil pengamatan.",
          "Berbicara dan Mempresentasikan": "Peserta didik mampu menyampaikan informasi secara lisan untuk tujuan menghibur dan meyakinkan mitra tutur sesuai kaidah dan konteks. Peserta didik mampu menggunakan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan. Peserta didik mampu memilih kata yang tepat sesuai dengan norma sosial budaya. Peserta didik mampu menyampaikan informasi dengan fasih dan santun. Peserta didik mampu menyampaikan perasaan berdasarkan fakta, imajinasi (dari diri sendiri dan orang lain) secara indah dan menarik dalam bentuk karya sastra dengan penggunaan kosakata secara kreatif. Peserta didik mampu mempresentasikan gagasan, hasil pengamatan, dan pengalaman dengan logis, sistematis, efektif, dan kritis; mempresentasikan imajinasi secara kreatif.",
          "Menulis": "Peserta didik mampu menulis berbagai teks sederhana berdasarkan gagasan, hasil pengamatan, pengalaman, dan imajinasi. Peserta didik mampu menuliskan hasil pengamatan yang menjelaskan hubungan kausalitas (sebab akibat) untuk meyakinkan pembaca. Peserta didik mampu menggunakan kaidah kebahasaan dan kesastraan untuk menulis teks sesuai dengan konteks dan norma sosial budaya. Peserta didik mampu menggunakan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan. Peserta didik mampu menyampaikan perasaan berdasarkan fakta, imajinasi (dari diri sendiri dan orang lain) secara indah dan menarik dalam bentuk karya sastra dengan penggunaan kosakata secara kreatif. Peserta didik terampil menulis teks dalam tulisan Latin dan tegak bersambung."
        },
        "capaianKeys": [
          "Menyimak",
          "Membaca dan Memirsa",
          "Berbicara dan Mempresentasikan",
          "Menulis"
        ]
      },
      "Matematika": {
        "name": "Matematika",
        "capaian": {
          "Bilangan": "Peserta didik dapat menunjukkan pemahaman dan intuisi bilangan (number sense) pada bilangan cacah sampai 1.000.000. Mereka dapat membaca, menulis, menentukan nilai tempat, membandingkan, mengurutkan, melakukan komposisi dan dekomposisi bilangan tersebut. Mereka juga dapat menyelesaikan masalah yang berkaitan dengan uang. Mereka dapat melakukan operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan cacah sampai 100.000. Mereka juga dapat menyelesaikan masalah yang berkaitan dengan KPK dan FPB. Peserta didik dapat membandingkan dan mengurutkan berbagai pecahan termasuk pecahan campuran, melakukan operasi penjumlahan dan pengurangan pecahan, serta melakukan operasi perkalian dan pembagian pecahan dengan bilangan asli. Mereka dapat mengubah pecahan menjadi desimal, serta membandingkan dan mengurutkan bilangan desimal (satu angka di belakang koma).",
          "Aljabar": "Peserta didik dapat mengisi nilai yang belum diketahui dalam sebuah kalimat matematika yang berkaitan dengan penjumlahan, pengurangan, perkalian, dan pembagian pada bilangan cacah sampai 1000. Peserta didik dapat mengidentifikasi, meniru, dan mengembangkan pola bilangan membesar dan mengecil yang melibatkan perkalian dan pembagian. Mereka dapat bernalar secara proporsional untuk menyelesaikan masalah sehari-hari dengan rasio satuan. Mereka dapat menggunakan operasi perkalian dan pembagian dalam menyelesaikan masalah sehari-hari yang terkait dengan proporsi.",
          "Pengukuran": "Peserta didik dapat menentukan keliling dan luas berbagai bentuk bangun datar (segitiga, segiempat, dan segi banyak) serta gabungannya. Mereka dapat menghitung durasi waktu dan mengukur besar sudut.",
          "Geometri": "Peserta didik dapat mengonstruksi dan mengurai bangun ruang (kubus, balok, dan gabungannya) dan mengenali visualisasi spasial (bagian depan, atas, dan samping). Mereka dapat membandingkan karakteristik antarbangun datar dan antarbangun ruang. Mereka dapat menentukan lokasi pada peta yang menggunakan sistem berpetak.",
          "Analisis Data dan Peluang": "Peserta didik dapat mengurutkan, membandingkan, menyajikan, dan menganalisis data banyak benda dan data hasil pengukuran dalam bentuk gambar, piktogram, diagram batang, dan tabel frekuensi untuk mendapatkan informasi. Mereka dapat menentukan kejadian dengan kemungkinan yang lebih besar dalam suatu percobaan acak."
        },
        "capaianKeys": [
          "Bilangan",
          "Aljabar",
          "Pengukuran",
          "Geometri",
          "Analisis Data dan Peluang"
        ]
      },
      "IPAS": {
        "name": "IPAS",
        "capaian": {
          "Pemahaman IPAS": "Peserta didik memahami sistem organ tubuh manusia yang dikaitkan dengan cara menjaga kesehatan tubuhnya; hubungan antar komponen biotik dan abiotik serta pengaruhnya terhadap ekosistem; siklus air dan kaitannya dengan upaya menjaga ketersediaan air; fenomena gelombang bunyi dan cahaya dalam kehidupan sehari-hari; upaya penghematan energi serta pemanfaatan sumber energi alternatif dari sumber daya yang ada di sekitarnya sebagai upaya mitigasi perubahan iklim; sistem tata surya dan kaitannya dengan rotasi dan revolusi bumi; letak dan kondisi geografis negara Indonesia melalui peta konvensional/digital; sejarah perjuangan para pahlawan di lingkungan sekitar tempat tinggalnya; keragaman budaya nasional yang dikaitkan dengan konteks kebinekaan berdasarkan pemahamannya terhadap nilai-nilai kearifan lokal yang berlaku di wilayahnya; serta kegiatan ekonomi masyarakat dan ekonomi kreatif di lingkungan sekitar.",
          "Keterampilan Proses": "1. Mengamati Pada akhir fase C, peserta didik mengamati fenomena dan peristiwa secara sederhana dengan menggunakan panca indra, mencatat hasil pengamatannya, serta mencari persamaan dan perbedaannya. 2. Mempertanyakan dan memprediksi Dengan panduan, peserta didik dapat mengajukan pertanyaan lebih lanjut untuk memperjelas hasil pengamatan dan membuat prediksi tentang penyelidikan ilmiah. 3. Merencanakan dan melakukan penyelidikan Secara mandiri, peserta didik merencanakan dan melakukan langkah-langkah operasional untuk menjawab pertanyaan yang diajukan. Menggunakan alat dan bahan yang sesuai dengan mengutamakan keselamatan. Peserta didik menggunakan alat bantu pengukuran untuk mendapatkan data yang akurat. 4. Memproses, menganalisis data dan informasi Menyajikan data dalam bentuk tabel atau grafik serta menjelaskan hasil pengamatan dan pola atau hubungan pada data secara digital atau non digital. Membandingkan data dengan prediksi dan menggunakannya sebagai bukti dalam menyusun penjelasan ilmiah. 5. Mengevaluasi dan refleksi Mengevaluasi kesimpulan melalui perbandingan dengan teori yang ada. Merefleksikan proses investigasi, termasuk merefleksikan validitas suatu tes. 6. Mengomunikasikan hasil Mengomunikasikan hasil penyelidikan secara utuh yang ditunjang dengan argumen, bahasa, serta konvensi sains yang umum sesuai format yang ditentukan"
        },
        "capaianKeys": [
          "Pemahaman IPAS",
          "Keterampilan Proses"
        ]
      }
    }
  },
  "D": {
    "code": "D",
    "label": "Fase D",
    "jenjangKey": "smp",
    "jenjangLabel": "SMP/MTs",
    "grades": [
      "Kelas 7",
      "Kelas 8",
      "Kelas 9"
    ],
    "subjects": {
      "Bahasa Indonesia": {
        "name": "Bahasa Indonesia",
        "capaian": {
          "Menyimak": "Peserta didik mampu menganalisis dan memaknai informasi berupa gagasan, pikiran, perasaan, pandangan, arahan atau pesan yang tepat dari berbagai tipe teks audio visual dan aural dalam bentuk monolog, dialog, dan gelar wicara. Peserta didik mampu mengeksplorasi dan mengevaluasi berbagai informasi dari topik aktual yang didengar.",
          "Membaca dan Memirsa": "Peserta didik mampu memahami informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari teks visual dan audiovisual untuk menemukan makna yang tersurat dan tersirat. Peserta didik mampu menginterpretasikan informasi untuk mengungkapkan kepedulian dan/atau pendapat pro/kontra dari teks visual dan audiovisual. Peserta didik mampu menggunakan sumber informasi lain untuk menilai akurasi (ketepatan) dan kualitas data serta membandingkan informasi pada teks; mengeksplorasi dan mengevaluasi berbagai topik aktual yang dibaca dan dipirsa.",
          "Berbicara dan Mempresentasikan": "Peserta didik mampu menyampaikan gagasan, pikiran, pandangan, arahan atau pesan untuk tujuan pengajuan usul, pemecahan masalah, dan pemberian solusi secara lisan dalam bentuk monolog dan dialog logis, kritis, dan kreatif. Peserta didik mampu menggunakan dan memaknai kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk berbicara dan menyajikan gagasannya. Peserta didik mampu menggunakan ungkapan sesuai dengan norma kesopanan dalam berkomunikasi. Peserta didik mampu berdiskusi secara aktif, kontributif, efektif, dan santun. Peserta didik mampu menuturkan dan menyajikan ungkapan kepedulian dalam bentuk teks nonfiksi dan fiksi multimodal yang netral, ramah gender, dan/atau ramah keberagaman. Peserta didik mampu mengungkapkan dan mempresentasikan berbagai topik aktual secara kritis.",
          "Menulis": "Peserta didik mampu menulis gagasan, pikiran, pandangan, arahan atau pesan tertulis untuk berbagai tujuan secara logis, kritis, dan kreatif. Peserta didik mampu menuliskan hasil penelitian menggunakan metodologi sederhana dengan mengutip sumber rujukan secara etis. Peserta didik mampu menyampaikan ungkapan rasa kepedulian dan pendapat pro/kontra secara etis dalam memberikan penghargaan secara tertulis dalam teks multimodal yang disajikan melalui media cetak, elektronik, dan/atau digital. Peserta didik mampu menggunakan dan mengembangkan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk menulis. Peserta didik mampu menyampaikan tulisan berdasarkan fakta, pengalaman, dan imajinasi secara indah dan menarik dalam bentuk karya sastra dengan penggunaan kosakata secara kreatif."
        },
        "capaianKeys": [
          "Menyimak",
          "Membaca dan Memirsa",
          "Berbicara dan Mempresentasikan",
          "Menulis"
        ]
      },
      "Matematika": {
        "name": "Matematika",
        "capaian": {
          "Bilangan": "Peserta didik dapat membaca, menulis, dan membandingkan bilangan bulat, bilangan rasional dan irasional, bilangan desimal, bilangan berpangkat bulat dan akar, bilangan dalam notasi ilmiah. Mereka dapat menerapkan operasi aritmetika pada bilangan real, dan memberikan estimasi/perkiraan dalam menyelesaikan masalah (termasuk berkaitan dengan literasi finansial). Peserta didik dapat menggunakan faktorisasi prima dan pengertian rasio (skala, proporsi, dan laju perubahan) dalam penyelesaian masalah.",
          "Aljabar": "Peserta didik dapat mengenali, memprediksi dan menggeneralisasi pola dalam bentuk susunan benda dan bilangan. Mereka dapat menyatakan suatu situasi ke dalam bentuk aljabar. Mereka dapat menggunakan sifat-sifat operasi (komutatif, asosiatif, dan distributif) untuk menghasilkan bentuk aljabar yang ekuivalen. Peserta didik dapat memahami relasi dan fungsi (domain, kodomain, range) serta menyajikannya dalam bentuk diagram panah, tabel, himpunan pasangan berurutan, dan grafik. Mereka dapat membedakan beberapa fungsi nonlinear dari fungsi linear secara grafik. Mereka dapat menyelesaikan persamaan dan pertidaksamaan linear satu variabel. Mereka dapat menyajikan, menganalisis, dan menyelesaikan masalah dengan menggunakan relasi, fungsi, dan persamaan linear. Mereka dapat menyelesaikan sistem persaman linear dua variabel melalui beberapa cara untuk penyelesaian masalah.",
          "Pengukuran": "Peserta didik dapat menjelaskan cara untuk menentukan luas lingkaran dan menyelesaikan masalah yang terkait. Mereka dapat menjelaskan cara untuk menentukan luas permukaan dan volume bangun ruang (prisma, tabung, bola, limas dan kerucut) dan menyelesaikan masalah yang terkait. Peserta didik dapat menjelaskan pengaruh perubahan secara proporsional dari bangun datar dan bangun ruang terhadap ukuran panjang, besar sudut, luas, dan/atau volume.",
          "Geometri": "Peserta didik dapat membuat jaring-jaring bangun ruang (prisma, tabung, limas dan kerucut) dan membuat bangun ruang dari jaring-jaringnya. Peserta didik dapat menggunakan hubungan antar-sudut yang terbentuk oleh dua garis yang berpotongan, dan oleh dua garis sejajar yang dipotong sebuah garis transversal untuk menyelesaikan masalah (termasuk menentukan jumlah besar sudut dalam sebuah segitiga, menentukan besar sudut yang belum diketahui pada sebuah segitiga). Mereka dapat menjelaskan sifat-sifat kekongruenan dan kesebangunan pada segitiga dan segiempat, dan menggunakannya untuk menyelesaikan masalah. Mereka dapat menunjukkan kebenaran teorema Pythagoras dan menggunakannya dalam menyelesaikan masalah (termasuk jarak antara dua titik pada bidang koordinat Kartesius). Peserta didik dapat melakukan transformasi tunggal (refleksi, translasi, rotasi, dan dilatasi) titik, garis, dan bangun datar pada bidang koordinat Kartesius dan menggunakannya untuk menyelesaikan masalah.",
          "Analisis Data dan Peluang": "Peserta didik dapat merumuskan pertanyaan, mengumpulkan, menyajikan, dan menganalisis data untuk menjawab pertanyaan. Mereka dapat menggunakan diagram batang dan diagram lingkaran untuk menyajikan dan menginterpretasi data. Mereka dapat mengambil sampel yang mewakili suatu populasi untuk mendapatkan data yang terkait dengan diri dan lingkungan mereka. Mereka dapat menentukan dan menafsirkan rerata (mean), median, modus, dan jangkauan (range) dari data tersebut untuk menyelesaikan masalah (termasuk membandingkan suatu data terhadap kelompoknya, membandingkan dua kelompok data, memprediksi, membuat keputusan). Mereka dapat menyelidiki kemungkinan adanya perubahan pengukuran pusat tersebut akibat perubahan data. Peserta didik dapat menjelaskan dan menggunakan pengertian peluang dan frekuensi relatif untuk menentukan frekuensi harapan satu kejadian pada suatu percobaan sederhana (semua hasil percobaan dapat muncul secara merata)."
        },
        "capaianKeys": [
          "Bilangan",
          "Aljabar",
          "Pengukuran",
          "Geometri",
          "Analisis Data dan Peluang"
        ]
      },
      "IPA": {
        "name": "IPA",
        "capaian": {
          "Pemahaman IPA": "Peserta didik memahami proses identifikasi makhluk hidup sesuai dengan karakteristiknya; sifat dan karakteristik zat, perubahan fisika dan kimia, serta pemisahan campuran sederhana; sistem organisasi kehidupan, fungsi, serta kelainan atau gangguan yang muncul pada sistem organ; interaksi antar makhluk hidup dan lingkungannya dalam merancang upaya-upaya untuk mencegah dan mengatasi perubahan iklim; serta pewarisan sifat dan penerapan bioteknologi di lingkungan sekitarnya. Peserta didik melakukan pengukuran terhadap aspek fisis yang mereka temui dan memanfaatkan ragam gerak dan gaya, tekanan, serta pesawat sederhana. Peserta didik memahami hubungan konsep usaha dan energi, pengaruh kalor dan perpindahannya terhadap perubahan suhu, gelombang dan pemanfaatannya dalam kehidupan sehari-hari, gejala kemagnetan dan kelistrikan untuk menyelesaikan tantangan yang dihadapi dalam kehidupan sehari-hari termasuk pemanfaatan sumber energi listrik ramah lingkungan. Peserta didik mengelaborasikan pemahamannya mengenai posisi relatif bumi-bulan-matahari dalam sistem tata surya untuk menjelaskan fenomena alam dan perubahan iklim. Peserta didik memahami sifat fisika dan kimia tanah dan menganalisis hubungannya dengan organisme, perubahan iklim, serta pelestarian lingkungan. Peserta didik memiliki keteguhan dalam mengambil keputusan yang tepat untuk menghindari zat aditif dan adiktif yang membahayakan dirinya dan lingkungan.",
          "Keterampilan Proses": "Mengamati Peserta didik mampu melakukan pengamatan terhadap fenomena dan peristiwa di sekitarnya dan mencatat hasil pengamatannya dengan memperhatikan karakteristik objek yang diamati. Mempertanyakan dan Memprediksi Secara mandiri, peserta didik mampu mengidentifikasi pertanyaan yang dapat diselidiki secara ilmiah dan membuat prediksinya. Merencanakan dan Melakukan Penyelidikan Peserta didik mampu merencanakan dan melakukan langkah-langkah operasional untuk menjawab pertanyaan. Peserta didik menggunakan alat bantu pengukuran untuk mendapatkan data yang akurat dan memahami adanya potensi kekeliruan dalam penyelidikan. Memproses, Menganalisis Data dan Informasi Peserta didik mampu mengolah data dalam bentuk tabel, grafik, dan model serta menjelaskan hasil pengamatan dan pola atau hubungan pada data. Peserta didik mengumpulkan data dari penyelidikan yang dilakukannya, serta menggunakan pemahaman sains untuk mengidentifikasi hubungan dan menarik kesimpulan berdasarkan bukti. Mengevaluasi dan Refleksi Peserta didik mampu mengidentifikasi sumber ketidakpastian dan kemungkinan penjelasan alternatif dalam rangka mengevaluasi kesimpulan, serta menjelaskan cara spesifik untuk meningkatkan kualitas data. Mengomunikasikan Hasil Peserta didik mampu mengomunikasikan hasil penyelidikan secara sistematis dan utuh yang ditunjang dengan argumen dan bahasa yang sesuai konteks penyelidikan."
        },
        "capaianKeys": [
          "Pemahaman IPA",
          "Keterampilan Proses"
        ]
      },
      "IPS": {
        "name": "IPS",
        "capaian": {
          "Pemahaman Konsep": "Peserta didik memahami keberagaman kondisi geografis Indonesia, konektivitas antarruang terhadap upaya pemanfaatan dan pelestarian potensi sumber daya alam, faktor aktivitas manusia terhadap perubahan iklim dan potensi bencana alam. Peserta didik memahami dampak perubahan iklim terhadap kehidupan ekonomi, sosial, budaya masyarakat serta merefleksikan pola adaptasi terhadap perubahan iklim dan upaya mitigasi bencana untuk menunjang sustainable development goals (SDGs) dalam konteks lokal, regional, dan global. Peserta didik memahami upaya masyarakat dalam memenuhi kebutuhannya melalui kegiatan ekonomi, harga, pasar, lembaga keuangan, perdagangan internasional, peran masyarakat dan negara dalam mendorong pertumbuhan ekonomi di era digital, serta potensi Indonesia menjadi negara maju. Peserta didik memahami proses interaksi sosial, lembaga sosial, dinamika sosial dan perubahan sistem sosial budaya dalam masyarakat yang majemuk untuk mewujudkan integrasi bangsa dengan prinsip kebinekaan. Peserta didik mengenali konsep dasar ilmu sejarah yaitu manusia, ruang, waktu, kronologi, perubahan, dalam menganalisis keterhubungan antara masa lampau, masa kini, dan masa yang akan datang ketika mempelajari sejarah lokal dan toponimi wilayah serta berbagai peristiwa atau kejadian penting dalam lingkup lokal, nasional dan global terkait asal-usul nenek moyang bangsa Indonesia dan jalur rempah nusantara.",
          "Keterampilan Proses": "Peserta didik menerapkan pemahaman konsep melalui pendekatan keterampilan proses dengan cara mengamati fenomena dan peristiwa secara sistematis dengan menggunakan pancaindra serta menemukan persamaan dan perbedaannya. menanya dengan panduan guru, peserta didik mengajukan pertanyaan untuk menggali dan klarifikasi informasi, serta mencari tahu penyebab dan memprediksinya.  mengumpulkan informasi secara berkolaborasi, merencanakan dan melakukan penyelidikan, mengumpulkan informasi dengan sumber primer, dan mendokumentasikannya. berkolaborasi, mengolah informasi yang relevan serta memprioritaskan beberapa gagasan tertentu. mengevaluasi dan refleksi serta melakukan perbaikan untuk menarik simpulan hasil penyelidikan dengan tepat. mengomunikasikan dan menyajikan hasil penyelidikan dengan menggunakan media informasi yang tepat. menyusun rencana tidak lanjut dari hasil penyelidikan yang telah dihasilkan secara kolaboratif."
        },
        "capaianKeys": [
          "Pemahaman Konsep",
          "Keterampilan Proses"
        ]
      }
    }
  },
  "E": {
    "code": "E",
    "label": "Fase E",
    "jenjangKey": "sma",
    "jenjangLabel": "SMA/MA",
    "grades": [
      "Kelas 10"
    ],
    "subjects": {
      "Bahasa Indonesia": {
        "name": "Bahasa Indonesia",
        "capaian": {
          "Menyimak": "Peserta didik mampu mengevaluasi dan mengkreasi informasi berupa gagasan, pikiran, perasaan, pandangan, arahan atau pesan yang akurat dari menyimak berbagai tipe teks dalam bentuk monolog, dialog, dan gelar wicara.",
          "Membaca dan Memirsa": "Peserta didik mampu mengevaluasi informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari berbagai tipe teks visual dan audiovisual untuk menemukan makna yang tersurat dan tersirat. Peserta didik mampu menginterpretasi informasi untuk mengungkapkan gagasan dan perasaan simpati, peduli, empati dan/atau pendapat pro/kontra dari teks visual dan audiovisual secara kreatif. Peserta didik mampu menggunakan sumber lain untuk menilai akurasi dan kualitas data serta membandingkan isi teks.",
          "Berbicara dan Mempresentasikan": "Peserta didik mampu mengolah dan menyajikan gagasan, pikiran, pandangan, arahan atau pesan untuk tujuan pengajuan usul, perumusan masalah, dan solusi dalam bentuk monolog, dialog, dan gelar wicara secara logis, runtut, kritis, dan kreatif. Peserta didik mampu mengkreasi ungkapan sesuai dengan norma kesopanan dalam berkomunikasi. Peserta didik mampu berkontribusi lebih aktif dalam diskusi dengan mempersiapkan materi diskusi, melaksanakan tugas dan fungsi dalam diskusi. Peserta didik mampu mengungkapkan kepedulian secara kreatif dalam bentuk teks fiksi dan nonfiksi multimodal.",
          "Menulis": "Peserta didik mampu menulis gagasan, pikiran, pandangan, arahan atau pesan tertulis untuk berbagai tujuan secara logis, kritis, dan kreatif dalam bentuk teks informasional dan/atau fiksi. Peserta didik mampu menulis teks eksposisi hasil penelitian dan teks fungsional dunia kerja. Peserta didik mampu mengalihwahanakan satu teks ke teks lainnya. Peserta didik mampu menerbitkan hasil tulisan di media cetak, elektronik, dan/atau digital."
        },
        "capaianKeys": [
          "Menyimak",
          "Membaca dan Memirsa",
          "Berbicara dan Mempresentasikan",
          "Menulis"
        ]
      },
      "Matematika": {
        "name": "Matematika",
        "capaian": {
          "Bilangan": "Peserta didik dapat menggeneralisasi sifat-sifat bilangan berpangkat (termasuk bilangan pangkat pecahan). Mereka dapat menerapkan barisan dan deret aritmetika dan geometri, termasuk masalah yang terkait bunga tunggal dan bunga majemuk.",
          "Aljabar": "Peserta didik dapat menyelesaikan masalah yang berkaitan dengan sistem persamaan linear tiga variabel dan sistem pertidaksamaan linear dua variabel. Mereka dapat menyelesaikan masalah yang berkaitan dengan persamaan dan fungsi kuadrat (termasuk akar imajiner), serta persamaan eksponensial (berbasis/ bilangan pokok sama) dan fungsi eksponensial.",
          "Pengukuran": "-",
          "Geometri": "Peserta didik dapat menyelesaikan permasalahan segitiga siku-siku yang melibatkan perbandingan trigonometri dan aplikasinya.",
          "Analisis Data dan Peluang": "Peserta didik dapat merepresentasikan dan menginterpretasi data dengan cara menentukan jangkauan kuartil dan interkuartil. Mereka dapat membuat dan menginterpretasi diagram box plot (box-and whisker plot) dan menggunakannya untuk membandingkan himpunan data. Mereka dapat menentukan dan menggunakan dari box plot, histogram dan dot plot sesuai dengan natur (karakteristik) data dan kebutuhan. Mereka dapat menggunakan diagram pencar untuk menyelidiki dan menjelaskan hubungan antara dua variabel numerik/ kuantitatif (termasuk salah satunya variabel bebas berupa waktu). Mereka dapat mengevaluasi laporan statistika di media berdasarkan tampilan, statistika dan representasi data. Peserta didik dapat menjelaskan peluang dan menentukan frekuensi harapan dari kejadian majemuk. Mereka menyelidiki konsep dari kejadian saling bebas dan saling lepas, dan menentukan peluangnya."
        },
        "capaianKeys": [
          "Bilangan",
          "Aljabar",
          "Pengukuran",
          "Geometri",
          "Analisis Data dan Peluang"
        ]
      },
      "IPA": {
        "name": "IPA",
        "capaian": {
          "Pemahaman IPA": "Peserta didik memahami proses klasifikasi makhluk hidup; peranan virus, bakteri, dan jamur dalam kehidupan; ekosistem dan interaksi antarkomponen serta faktor yang mempengaruhi; dan pemanfaatan bioteknologi dalam berbagai bidang kehidupan. Peserta didik memahami sistem pengukuran dalam kerja ilmiah; energi alternatif dan pemanfaatannya untuk mengatasi permasalahan ketersediaan energi. Peserta didik memahami struktur atom, sifat atom, dan kaitannya dengan tabel periodik; serta memahami reaksi kimia, hukum-hukum dasar kimia, dan perannya dalam kehidupan sehari-hari. Peserta didik menerapkan pemahaman IPA untuk mengatasi permasalahan berkaitan dengan perubahan iklim",
          "Keterampilan Proses": "Mengamati Peserta didik mengamati fenomena ilmiah dan mencatat hasil pengamatannya dengan memperhatikan karakteristik dari objek yang diamati untuk memunculkan pertanyaan yang akan diselidiki. Mempertanyakan dan Memprediksi Peserta didik mengidentifikasi pertanyaan dan permasalahan yang dapat diselidiki secara ilmiah. Peserta didik menghubungkan pengetahuan yang telah dimiliki dengan pengetahuan baru untuk membuat prediksi. Merencanakan dan Melakukan Penyelidikan Peserta didik merencanakan penyelidikan ilmiah dan melakukan langkah-langkah operasional berdasarkan referensi yang benar untuk menjawab pertanyaan. Peserta didik melakukan pengukuran atau membandingkan variabel terikat dengan menggunakan alat yang sesuai serta memperhatikan kaidah ilmiah. Memproses, Menganalisis Data dan Informasi Peserta didik menafsirkan informasi yang diperoleh dengan jujur dan bertanggung jawab. Peserta didik menganalisis menggunakan alat dan metode yang tepat berdasarkan data penyelidikan dengan menggunakan referensi rujukan yang sesuai, serta menyimpulkan hasil penyelidikan. Mengevaluasi dan Refleksi Peserta didik mengidentifikasi sumber ketidakpastian dan kemungkinan penjelasan alternatif dalam rangka mengevaluasi kesimpulan serta menjelaskan cara spesifik untuk meningkatkan kualitas data. Peserta didik menganalisis validitas informasi dan mengevaluasi pendekatan yang digunakan untuk menyelesaikan masalah dalam penyelidikan. Mengomunikasikan Hasil Peserta didik mengomunikasikan hasil penyelidikan secara sistematis dan utuh ditunjang dengan argumen ilmiah berdasarkan referensi sesuai konteks penyelidikan."
        },
        "capaianKeys": [
          "Pemahaman IPA",
          "Keterampilan Proses"
        ]
      },
      "IPS": {
        "name": "IPS",
        "capaian": {
          "Pemahaman Konsep": "Peserta didik mampu memahami fungsi sosiologi sebagai ilmu yang secara kritis, analitis, kreatif, dan solutif mengkaji masyarakat. Peserta didik mampu memahami status dan peran individu dalam kelompok sosial dan memahami berbagai ragam gejala sosial yang ada di dalam masyarakat. Peserta didik mampu memahami keragaman manusia dan budayanya sebagai bagian dari masyarakat multikultural. Peserta didik memahami hakikat ilmu ekonomi sebagai ilmu yang mempelajari upaya manusia dalam memenuhi kebutuhan hidupnya. Peserta didik memahami lembaga serta produk keuangan bank dan nonbank sebagai dasar dalam mengelola, menggunakan produk dan layanan, serta mengenali dan menghindari risiko keuangan kehidupannya dalam konteks mampu membuat laporan keuangan pribadi. Peserta didik memahami konsep dasar Geografi, peta, pengindraan jauh, Sistem Informasi Geografis (SIG), penelitian Geografi, dan fenomena geosfer fisik yaitu litosfer, atmosfer, dan hidrosfer sebagai ruang kehidupan. Peserta didik memahami konsep dasar ilmu sejarah serta mengenali penelitian sejarah untuk menganalisis keterhubungan antara masa lampau, masa kini, dan masa yang akan datang ketika mempelajari berbagai peristiwa atau kejadian penting dalam lingkup lokal, nasional dan global mulai dari masa kerajaan Hindu-Budha hingga masa kerajaan Islam.",
          "Keterampilan Proses": "Peserta didik mengamati fenomena kehidupan manusia dalam dimensi ruang dan waktu secara sistematis serta menemukan persamaan dan perbedaannya dan potensinya. Membuat pertanyaan secara mandiri untuk menggali informasi tentang fenomena kehidupan manusia dalam dimensi ruang dan waktu secara sistematis. Mengumpulkan informasi dari sumber primer dan/atau sekunder, melakukan observasi, dan mendokumentasikannya. Menarik simpulan berdasarkan dari informasi yang diperoleh dari sumber primer dan/atau sekunder, hasil observasi dan hasil dokumentasi. Mengomunikasikan hasil analisis informasi yang diperoleh dari sumber primer dan/atau sekunder, data hasil observasi, dan hasil dokumentasi dalam bentuk media digital dan/atau nondigital. Merefleksikan hasil analisis informasi yang diperoleh dari sumber primer dan/atau sekunder, hasil observasi, dan hasil dokumentasi serta menyusun rencana tindak lanjut."
        },
        "capaianKeys": [
          "Pemahaman Konsep",
          "Keterampilan Proses"
        ]
      }
    }
  },
  "F": {
    "code": "F",
    "label": "Fase F",
    "jenjangKey": "sma",
    "jenjangLabel": "SMA/MA",
    "grades": [
      "Kelas 11",
      "Kelas 12"
    ],
    "subjects": {
      "Bahasa Indonesia": {
        "name": "Bahasa Indonesia",
        "capaian": {
          "Menyimak": "Peserta didik mampu mengevaluasi berbagai gagasan, pikiran, perasaan, pandangan, arahan atau pesan berdasarkan kaidah logika berpikir dari menyimak berbagai tipe teks dalam bentuk monolog, dialog, dan gelar wicara. Peserta didik mampu mengkreasi dan mengapresiasi gagasan dan pendapat untuk menanggapi teks yang disimak.",
          "Membaca dan Memirsa": "Peserta didik mampu mengevaluasi informasi berupa gagasan, pikiran, perasaan, pandangan, arahan atau pesan berdasarkan kaidah logika berpikir dari membaca berbagai tipe teks di media cetak dan elektronik. Peserta didik mampu mengapresiasi teks fiksi dan nonfiksi. Peserta didik mampu mengevaluasi dan merefleksi gagasan dan pandangan berdasarkan kaidah logika berpikir dari membaca berbagai tipe teks di media cetak dan elektronik. Peserta didik mampu mengapresiasi berbagai tipe teks. Peserta didik mampu mengaitkan isi teks dengan hal lain di luar teks.",
          "Berbicara dan Mempresentasikan": "Peserta didik mampu menyajikan gagasan, pikiran, perasaan, pandangan, arahan atau pesan dan kreativitas dalam berbahasa dalam bentuk monolog, dialog, dan gelar wicara secara logis, sistematis, kritis, dan kreatif. Peserta didik mampu menyajikan karya sastra secara kreatif dan menarik. Peserta didik mampu mengkreasi teks sesuai dengan norma kesopanan dan budaya Indonesia. Peserta didik mampu menyajikan dan mempertahankan hasil penelitian, serta menyimpulkan masukan dari mitra diskusi.",
          "Menulis": "Peserta didik mampu menulis gagasan, pikiran, pandangan, pengetahuan metakognisi untuk berbagai tujuan secara logis, kritis, dan kreatif. Peserta didik mampu menulis berbagai jenis karya sastra. Peserta didik mampu menulis teks refleksi diri. Peserta didik mampu menulis hasil penelitian, teks fungsional dunia kerja, dan pengembangan studi lanjut. Peserta didik mampu menerbitkan tulisan hasil karyanya di media cetak, elektronik, dan/atau digital."
        },
        "capaianKeys": [
          "Menyimak",
          "Membaca dan Memirsa",
          "Berbicara dan Mempresentasikan",
          "Menulis"
        ]
      },
      "Matematika": {
        "name": "Matematika",
        "capaian": {
          "Bilangan": "Peserta didik dapat memodelkan pinjaman dan investasi dengan bunga majemuk dan anuitas, serta menyelidiki (secara numerik atau grafis) pengaruh masing-masing parameter (suku bunga, periode pembayaran) dalam model tersebut.",
          "Aljabar": "Peserta didik dapat menyatakan data dalam bentuk matriks. Mereka dapat menentukan fungsi invers, komposisi fungsi, dan transformasi fungsi untuk memodelkan situasi dunia nyata menggunakan fungsi yang sesuai (linear, kuadrat, eksponensial).",
          "Pengukuran": "-",
          "Geometri": "Peserta didik dapat menerapkan teorema tentang lingkaran, dan menentukan panjang busur dan luas juring lingkaran untuk menyelesaikan masalah (termasuk menentukan lokasi posisi pada permukaan Bumi dan jarak antara dua tempat di Bumi).",
          "Analisis Data dan Peluang": "Peserta didik dapat melakukan proses penyelidikan statistika untuk data bivariat. Mereka dapat mengidentifikasi dan menjelaskan asosiasi antara dua variabel kategorikal (kualitatif) dan antara dua variabel numerikal (kuantitatif). Mereka dapat memperkirakan model linear terbaik (best fit) pada data numerikal (kuantitatif). Mereka dapat membedakan hubungan asosiasi dan sebab-akibat. Peserta didik memahami konsep peluang bersyarat dan kejadian yang saling bebas menggunakan konsep permutasi dan kombinasi"
        },
        "capaianKeys": [
          "Bilangan",
          "Aljabar",
          "Pengukuran",
          "Geometri",
          "Analisis Data dan Peluang"
        ]
      },
      "Kimia": {
        "name": "Kimia",
        "capaian": {
          "Pemahaman Kimia": "Peserta didik memiliki kemampuan memahami konsep mol dan stoikiometri dalam menyelesaikan perhitungan kimia; ikatan kimia dalam kaitannya dengan interaksi antar partikel materi dan sifat fisik materi; teori tumbukan antar partikel materi sebagai dasar konsep laju reaksi; kesetimbangan kimia untuk mengamati perilaku reaktan dan produk pada level mikroskopik; korelasi antara pH larutan asam, basa, garam dan larutan penyangga serta penerapannya dalam kehidupan sehari-hari; termokimia; konsep redoks dan sel elektrokimia sebagai implikasi perubahan materi dan energi yang menyertai reaksi kimia serta penerapannya dalam kehidupan sehari hari; serta senyawa karbon, hidrokarbon dan turunannya beserta pemanfaatannya dalam kehidupan sehari hari.",
          "Keterampilan Proses": "Mengamati Peserta didik mengamati fenomena ilmiah dan mencatat hasil pengamatannya dengan memperhatikan detail dari objek yang diamati untuk memunculkan pertanyaan yang akan diselidiki. Mempertanyakan dan Memprediksi Peserta didik merumuskan pertanyaan ilmiah tentang hubungan antarvariabel dan hipotesis yang dapat diselidiki secara ilmiah. Merencanakan dan Melakukan Penyelidikan Peserta didik merencanakan dan memilih metode yang sesuai serta mengendalikan variabel berdasarkan referensi untuk mengumpulkan data yang dapat dipercaya. Peserta didik memilih dan menggunakan alat dan bahan, termasuk penggunaan teknologi digital yang sesuai untuk mengumpulkan serta mencatat data secara sistematis dan akurat. Memproses, menganalisis Data dan Informasi Peserta didik menafsirkan informasi yang diperoleh dengan jujur dan bertanggung jawab. Peserta didik menggunakan berbagai metode untuk menganalisa pola dan kecenderungan pada data. Peserta didik mendeskripsikan hubungan antarvariabel serta mengidentifikasi inkonsistensi yang terjadi. Peserta didik menggunakan data dan rujukan untuk menarik kesimpulan yang konsisten dengan hasil penyelidikan. Mengevaluasi dan Refleksi Peserta didik mengidentifikasi sumber ketidakpastian dan kemungkinan penjelasan alternatif dalam rangka mengevaluasi kesimpulan serta menjelaskan cara spesifik untuk meningkatkan kualitas data. Peserta didik menganalisis validitas informasi dari sumber primer dan sekunder serta mengevaluasi pendekatan yang digunakan untuk menyelesaikan masalah dalam penyelidikan. Mengomunikasikan Hasil Peserta didik mengomunikasikan hasil penyelidikan secara sistematis dan utuh ditunjang dengan argumen ilmiah dan terbuka terhadap pendapat yang lebih relevan."
        },
        "capaianKeys": [
          "Pemahaman Kimia",
          "Keterampilan Proses"
        ]
      },
      "Fisika": {
        "name": "Fisika",
        "capaian": {
          "Pemahaman Fisika": "Peserta didik mampu memahami konsep gerak, yaitu hubungan gaya dan gerak serta pemanfaatannya untuk menjelaskan fenomena alam, desain, atau rekayasa struktur; penerapan hukum fluida dalam kehidupan sehari-hari; konsep kalor dan termodinamika serta penerapannya untuk menganalisis dampak perubahan iklim; gejala gelombang dan penerapannya dalam kehidupan sehari-hari; rangkaian listrik dan fenomena elektromagnetik; teori dasar fisika modern dan pengaruhnya terhadap perkembangan teknologi; serta teori dasar digital dan penggunaannya dalam kehidupan sehari-hari.",
          "Keterampilan Proses": "Mengamati Peserta didik mengamati fenomena ilmiah dan mencatat hasil pengamatannya dengan memperhatikan detail dari objek yang diamati untuk memunculkan pertanyaan yang akan diselidiki. Mempertanyakan dan Memprediksi Peserta didik merumuskan pertanyaan ilmiah dan hipotesis yang dapat diselidiki secara ilmiah. Merencanakan dan Melakukan Penyelidikan Peserta didik merencanakan dan memilih metode yang sesuai berdasarkan referensi untuk mengumpulkan data yang dapat dipercaya. Peserta didik memilih dan menggunakan alat dan bahan, termasuk penggunaan teknologi digital yang sesuai untuk mengumpulkan serta mencatat data secara sistematis dan akurat. Memproses, Menganalisis Data dan Informasi Peserta didik menafsirkan informasi yang didapatkan dengan jujur dan bertanggung jawab. Peserta didik menggunakan berbagai metode untuk menganalisis pola dan kecenderungan pada data. Peserta didik mendeskripsikan hubungan antar variabel serta mengidentifikasi inkonsistensi yang terjadi. Peserta didik menggunakan pengetahuan ilmiah untuk menarik kesimpulan yang konsisten dengan hasil penyelidikan. Mengevaluasi dan Refleksi Peserta didik mengidentifikasi sumber ketidakpastian dan kemungkinan penjelasan alternatif dalam rangka mengevaluasi kesimpulan, serta menjelaskan cara spesifik untuk meningkatkan kualitas data. Peserta didik menganalisis validitas informasi dari sumber primer dan sekunder dan mengevaluasi pendekatan yang digunakan untuk menyelesaikan masalah dalam penyelidikan. Mengomunikasikan Hasil Peserta didik mengomunikasikan hasil penyelidikan secara sistematis dan utuh ditunjang dengan argumen ilmiah dan terbuka terhadap pendapat yang lebih relevan."
        },
        "capaianKeys": [
          "Pemahaman Fisika",
          "Keterampilan Proses"
        ]
      },
      "Biologi": {
        "name": "Biologi",
        "capaian": {
          "Pemahaman Biologi": "Peserta didik memahami struktur sel; pembelahan sel; transpor pada membran; metabolisme dan sintesis protein; hukum Mendel dan pola hereditas; pertumbuhan dan perkembangan; teori evolusi dan mengaitkannya dengan biodiversitas di masa kini maupun pada masa lampau serta hubungannya dengan perubahan iklim; serta keterkaitan struktur organ pada sistem organ dengan fungsinya dalam merespons stimulus internal dan eksternal.",
          "Keterampilan Proses": "Mengamati Peserta didik mengamati fenomena ilmiah dan mencatat hasil pengamatannya dengan memperhatikan detail dari objek yang diamati untuk memunculkan pertanyaan yang akan diselidiki. Mempertanyakan dan Memprediksi Peserta didik merumuskan pertanyaan ilmiah dan hipotesis yang dapat diselidiki secara ilmiah. Merencanakan dan Melakukan Penyelidikan Peserta didik merencanakan dan memilih metode yang sesuai berdasarkan referensi untuk mengumpulkan data yang dapat dipercaya. Peserta didik memilih dan menggunakan alat dan bahan, termasuk penggunaan teknologi digital yang sesuai untuk mengumpulkan serta mencatat data secara sistematis dan akurat. Memproses, Menganalisis Data dan Informasi Peserta didik menafsirkan informasi yang diperoleh dengan jujur dan bertanggung jawab; menggunakan berbagai metode untuk menganalisis pola dan kecenderungan pada data; mendeskripsikan hubungan antar variabel dan mengidentifikasi inkonsistensi yang terjadi; serta menggunakan pengetahuan ilmiah untuk menarik kesimpulan yang konsisten dengan hasil penyelidikan. Mengevaluasi dan Refleksi Peserta didik mengidentifikasi sumber ketidakpastian dan kemungkinan penjelasan alternatif dalam rangka mengevaluasi simpulan, serta menjelaskan cara spesifik untuk meningkatkan kualitas data. Peserta didik menganalisis validitas informasi dari sumber primer dan sekunder serta mengevaluasi pendekatan yang digunakan untuk menyelesaikan masalah dalam penyelidikan. Mengomunikasikan Hasil Peserta didik mengomunikasikan hasil penyelidikan secara sistematis dan utuh ditunjang dengan argumen ilmiah dan terbuka terhadap pendapat yang lebih relevan."
        },
        "capaianKeys": [
          "Pemahaman Biologi",
          "Keterampilan Proses"
        ]
      },
      "Sosiologi": {
        "name": "Sosiologi",
        "capaian": {
          "Pemahaman Konsep": "Peserta didik mampu memahami berbagai permasalahan sosial, konflik, dan kekerasan yang terjadi di masyarakat. Peserta didik mampu secara kritis, analitis, dan kreatif memberikan pemecahan masalah sosial yang solutif terhadap dinamika kehidupan sosial di tengah masyarakat digital saat ini. Penerapan prinsip kesetaraan dalam perbedaan sosial digunakan untuk mewujudkan masyarakat multikultural yang harmonis dan integratif. Peserta didik juga mampu memahami terjadinya perubahan sosial pada kelompok atau komunitas di tengah arus globalisasi dan mampu memberikan solusi terhadap dampak globalisasi dan perkembangan teknologi digital. Peserta didik juga mampu merancang strategi, melakukan dan mengevaluasi kegiatan/projek pemberdayaan komunitas berbasis kearifan lokal.",
          "Keterampilan Proses": "Peserta didik mampu mengamati fenomena sosial di Indonesia dan/atau dunia, serta membuat pertanyaan untuk menggali informasi secara mendalam tentang fenomena sosial yang terjadi. Selain itu, peserta didik mampu mengumpulkan informasi dari sumber primer dan sekunder, melakukan observasi partisipatif dan mendokumentasikan, menganalisis dan menguji keabsahan data, serta menarik simpulan dari informasi yang diperoleh. Kemudian, peserta didik mengomunikasikannya dalam bentuk grafik, infografis, dan/atau tabel. Peserta didik mampu merefleksikan hasil informasi, hasil observasi dan hasil dokumentasi yang diperoleh untuk ekspektasi di masa depan, serta merencanakan penelitian sosial lanjutan pada masyarakat yang lebih luas."
        },
        "capaianKeys": [
          "Pemahaman Konsep",
          "Keterampilan Proses"
        ]
      },
      "Ekonomi": {
        "name": "Ekonomi",
        "capaian": {
          "Pemahaman Konsep": "Peserta didik memahami berbagai konsep dasar ekonomi. Peserta didik memahami peranan akuntansi sebagai alat bantu dalam pengambilan keputusan keuangan dan ekonomi. Peserta didik memahami berbagai permasalahan ekonomi dan keuangan yang terjadi di lingkungan sekitar serta memahami dampak dari permasalahan ekonomi dan keuangan yang sedang terjadi berdasarkan konsep yang sudah dipelajari. Konsep-konsep yang diharapkan dipahami peserta didik pada fase ini, yaitu pendapatan Pemahaman Konsep Peserta didik memahami berbagai konsep dasar ekonomi. Peserta didik memahami peranan akuntansi sebagai alat bantu dalam pengambilan keputusan keuangan dan ekonomi. Peserta didik memahami berbagai permasalahan ekonomi dan keuangan yang terjadi di lingkungan sekitar serta memahami dampak dari permasalahan ekonomi dan keuangan yang sedang terjadi berdasarkan konsep yang sudah dipelajari. Konsep-konsep yang diharapkan dipahami peserta didik pada fase ini, yaitu pendapatan nasional dan pertumbuhan ekonomi serta kaitannya dengan kemiskinan, kesenjangan ekonomi, serta solusi untuk mengatasinya; konsep ketenagakerjaan dan masalahnya serta solusi untuk mengatasinya; konsep uang dan peredaran uang serta kaitannya dengan inflasi dan kebijakan moneter; konsep akuntansi keuangan dasar dalam konteks menilai kondisi keuangan unit usaha (persamaan dasar akuntansi dan laporan keuangan); konsep kebijakan fiskal, fungsi anggaran negara dan daerah, dan perpajakan; konsep ekonomi internasional dan masalahnya; serta konsep literasi ekonomi dan keuangan digital.",
          "Keterampilan Proses": "Peserta didik mengamati kondisi dan masalah ekonomi di lingkungan sekitar, regional, atau nasional. Peserta didik mempertanyakan dan memprediksi faktor penyebab, kondisi, dan masalah ekonomi di lingkungan sekitar, regional, atau nasional. Peserta didik mengumpulkan informasi berkaitan dengan kondisi dan permasalahan ekonomi di lingkungan sekitar, regional, atau nasional. Peserta didik memvalidasi dan menganalisis informasi yang telah dikumpulkan terkait dengan faktor penyebab kondisi dan permasalahan ekonomi di lingkungan sekitar, regional, atau nasional. Peserta didik menarik kesimpulan terkait faktor penyebab dan memberikan solusi atas kondisi dan permasalahan ekonomi di lingkungan sekitar, regional, atau nasional. Peserta didik mengomunikasikan hasil pengamatan terkait penarikan kesimpulan atas kondisi dan permasalahan ekonomi serta solusi mengatasinya. Peserta didik merefleksikan solusi atas permasalahan ekonomi untuk kepentingan lingkungan sekitar. Peserta didik merencanakan projek lanjutan secara kolaboratif dalam rangka mengurangi permasalahan ekonomi di lingkungan sekitar."
        },
        "capaianKeys": [
          "Pemahaman Konsep",
          "Keterampilan Proses"
        ]
      },
      "Geografi": {
        "name": "Geografi",
        "capaian": {
          "Pemahaman Konsep": "Peserta didik mampu memahami secara keruangan tentang keuntungan posisi strategis wilayah Indonesia dan sumber daya alam; pola keanekaragaman hayati Indonesia dan dunia; kependudukan; lingkungan hidup, kebencanaan, serta perubahan iklim. Peserta didik memahami kewilayahan dan pembangunan serta kerja sama antar wilayah yang terjadi.",
          "Keterampilan Proses": "Peserta didik mampu mengamati fenomena geosfer di Indonesia dan/atau dunia, membuat pertanyaan untuk menggali informasi secara mendalam tentang fenomena geosfer fisik atau sosial. Selain itu, peserta didik mampu mengumpulkan informasi, melakukan observasi secara langsung atau studi literasi, mendokumentasikan, menganalisis dan menarik simpulan dari informasi yang diperoleh serta mengomunikasikannya dalam bentuk peta sederhana atau menggunakan aplikasi digital, grafik, infografis, dan/atau tabel. Peserta didik mampu merefleksikan informasi, hasil observasi, dan hasil dokumentasi yang diperoleh serta mengomunikasikannya ke media yang tersedia. Peserta didik merencanakan projek lanjutan secara kolaboratif dalam rangka meningkatkan pemahaman terhadap kerja sama antarwilayah di Indonesia."
        },
        "capaianKeys": [
          "Pemahaman Konsep",
          "Keterampilan Proses"
        ]
      }
    }
  }
};

export const curriculumLookup = {
  jenjang: Object.fromEntries(jenjangOptions.map((item) => [item.key, item])) as Record<JenjangKey, JenjangOption>,
  fase: Object.fromEntries(faseOptions.map((item) => [item.code, item])) as Record<FaseCode, FaseOption>,
  gradesByFase: Object.fromEntries(faseOptions.map((item) => [item.code, item.grades])) as Record<FaseCode, string[]>,
  subjectsByFase: Object.fromEntries(faseOptions.map((item) => [item.code, item.subjects])) as Record<FaseCode, string[]>,
};

export const getSubjectsByFase = (faseCode: FaseCode) => curriculumLookup.subjectsByFase[faseCode] ?? [];

export const getGradesByFase = (faseCode: FaseCode) => curriculumLookup.gradesByFase[faseCode] ?? [];

export const getSubjectsByJenjang = (jenjangKey: JenjangKey) => {
  const faseCodes = curriculumLookup.jenjang[jenjangKey]?.faseCodes ?? [];
  return Array.from(new Set(faseCodes.flatMap((faseCode) => getSubjectsByFase(faseCode)))).sort((a, b) => a.localeCompare(b, "id"));
};

export const getCapaianByFaseAndSubject = (faseCode: FaseCode, subjectName: string) => {
  return curriculumData[faseCode]?.subjects[subjectName]?.capaian ?? null;
};
