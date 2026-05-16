import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { ApiError } from "../utils/api-error";
import { sendSuccess } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";
import {
  createModuleService,
  getModuleByIdService,
  getModulesService,
  publishModuleService,
} from "../services/modules.service";
import { generateModuleDraft } from "../services/generate.service";
import { prisma } from "../lib/prisma";

const getRequiredParam = (value: string | string[] | undefined, paramName: string): string => {
  if (!value) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, `Route param '${paramName}' is required`);
  }

  if (Array.isArray(value)) {
    const firstValue = value[0];

    if (!firstValue) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, `Route param '${paramName}' is required`);
    }

    return firstValue;
  }

  return value;
};

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

export const getModuleById = async (req: Request, res: Response) => {
  const moduleId = getRequiredParam(req.params.id, "id");
  const module = await getModuleByIdService(moduleId);

  if (!module) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module not found");
  }

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Module fetched successfully",
    data: module,
    meta: buildResponseMeta(req),
  });
};

export const publishModule = async (req: Request, res: Response) => {
  if (!req.auth?.clerkUserId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerk_id: req.auth.clerkUserId },
  });

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Authenticated user not found");
  }

  const moduleId = getRequiredParam(req.params.id, "id");
  const module = await publishModuleService(moduleId, user.id);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Module published successfully",
    data: module,
    meta: buildResponseMeta(req),
  });
};

export const generateModule = async (req: Request, res: Response) => {
  const draft = await generateModuleDraft(req.body);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Module draft generated successfully",
    data: draft,
    meta: buildResponseMeta(req),
  });
};
