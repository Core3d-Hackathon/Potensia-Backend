import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../constants/http-status";

type GetCommunityModulesQuery = {
  search?: string;
  jenjang?: string;
  fase_kelas?: string;
  mapel?: string;
  materi?: string;
  kategori_wilayah?: string;
  sortBy?: string;
  limit?: string;
};

export const getCommunityModulesService = async (query: GetCommunityModulesQuery) => {
  const {
    search,
    jenjang,
    fase_kelas,
    mapel,
    materi,
    kategori_wilayah,
    sortBy,
    limit,
  } = query;

  // 🌟 MANUAL PARSING: Mencegah Zod Crash 🌟
  let parsedSortBy = "random";
  if (sortBy === "popular" || sortBy === "newest") {
    parsedSortBy = sortBy;
  }

  let parsedLimit = 50;
  if (limit) {
    const num = parseInt(limit, 10);
    if (!isNaN(num) && num > 0) parsedLimit = Math.min(num, 100);
  }

  const where: any = {
    status: "PUBLISHED", // Hanya tampilkan modul yang publik untuk komunitas
  };

  if (search) {
    where.OR = [
      { judul_modul: { contains: search, mode: "insensitive" } },
      { mapel: { contains: search, mode: "insensitive" } },
      { materi: { contains: search, mode: "insensitive" } },
    ];
  }

  if (jenjang) where.jenjang = jenjang;
  if (fase_kelas) where.fase_kelas = fase_kelas;
  if (mapel) where.mapel = mapel;
  if (materi) where.materi = materi;
  if (kategori_wilayah) where.kategori_wilayah = kategori_wilayah;

  let orderBy: any = undefined;
  if (parsedSortBy === "popular") {
    orderBy = { upvote_count: "desc" };
  } else if (parsedSortBy === "newest") {
    orderBy = { createdAt: "desc" };
  }

  const modules = await prisma.module.findMany({
    where,
    orderBy,
    take: parsedLimit,
    select: {
      id: true,
      judul_modul: true,
      jenjang: true,
      fase_kelas: true,
      mapel: true,
      materi: true,
      kategori_wilayah: true,
      upvote_count: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: { id: true, name: true, email: true, image_url: true },
      },
    },
  });

  if (parsedSortBy === "random") {
    // Acak urutan array (Fisher-Yates Shuffle) jika mode pencariannya random
    for (let i = modules.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = modules[i]!;
      modules[i] = modules[j]!;
      modules[j] = temp;
    }
  }

  return modules;
};

export const toggleUpvoteService = async (moduleId: string, clerkUserId: string) => {
  const user = await prisma.user.findUnique({
    where: { clerk_id: clerkUserId },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Authenticated user not found in database");
  }

  const module = await prisma.module.findUnique({
    where: { id: moduleId },
  });

  if (!module) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module not found");
  }

  if (module.status !== "PUBLISHED") {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Hanya module yang sudah dipublish yang dapat di-upvote");
  }

  const existingUpvote = await prisma.userUpvote.findUnique({
    where: {
      user_id_module_id: {
        user_id: user.id,
        module_id: module.id,
      },
    },
  });

  if (existingUpvote) {
    // Hapus upvote (toggle off) & kurangi poin
    await prisma.$transaction([
      prisma.userUpvote.delete({
        where: { user_id_module_id: { user_id: user.id, module_id: module.id } },
      }),
      prisma.module.update({
        where: { id: module.id },
        data: { upvote_count: { decrement: 1 } },
      }),
      prisma.user.update({
        where: { id: module.author_id },
        data: { points: { decrement: 10 } },
      }),
    ]);

    return { upvoted: false };
  } else {
    // Tambahkan upvote (toggle on) & berikan 10 poin
    await prisma.$transaction([
      prisma.userUpvote.create({
        data: { user_id: user.id, module_id: module.id },
      }),
      prisma.module.update({
        where: { id: module.id },
        data: { upvote_count: { increment: 1 } },
      }),
      prisma.user.update({
        where: { id: module.author_id },
        data: { points: { increment: 10 } },
      }),
    ]);

    return { upvoted: true };
  }
};