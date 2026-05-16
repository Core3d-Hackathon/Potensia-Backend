import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";
import { createModule, getModules } from "../controllers/modules.controller";

const modulesRouter = Router();

modulesRouter.get("/", asyncHandler(getModules));
modulesRouter.post("/", authenticate, asyncHandler(createModule));

export default modulesRouter;