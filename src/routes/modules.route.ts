import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";
import { createModule, getModuleById, getModules } from "../controllers/modules.controller";
import { validateRequest } from "../middleware/validate-request";
import { createModuleSchema, moduleIdParamSchema } from "../schemas/module.schema";

const modulesRouter = Router();

modulesRouter.get("/", asyncHandler(getModules));
modulesRouter.get("/:id", validateRequest(moduleIdParamSchema), asyncHandler(getModuleById));
modulesRouter.post(
  "/",
  authenticate,
  validateRequest(createModuleSchema),
  asyncHandler(createModule),
);

export default modulesRouter;