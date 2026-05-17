import { z } from "zod";

export const createModuleSchema = {
  body: z.object({
    judul_modul: z.string().min(3),
    asal_sekolah: z.string().optional(),
    jenjang: z.string().min(1),
    fase_kelas: z.string().min(1),
    mapel: z.string().min(1),
    materi: z.string().min(1),
    kategori_wilayah: z.string().min(1),

    // Lebih aman untuk JSON hasil AI yang nested/fleksibel
    content_json: z.any().optional().default({}),

    // Hapus PRIVATE supaya alur status konsisten
    status: z.enum(["DRAFT", "PUBLISHED"]).optional().default("DRAFT"),
  }),
};

export const moduleIdParamSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
};

// Tambahkan di paling bawah file src/schemas/module.schema.ts
export const updateModuleSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    judul_modul: z.string().min(3).optional(),
    asal_sekolah: z.string().optional(),
    status: z.enum(["DRAFT", "PRIVATE", "PUBLISHED"]).optional(),
    content_json: z.record(z.string(), z.any()).optional(),
  }),
};
