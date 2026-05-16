import { z } from "zod";

export const getCommunityModulesSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    jenjang: z.string().optional(),
    fase_kelas: z.string().optional(),
    mapel: z.string().optional(),
    materi: z.string().optional(),
    kategori_wilayah: z.string().optional(),
    sortBy: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const upvoteModuleSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});