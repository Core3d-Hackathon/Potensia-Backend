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
  updateModuleService, // 🌟 FIX: Fungsinya sekarang resmi di-import di sini!
} from "../services/modules.service";
import {
  generateTPDraft,
  generateATPDraft,
  generateModulDraft,
} from "../services/generate.service";

const getRequiredParam = (
  value: string | string[] | undefined,
  paramName: string,
): string => {
  if (!value) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Route param '${paramName}' is required`,
    );
  }

  if (Array.isArray(value)) {
    const firstValue = value[0];

    if (!firstValue) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `Route param '${paramName}' is required`,
      );
    }

    return firstValue;
  }

  return value;
};

export const generateTP = async (req: Request, res: Response) => {
  const draft = await generateTPDraft(req.body);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "TP generated successfully",
    data: draft,
    meta: buildResponseMeta(req),
  });
};

export const generateATP = async (req: Request, res: Response) => {
  const draft = await generateATPDraft(req.body);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "ATP generated successfully",
    data: draft,
    meta: buildResponseMeta(req),
  });
};

export const generateModul = async (req: Request, res: Response) => {
  const draft = await generateModulDraft(req.body);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Modul Ajar generated successfully",
    data: draft,
    meta: buildResponseMeta(req),
  });
};

// ==========================================
// DATABASE HANDLERS
// ==========================================
export const createModule = async (req: Request, res: Response) => {
  const clerkUserId = req.auth?.clerkUserId;
  if (!clerkUserId)
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");

  const module = await createModuleService({
    clerkUserId: clerkUserId,
    judul_modul: req.body.judul_modul,
    asal_sekolah: req.body.asal_sekolah,
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
    message: "Module saved successfully",
    data: module,
    meta: buildResponseMeta(req),
  });
};

export const getModules = async (req: Request, res: Response) => {
  const modules = await getModulesService();
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Modules fetched",
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
  const clerkUserId = req.auth?.clerkUserId;
  if (!clerkUserId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const moduleId = getRequiredParam(req.params.id, "id");
  const module = await publishModuleService(moduleId, clerkUserId);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Module published successfully",
    data: module,
    meta: buildResponseMeta(req),
  });
};

export const updateModule = async (req: Request, res: Response) => {
  const clerkUserId = req.auth?.clerkUserId;
  if (!clerkUserId)
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");

  const moduleId = getRequiredParam(req.params.id, "id");

  // Sekarang pemanggilan fungsi service ini dijamin aman dan terdeteksi
  const updatedModule = await updateModuleService(
    moduleId,
    clerkUserId,
    req.body,
  );

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Module updated successfully",
    data: updatedModule,
    meta: buildResponseMeta(req),
  });
};
