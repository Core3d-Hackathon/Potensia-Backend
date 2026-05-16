import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";
import {
  createModule,
  getModuleById,
  getModules,
  generateTP,
  generateATP,
  generateModul
} from "../controllers/modules.controller";
import { validateRequest } from "../middleware/validate-request";
import { createModuleSchema, moduleIdParamSchema } from "../schemas/module.schema";
import { generateTpSchema, generateAtpSchema, generateModulAjarSchema } from "../schemas/generate.schema";

const modulesRouter = Router();

// Endpoint CRUD Database
modulesRouter.get("/", asyncHandler(getModules));
modulesRouter.get("/:id", validateRequest(moduleIdParamSchema), asyncHandler(getModuleById));
modulesRouter.post("/", authenticate, validateRequest(createModuleSchema), asyncHandler(createModule));

// Endpoint AI Generator (Sesuai Wizard UI)
modulesRouter.post("/generate/tp", validateRequest(generateTpSchema), asyncHandler(generateTP));
modulesRouter.post("/generate/atp", validateRequest(generateAtpSchema), asyncHandler(generateATP));
modulesRouter.post("/generate/modul", validateRequest(generateModulAjarSchema), asyncHandler(generateModul));

export default modulesRouter;