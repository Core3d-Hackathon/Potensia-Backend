import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { ApiError } from "../utils/api-error";
import { sendSuccess } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";
import { createModuleService, getModulesService } from "../services/modules.service";
import { prisma } from "../lib/prisma";

export const createModule = async (req: Request, res: Response) => {
  if (!req.auth?.clerkUserId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerk_id: req.auth.clerkUserId,
    },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Authenticated user not found");
  }

  const module = await createModuleService({
    authorId: user.id,
    judul_modul: req.body.judul_modul,
    jenjang: req.body.jenjang,
    fase_kelas: req.body.fase_kelas,
    mapel: req.body.mapel,
    materi: req.body.materi,
    kategori_wilayah: req.body.kategori_wilayah,
    content_json: req.body.content_json ?? {},
    status: req.body.status ?? "DRAFT",
  });

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.CREATED,
    message: "Module created successfully",
    data: module,
    meta: buildResponseMeta(req),
  });
};

export const getModules = async (req: Request, res: Response) => {
  const modules = await getModulesService();

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Modules fetched successfully",
    data: modules,
    meta: buildResponseMeta(req),
  });
};