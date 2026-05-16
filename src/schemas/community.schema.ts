import { z } from "zod";

export const getCommunityModulesSchema = {
  query: z.object({
    search: z.string().optional(),
    jenjang: z.string().optional(),
    fase_kelas: z.string().optional(),
    mapel: z.string().optional(),
    materi: z.string().optional(),
    kategori_wilayah: z.string().optional(),
  }),
};

export const upvoteModuleSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
};