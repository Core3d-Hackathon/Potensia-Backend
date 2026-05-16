import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { ApiError } from "../utils/api-error";
import { getLeaderboardService, getMyLeaderboardRankService } from "../services/leaderboard.service";
import { sendSuccess } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";

export const getLeaderboard = async (req: Request, res: Response) => {
  const leaderboard = await getLeaderboardService();

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Leaderboard fetched successfully",
    data: {
      leaderboard,
    },
    meta: buildResponseMeta(req),
  });
};

export const getMyLeaderboardRank = async (req: Request, res: Response) => {
  if (!req.auth?.clerkUserId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const myLeaderboard = await getMyLeaderboardRankService(req.auth.clerkUserId);

  if (!myLeaderboard) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Authenticated user not found");
  }

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Authenticated user leaderboard rank fetched successfully",
    data: {
      user: myLeaderboard,
    },
    meta: buildResponseMeta(req),
  });
};
