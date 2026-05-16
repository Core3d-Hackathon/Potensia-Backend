import { z } from "zod";

// ==========================================
// 1. BASE SCHEMA (Input Step 1: Informasi Umum)
// ==========================================
export const baseGenerateSchema = z.object({
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
});

// ==========================================
// 2. SCHEMA PROGRESSIVE ENDPOINTS
// ==========================================

// Step 1 -> 2: Request Generate TP
export const generateTpSchema = {
  body: baseGenerateSchema,
};

// Step 2 -> 3: Request Generate ATP (Bawa TP dari user)
export const generateAtpSchema = {
  body: baseGenerateSchema.extend({
    tujuan_pembelajaran_terpilih: z.array(
      z.object({
        kode_tp: z.string(),
        kategori: z.string().optional(),
        konteks: z.string().optional(),
        deskripsi: z.string(),
      })
    ).min(1, "Minimal pilih 1 Tujuan Pembelajaran"),
  }),
};

// Step 3 -> 4: Request Generate Modul Ajar (Bawa ATP final)
export const generateModulAjarSchema = {
  body: baseGenerateSchema.extend({
    alur_pertemuan: z.array(
      z.object({
        pertemuan_ke: z.number(),
        alokasi_jp: z.number(),
        materi_pokok: z.string(),
        tujuan_pembelajaran: z.array(z.string()),
      })
    ).min(1, "Minimal buat 1 pertemuan"),
  }),
};

export type GenerateTpInput = z.infer<typeof generateTpSchema.body>;
export type GenerateAtpInput = z.infer<typeof generateAtpSchema.body>;
export type GenerateModulAjarInput = z.infer<typeof generateModulAjarSchema.body>;