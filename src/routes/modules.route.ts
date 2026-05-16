import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";
import {
  createModule,
  generateModule,
  getModuleById,
  getModules,
} from "../controllers/modules.controller";
import { validateRequest } from "../middleware/validate-request";
import { createModuleSchema, moduleIdParamSchema } from "../schemas/module.schema";
import { generateModuleSchema } from "../schemas/generate.schema";

const modulesRouter = Router();

modulesRouter.get("/", asyncHandler(getModules));

modulesRouter.get(
  "/:id",
  validateRequest(moduleIdParamSchema),
  asyncHandler(getModuleById),
);

modulesRouter.post(
  "/generate",
  validateRequest(generateModuleSchema),
  asyncHandler(generateModule),
);

modulesRouter.post(
  "/",
  authenticate,
  validateRequest(createModuleSchema),
  asyncHandler(createModule),
);

export default modulesRouter;