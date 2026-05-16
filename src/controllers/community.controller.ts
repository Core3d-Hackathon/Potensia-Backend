import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { sendSuccess } from "../utils/api-response";
import { ApiError } from "../utils/api-error";
import { buildResponseMeta } from "../utils/response-meta";
import { getCommunityModulesService, toggleUpvoteService } from "../services/community.service";

export const getCommunityModules = async (req: Request, res: Response) => {
  const modules = await getCommunityModulesService(req.query as any);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Community modules fetched successfully",
    data: modules,
    meta: buildResponseMeta(req),
  });
};

export const toggleUpvoteModule = async (req: Request, res: Response) => {
  if (!req.auth?.clerkUserId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const moduleId = req.params.id as string;
  const result = await toggleUpvoteService(moduleId, req.auth.clerkUserId);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: result.upvoted ? "Module upvoted successfully" : "Module upvote removed",
    data: result,
    meta: buildResponseMeta(req),
  });
};