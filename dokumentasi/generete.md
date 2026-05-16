Langkah 1: Pembuatan Tujuan Pembelajaran (TP)
Menerima parameter dasar sekolah dan menghasilkan kumpulan TP.

Endpoint: POST /api/v1/modules/generate/tp

Contoh Payload Request:

JSON
{
  "jenjang": "SD",
  "fase_kelas": "C",
  "mapel": "IPAS",
  "materi": "Ekosistem Pesisir",
  "alokasi_waktu": "4 JP",
  "isu_lokal": "Abrasi di Pantai Padang",
  "kearifan_lokal": "Tradisi nelayan pukat"
}
Struktur Response:

JSON
{
  "success": true,
  "message": "Tujuan Pembelajaran generated successfully",
  "data": {
    "tujuan_pembelajaran": [
      {
        "kode_tp": "TP.1",
        "kategori": "Kognitif",
        "konteks": "Ekosistem Pantai",
        "deskripsi": "Siswa mampu mengidentifikasi komponen biotik dan abiotik di pesisir pantai."
      }
    ]
  }
}
3.2. Langkah 2: Pembuatan Alur Pertemuan (ATP)
Menerima data TP yang telah dikurasi oleh guru untuk didistribusikan ke jadwal pertemuan.

Endpoint: POST /api/v1/modules/generate/atp

Contoh Payload Request:

JSON
{
  "alokasi_waktu": "4 JP",
  "jumlah_pertemuan": 2,
  "tujuan_pembelajaran_terpilih": [
    { "kode_tp": "TP.1", "deskripsi": "Siswa mampu mengidentifikasi komponen biotik..." }
  ]
}
Struktur Response:

JSON
{
  "success": true,
  "message": "Alur Tujuan Pembelajaran generated successfully",
  "data": {
    "total_pertemuan": 2,
    "alur_pertemuan": [
      {
        "pertemuan_ke": 1,
        "alokasi_jp": 2,
        "materi_pokok": "Komponen Ekosistem Pesisir",
        "tujuan_pembelajaran": ["Siswa mampu mengidentifikasi komponen biotik..."]
      }
    ]
  }
}
3.3. Langkah 3: Pembuatan Rencana Modul Ajar Sempurna
Tahap akhir penyusunan rincian sintaks pedagogis, instrumen penilaian, dan materi lampiran.

Endpoint: POST /api/v1/modules/generate/modul

Contoh Payload Request:

JSON
{
  "model_pembelajaran": "Project Based Learning",
  "satuan_pendidikan": "SDN Pesisir 01",
  "alur_pertemuan": [
    {
      "pertemuan_ke": 1,
      "alokasi_jp": 2,
      "materi_pokok": "Komponen Pesisir",
      "tujuan_pembelajaran": ["Siswa mampu mengidentifikasi..."]
    }
  ]
}
Struktur Response:

JSON
{
  "success": true,
  "message": "Modul Ajar generated successfully",
  "data": {
    "identitas_modul": { "satuan_pendidikan": "SDN Pesisir 01", "alokasi_waktu": "4 JP" },
    "langkah_pembelajaran": [
      {
        "pertemuan_ke": 1,
        "kegiatan_awal": ["15 Menit: Apersepsi kondisi pantai..."],
        "kegiatan_inti": ["50 Menit: Pembentukan kelompok observasi..."],
        "kegiatan_penutup": ["15 Menit: Refleksi dan penarikan kesimpulan."]
      }
    ],
    "asesmen": { "formatif": ["Lembar observasi lapangan"], "rubrik": [] },
    "lampiran_lkpd": ["Instruksi pengerjaan bagan ekosistem."]
  }
}