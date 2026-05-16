import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";
import {
  createModule,
  getModuleById,
  getModules,
  publishModule,
  generateTP,
  generateATP,
  generateModul,
  updateModule, // 🌟 1. TAMBAHKAN IMPORT INI
} from "../controllers/modules.controller";
import { validateRequest } from "../middleware/validate-request";
import {
  createModuleSchema,
  moduleIdParamSchema,
  updateModuleSchema, // 🌟 2. TAMBAHKAN IMPORT INI
} from "../schemas/module.schema";
import {
  generateTpSchema,
  generateAtpSchema,
  generateModulAjarSchema,
} from "../schemas/generate.schema";

const modulesRouter = Router();

// CRUD Database
modulesRouter.get("/", asyncHandler(getModules));
modulesRouter.post(
  "/",
  authenticate,
  validateRequest(createModuleSchema),
  asyncHandler(createModule),
);

// Endpoint AI Generator
modulesRouter.post(
  "/generate/tp",
  validateRequest(generateTpSchema),
  asyncHandler(generateTP),
);

modulesRouter.post(
  "/generate/atp",
  validateRequest(generateAtpSchema),
  asyncHandler(generateATP),
);

modulesRouter.post(
  "/generate/modul",
  validateRequest(generateModulAjarSchema),
  asyncHandler(generateModul),
);

// Publish endpoint terpisah
modulesRouter.post(
  "/:id/publish",
  authenticate,
  validateRequest(moduleIdParamSchema),
  asyncHandler(publishModule),
);

// 🌟 3. SUNTIKKAN RUTE PATCH DI SINI (Sebelum GET /:id terakhir)
modulesRouter.patch(
  "/:id",
  authenticate,
  validateRequest(updateModuleSchema),
  asyncHandler(updateModule),
);

// Detail by ID taruh terakhir
modulesRouter.get(
  "/:id",
  validateRequest(moduleIdParamSchema),
  asyncHandler(getModuleById),
);

export default modulesRouter;
