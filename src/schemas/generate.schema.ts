import { z } from "zod";

export const generateModuleSchema = {
  body: z.object({
    jenjang: z.string().min(1),
    fase_kelas: z.string().min(1),
    mapel: z.string().min(1),
    materi: z.string().min(1),
    tema: z.string().default(""),
    topik: z.string().default(""),
    nama_projek: z.string().default(""),
    kategori_wilayah: z.string().default(""),
    kearifan_lokal: z.string().default(""),
    isu_lokal: z.string().default(""),
    fasilitas: z.array(z.string()).default([]),
    gaya_belajar: z.array(z.string()).default([]),
    latar_belakang_siswa: z.string().default(""),
    model_pembelajaran: z.string().default(""),
    jenis_asesmen: z.array(z.string()).default([]),
    alokasi_waktu: z.string().min(1),
    tahun_ajaran: z.string().default(""),
    penyusun: z.string().default(""),
    satuan_pendidikan: z.string().default(""),
    lokasi: z.string().default(""),
    lingkup: z.enum(["intrakurikuler", "kokurikuler", "projek", "modul_ajar"]).default("modul_ajar"),
    profil_target: z.array(z.string()).default(["Bernalar Kritis", "Mandiri"]),
    jumlah_aktivitas: z.number().min(1).max(12).default(6),
    jumlah_pertemuan: z.number().min(1).max(50).default(6),
    output_akhir: z.string().default("produk pembelajaran"),
    karakter_peserta_didik: z.string().default(""),
    fasilitas_digital: z.array(z.string()).default([]),
    kemitraan_tersedia: z.array(z.string()).default([]),
    kepala_sekolah: z.string().default(""),
  }),
};

export type GenerateModuleInput = z.infer<typeof generateModuleSchema.body>;