import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../constants/http-status";

type CreateModuleInput = {
  authorId: string;
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
    const module = await tx.module.create({
      data: {
        author_id: input.authorId,
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

    if (module.status === "PUBLISHED") {
      await tx.user.update({
        where: { id: input.authorId },
        data: { points: { increment: 50 } },
      });
    }

    return module;
  });
};

export const getModulesService = async () => {
  return prisma.module.findMany({
    orderBy: {
      createdAt: "desc",
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
};

export const publishModuleService = async (moduleId: string, authorId: string) => {
  const module = await prisma.module.findUnique({
    where: { id: moduleId },
  });

  if (!module) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module not found");
  }

  if (module.author_id !== authorId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You are not the author of this module");
  }

  if (module.status === "PUBLISHED") {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Module is already published");
  }

  return prisma.$transaction(async (tx) => {
    const updatedModule = await tx.module.update({
      where: { id: moduleId },
      data: { status: "PUBLISHED" },
      include: {
        author: { select: { id: true, name: true, email: true, image_url: true } },
      },
    });

    await tx.user.update({
      where: { id: authorId },
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