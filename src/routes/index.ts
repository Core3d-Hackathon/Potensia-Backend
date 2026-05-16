import { Router } from "express";
import authRouter from "./auth.route";
import healthRouter from "./health.route";
import modulesRouter from "./modules.route";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/modules", modulesRouter);

export default apiRouter;