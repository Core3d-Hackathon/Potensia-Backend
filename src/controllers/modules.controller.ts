import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { ApiError } from "../utils/api-error";
import { sendSuccess } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";
import { createModuleService, getModuleByIdService, getModulesService } from "../services/modules.service";
import { generateTPDraft, generateATPDraft, generateModulDraft } from "../services/generate.service";
import { prisma } from "../lib/prisma";

// ==========================================
// AI GENERATOR HANDLERS
// ==========================================
export const generateTP = async (req: Request, res: Response) => {
  const draft = await generateTPDraft(req.body);
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: "TP generated successfully", data: draft, meta: buildResponseMeta(req) });
};

export const generateATP = async (req: Request, res: Response) => {
  const draft = await generateATPDraft(req.body);
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: "ATP generated successfully", data: draft, meta: buildResponseMeta(req) });
};

export const generateModul = async (req: Request, res: Response) => {
  const draft = await generateModulDraft(req.body);
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: "Modul Ajar generated successfully", data: draft, meta: buildResponseMeta(req) });
};

// ==========================================
// DATABASE HANDLERS
// ==========================================
export const createModule = async (req: Request, res: Response) => {
  if (!req.auth?.clerkUserId) throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  const user = await prisma.user.findUnique({ where: { clerk_id: req.auth.clerkUserId } });
  if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, "Authenticated user not found");

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

  return sendSuccess(res, { statusCode: HTTP_STATUS.CREATED, message: "Module saved", data: module, meta: buildResponseMeta(req) });
};

export const getModules = async (req: Request, res: Response) => {
  const modules = await getModulesService();
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: "Modules fetched", data: modules, meta: buildResponseMeta(req) });
};

export const getModuleById = async (req: Request, res: Response) => {
  const module = await getModuleByIdService(req.params.id);
  if (!module) throw new ApiError(HTTP_STATUS.NOT_FOUND, "Module not found");
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: "Module fetched", data: module, meta: buildResponseMeta(req) });
};