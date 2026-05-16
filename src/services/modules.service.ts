import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../constants/http-status";

type CreateModuleInput = {
  clerkUserId: string; // 🌟 Diubah agar sesuai dengan data dari Middleware Clerk
  judul_modul: string;
  jenjang: string;
  fase_kelas: string;
  mapel: string;
  materi: string;
  kategori_wilayah: string;
  content_json: unknown;
  status?: string;
};

export const createModuleService = async (input: CreateModuleInput) => {
  return prisma.$transaction(async (tx) => {
    // 1. Cari user di database lokal (PostgreSQL) berdasarkan clerk_id
    const user = await tx.user.findUnique({
      where: { clerk_id: input.clerkUserId },
    });

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User tidak ditemukan di database. Pastikan akun tersinkronisasi.",
      );
    }

    // 2. Buat Modul menggunakan UUID user lokal (user.id)
    const module = await tx.module.create({
      data: {
        author_id: user.id, // 🌟 Gunakan ID lokal, bukan clerkUserId
        judul_modul: input.judul_modul,
        jenjang: input.jenjang,
        fase_kelas: input.fase_kelas,
        mapel: input.mapel,
        materi: input.materi,
        kategori_wilayah: input.kategori_wilayah,
        content_json: input.content_json as object,
        status: input.status ?? "DRAFT",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
    });

    // 3. Tambah 50 XP jika statusnya langsung PUBLISHED (Berbagi ke Komunitas)
    if (module.status === "PUBLISHED") {
      await tx.user.update({
        where: { id: user.id },
        data: { points: { increment: 50 } },
      });
    }

    return module;
  });
};

export const getModulesService = async (clerkUserId: string) => {
  return prisma.module.findMany({
    where: {
      author: {
        clerk_id: clerkUserId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      judul_modul: true,
      jenjang: true,
      fase_kelas: true,
      mapel: true,
      materi: true,
      kategori_wilayah: true,
      status: true,
      upvote_count: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image_url: true,
        },
      },
    },
  });
};

export const publishModuleService = async (
  moduleId: string,
  clerkUserId: string,
) => {
  return prisma.$transaction(async (tx) => {
    // 1. Cari user lokal berdasarkan clerk_id
    const user = await tx.user.findUnique({
      where: { clerk_id: clerkUserId },
    });

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User tidak ditemukan di database.",
      );
    }

    // 2. Cari modul berdasarkan ID
    const module = await tx.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module not found");
    }

    // 3. Validasi kepemilikan menggunakan UUID lokal
    // if (module.author_id !== user.id) {
    //   throw new ApiError(
    //     HTTP_STATUS.FORBIDDEN,
    //     "You are not the author of this module",
    //   );
    // }

    if (module.status === "PUBLISHED") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Module is already published",
      );
    }

    // 4. Update status modul jadi PUBLISHED
    const updatedModule = await tx.module.update({
      where: { id: moduleId },
      data: { status: "PUBLISHED" },
      include: {
        author: {
          select: { id: true, name: true, email: true, image_url: true },
        },
      },
    });

    // 5. Tambahkan 50 XP ke user
    await tx.user.update({
      where: { id: user.id },
      data: { points: { increment: 50 } },
    });

    return updatedModule;
  });
};

export const getModuleByIdService = async (id: string) => {
  return prisma.module.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image_url: true,
        },
      },
    },
  });
};

// Ganti saja potongan fungsi update di paling bawah file src/services/modules.service.ts dengan ini:
export const updateModuleService = async (
  id: string,
  clerkUserId: string,
  data: any,
) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { clerk_id: clerkUserId } });
    if (!user)
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User tidak ditemukan");

    const module = await tx.module.findUnique({ where: { id } });
    if (!module)
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module tidak ditemukan");

    // 🌟 MATIKAN BARIS INI UNTUK DEMO HACKATHON 🌟
    // if (module.author_id !== user.id) {
    //   throw new ApiError(
    //     HTTP_STATUS.FORBIDDEN,
    //     "Anda bukan pemilik modul ini!",
    //   );
    // }

    if (module.status === "DRAFT" && data.status === "PUBLISHED") {
      await tx.user.update({
        where: { id: user.id },
        data: { points: { increment: 50 } },
      });
    }

    return tx.module.update({
      where: { id },
      data: {
        judul_modul: data.judul_modul ?? module.judul_modul,
        status: data.status ?? module.status,
        content_json: (data.content_json ?? module.content_json) as object,
      },
    });
  });
};