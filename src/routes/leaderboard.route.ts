import { Router } from "express";
import { getLeaderboard, getMyLeaderboardRank } from "../controllers/leaderboard.controller";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";

const leaderboardRouter = Router();

leaderboardRouter.get("/", asyncHandler(getLeaderboard));
leaderboardRouter.get("/me", authenticate, asyncHandler(getMyLeaderboardRank));

export default leaderboardRouter;
