import { z } from "zod";

const optionalQueryString = z.preprocess((value) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }

  return value;
}, z.string().optional());

export const getCommunityModulesSchema = {
  query: z.object({
    search: optionalQueryString,
    jenjang: optionalQueryString,
    fase_kelas: optionalQueryString,
    mapel: optionalQueryString,
    materi: optionalQueryString,
    kategori_wilayah: optionalQueryString,
    sortBy: z.preprocess((value) => {
      if (Array.isArray(value)) {
        return value[0];
      }

      if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed === "" ? undefined : trimmed;
      }

      return value;
    }, z.enum(["random", "popular", "newest"]).optional()),
    limit: z.preprocess((value) => {
      if (Array.isArray(value)) {
        return value[0];
      }

      if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed === "" ? undefined : trimmed;
      }

      return value;
    }, z.string().optional()),
  }),
};

export const upvoteModuleSchema = {
  params: z.object({
    id: z.string().uuid(),
  }),
};
