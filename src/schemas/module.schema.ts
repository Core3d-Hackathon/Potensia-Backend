import { z } from "zod";

export const createModuleSchema = {
  body: z.object({
    judul_modul: z.string().min(3),
    jenjang: z.string().min(2),
    fase_kelas: z.string().min(2),
    mapel: z.string().min(2),
    materi: z.string().min(2),
    kategori_wilayah: z.string().min(2),
    content_json: z.record(z.string(), z.any()).optional().default({}),
    status: z.enum(["DRAFT", "PRIVATE", "PUBLISHED"]).optional().default("DRAFT"),
  }),
};

export const moduleIdParamSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
};