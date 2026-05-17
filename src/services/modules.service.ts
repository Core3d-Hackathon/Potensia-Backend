import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../constants/http-status";

type CreateModuleInput = {
  clerkUserId: string;
  judul_modul: string;
  asal_sekolah?: string;
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
    const user = await tx.user.findUnique({
      where: { clerk_id: input.clerkUserId },
    });

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User tidak ditemukan di database. Pastikan akun tersinkronisasi.",
      );
    }

    const module = await tx.module.create({
      data: {
        author_id: user.id,
        judul_modul: input.judul_modul,
        jenjang: input.jenjang,
        fase_kelas: input.fase_kelas,
        mapel: input.mapel,
        materi: input.materi,
        kategori_wilayah: input.kategori_wilayah,
        content_json: input.content_json as object,
        status: input.status ?? "DRAFT",
        ...(input.asal_sekolah !== undefined
          ? { asal_sekolah: input.asal_sekolah }
          : {}),
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
    const user = await tx.user.findUnique({
      where: { clerk_id: clerkUserId },
    });

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User tidak ditemukan di database.",
      );
    }

    const module = await tx.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module not found");
    }

    if (module.status === "PUBLISHED") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Module is already published",
      );
    }

    const updatedModule = await tx.module.update({
      where: { id: moduleId },
      data: { status: "PUBLISHED" },
      include: {
        author: {
          select: { id: true, name: true, email: true, image_url: true },
        },
      },
    });

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

export const updateModuleService = async (
  id: string,
  clerkUserId: string,
  data: any,
) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { clerk_id: clerkUserId } });
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User tidak ditemukan");
    }

    const module = await tx.module.findUnique({ where: { id } });
    if (!module) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module tidak ditemukan");
    }

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
        ...(data.asal_sekolah !== undefined
          ? { asal_sekolah: data.asal_sekolah }
          : {}),
      },
    });
  });
};
