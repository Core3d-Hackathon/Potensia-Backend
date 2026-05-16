import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { sendError } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  return sendError(res, {
    statusCode: HTTP_STATUS.NOT_FOUND,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    meta: buildResponseMeta(req),
  });
};
