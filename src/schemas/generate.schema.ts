import { z } from "zod";

export const generateModuleSchema = z.object({
  jenjang: z.string().min(1),
  fase_kelas: z.string().min(1),
  mapel: z.string().min(1),
  materi: z.string().min(1),
  kategori_wilayah: z.string().min(1),
  kearifan_lokal: z.string().min(1),
  isu_lokal: z.string().min(1),
  fasilitas: z.array(z.string()).default([]),
  gaya_belajar: z.array(z.string()).default([]),
  latar_belakang_siswa: z.string().min(1),
  model_pembelajaran: z.string().min(1),
  jenis_asesmen: z.array(z.string()).default([]),
  alokasi_waktu: z.string().min(1),
});

export type GenerateModuleInput = z.infer<typeof generateModuleSchema>;