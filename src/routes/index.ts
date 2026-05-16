import { Router } from "express";
import authRouter from "./auth.route";
import curriculumRouter from "./curriculum.route";
import healthRouter from "./health.route";
import leaderboardRouter from "./leaderboard.route";
import modulesRouter from "./modules.route";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/curriculum", curriculumRouter);
apiRouter.use("/leaderboard", leaderboardRouter);
apiRouter.use("/modules", modulesRouter);

export default apiRouter;