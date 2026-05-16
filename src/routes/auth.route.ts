import { Router } from "express";
import { getAuthConfig, getCurrentUser } from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";

const authRouter = Router();

authRouter.get("/config", asyncHandler(getAuthConfig));
authRouter.get("/me", authenticate, asyncHandler(getCurrentUser));

export default authRouter;
