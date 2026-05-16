import { prisma } from "../lib/prisma";

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
  return prisma.module.create({
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