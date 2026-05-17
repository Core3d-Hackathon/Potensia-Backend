import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../constants/http-status";

export const getDashboardDataService = async (clerkUserId: string) => {
  const user = await prisma.user.findUnique({
    where: { clerk_id: clerkUserId },
    select: { id: true, points: true },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User tidak ditemukan");
  }

  const totalModules = await prisma.module.count({
    where: { author_id: user.id }, // HANYA menghitung jumlah modul milik user yang sedang login
  });

  const upvotesAggregate = await prisma.module.aggregate({
    where: { author_id: user.id },
    _sum: { upvote_count: true },
  });

  const recentModules = await prisma.module.findMany({
    where: { author_id: user.id }, // HANYA mengambil aktivitas/modul milik user sendiri
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      judul_modul: true,
      asal_sekolah: true,
      jenjang: true,
      fase_kelas: true,
      mapel: true,
      materi: true,
      kategori_wilayah: true,
      status: true,
      upvote_count: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    totalPoints: user.points,
    totalModules,
    totalUpvotes: upvotesAggregate._sum.upvote_count || 0,
    recentModules,
  };
};
