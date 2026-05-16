import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/async-handler";
import {
  getCommunityModules,
  toggleUpvoteModule,
} from "../controllers/community.controller";
import { validateRequest } from "../middleware/validate-request";
import {
  upvoteModuleSchema,
} from "../schemas/community.schema";

const communityRouter = Router();

communityRouter.get(
  "/",
  asyncHandler(getCommunityModules),
);

communityRouter.post(
  "/:id/upvote",
  authenticate,
  validateRequest(upvoteModuleSchema),
  asyncHandler(toggleUpvoteModule),
);

export default communityRouter;
