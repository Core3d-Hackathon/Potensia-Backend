import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { sendSuccess } from "../utils/api-response";
import { ApiError } from "../utils/api-error";
import { buildResponseMeta } from "../utils/response-meta";
import { getDashboardDataService } from "../services/dashboard.service";

export const getDashboardData = async (req: Request, res: Response) => {
  if (!req.auth?.clerkUserId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const data = await getDashboardDataService(req.auth.clerkUserId);

  console.log("Output API Dashboard:", data);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Dashboard data fetched successfully",
    data,
    meta: buildResponseMeta(req),
  });
};