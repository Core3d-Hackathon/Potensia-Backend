import { z } from "zod";

const semesterLabelSchema = z.enum(["ganjil", "genap", "setahun"]);

const tujuanPembelajaranItemSchema = z.object({
  kode_tp: z.string(),
  deskripsi: z.string(),
  profil_pelajar_pancasila: z.array(z.string()),
  asesmen_awal_opsional: z.string(),
});

const aktivitasBagianSchema = z.object({
  waktu: z.string(),
  kegiatan_guru: z.array(z.string()),
  kegiatan_peserta_didik: z.array(z.string()),
  asesmen_formatif: z.array(z.string()).optional(),
  asesmen_sumatif: z.array(z.string()).optional(),
});

export const generatedDocumentSchema = z.object({
  dokumen: z.object({
    jenis: z.string(),
    versi_schema: z.string(),
    bahasa: z.string(),
    dibuat_pada: z.string(),
    sumber_format: z.object({
      atp: z.string(),
      modul_ajar: z.string(),
    }),
  }),
  identitas: z.object({
    satuan_pendidikan: z.string(),
    kelas: z.string(),
    fase: z.string(),
    semester_opsi: z.array(semesterLabelSchema),
    tahun_ajaran: z.string(),
    penyusun: z.string(),
    mata_pelajaran: z.array(z.string()),
    tema: z.string(),
    topik: z.string(),
    nama_projek: z.string(),
    lingkup: z.string(),
    lintas_disiplin: z.boolean(),
    disiplin_terkait: z.array(z.string()),
    alokasi_waktu_total_jp: z.number(),
    jumlah_pertemuan: z.number(),
    profil_target: z.array(z.string()),
    lokasi: z.string(),
    tanggal_penyusunan: z.string(),
    kepala_sekolah: z.object({
      nama: z.string(),
      nip_opsional: z.string(),
      jabatan: z.string(),
    }),
    guru_penyusun: z.object({
      nama: z.string(),
      nip_opsional: z.string(),
      jabatan: z.string(),
    }),
  }),
  atp: z.object({
    judul: z.string(),
    capaian_pembelajaran_fase: z.string(),
    deskripsi_umum: z.string(),
    semester: z.array(
      z.object({
        nama_semester: z.string(),
        label: semesterLabelSchema,
        items: z.array(
          z.object({
            no: z.number(),
            elemen: z.string(),
            bab_opsional: z.string(),
            capaian_pembelajaran_per_elemen: z.string(),
            materi_pokok: z.string(),
            tujuan_pembelajaran: z.array(tujuanPembelajaranItemSchema),
            alokasi_waktu_jp: z.number(),
            estimasi_pertemuan: z.number(),
            catatan_opsional: z.string(),
          }),
        ),
      }),
    ),
    rekap: z.object({
      total_jp: z.number(),
      total_tp: z.number(),
      catatan: z.string(),
    }),
    pengesahan: z.object({
      tempat: z.string(),
      tanggal: z.string(),
      mengetahui: z.boolean(),
      ttd_kepala_sekolah: z.boolean(),
      ttd_guru: z.boolean(),
    }),
  }),
  modul_ajar: z.object({
    judul_modul: z.string(),
    kata_pengantar: z.string(),
    rasional: z.string(),
    tujuan_umum: z.array(z.string()),
    target_pencapaian: z.array(z.string()),
    alur_projek: z.object({
      nama_tahap: z.array(z.string()),
      deskripsi_tahap: z.array(
        z.object({
          tahap: z.string(),
          deskripsi: z.string(),
          fokus_asesmen: z.string(),
        }),
      ),
    }),
    rancangan_aktivitas_projek: z.array(
      z.object({
        no: z.number(),
        tahap: z.string(),
        nama_aktivitas: z.string(),
        deskripsi_kegiatan: z.string(),
        asesmen: z.object({
          jenis: z.string(),
          metode: z.string(),
          bentuk: z.string(),
          fokus_bernalar_kritis: z.string(),
          fokus_kemandirian: z.string(),
        }),
      }),
    ),
    tahapan_perkembangan_kompetensi: z.object({
      profil_dikembangkan: z.array(z.string()),
      level: z.array(z.string()),
      indikator: z.object({
        bernalar_kritis: z.array(
          z.object({
            level: z.string(),
            deskripsi: z.string(),
          }),
        ),
        mandiri: z.array(
          z.object({
            level: z.string(),
            deskripsi: z.string(),
          }),
        ),
      }),
      cara_penggunaan_untuk_guru: z.array(z.string()),
    }),
    aktivitas_detail: z.array(
      z.object({
        nomor: z.number(),
        nama_projek: z.string(),
        nama_aktivitas: z.string(),
        alokasi_waktu: z.object({
          jp: z.number(),
          pertemuan: z.number(),
          durasi_naratif: z.string(),
        }),
        profil_target: z.array(z.string()),
        kelas: z.string(),
        disiplin_ilmu_terkait: z.array(z.string()),
        tujuan_pembelajaran: z.array(z.string()),
        praktik_pedagogis: z.array(z.string()),
        lingkungan_pembelajaran: z.string(),
        pemanfaatan_digital: z.object({
          alat: z.array(z.string()),
          kegiatan: z.array(z.string()),
          platform: z.array(z.string()),
        }),
        kemitraan_pembelajaran: z.object({
          internal: z.array(z.string()),
          eksternal: z.array(z.string()),
        }),
        kegiatan_pembelajaran: z.object({
          pembukaan: aktivitasBagianSchema,
          inti: aktivitasBagianSchema,
          penutup: aktivitasBagianSchema,
        }),
        tabel_asesmen_sumatif: z.object({
          judul: z.string(),
          kolom: z.array(z.string()),
          baris_template: z.array(z.string()),
          kriteria: z.object({
            SB: z.string(),
            BSH: z.string(),
            MB: z.string(),
            BB: z.string(),
          }),
        }),
        lampiran_lkpd: z.object({
          judul: z.string(),
          nama_kelompok_opsional: z.boolean(),
          anggota: z.boolean(),
          hari_tanggal: z.boolean(),
          petunjuk: z.string(),
          bagian: z.array(
            z.object({
              judul: z.string(),
              jenis: z.string(),
              isi_template: z.record(z.string(), z.unknown()),
            }),
          ),
          refleksi_individu: z.array(z.string()),
          kriteria_peran: z.array(z.string()),
        }),
      }),
    ),
    refleksi_akhir: z.object({
      untuk_siswa: z.array(z.string()),
      untuk_guru: z.array(z.string()),
      komitmen_tindak_lanjut: z.array(z.string()),
    }),
    lampiran_opsional: z.object({
      media_pendukung: z.array(z.string()),
      contoh_produk: z.array(z.string()),
      lembar_peer_assessment: z.array(z.string()),
      jurnal_refleksi: z.array(z.string()),
      daftar_bahan_alat: z.array(z.string()),
    }),
    pengesahan: z.object({
      tempat: z.string(),
      tanggal: z.string(),
      kepala_sekolah: z.string(),
      guru_penyusun: z.string(),
    }),
  }),
});

export type GeneratedDocumentOutput = z.infer<typeof generatedDocumentSchema>;