import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";
import { getDashboardData } from "../controllers/dashboard.controller";

const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  authenticate,
  asyncHandler(getDashboardData),
);

export default dashboardRouter;