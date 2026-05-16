import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";
import { HTTP_STATUS } from "../constants/http-status";
import { ApiError } from "../utils/api-error";
import { sendError } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return sendError(res, {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Validation error",
      errors: error.flatten(),
      meta: buildResponseMeta(req),
    });
  }

  if (error instanceof ApiError) {
    return sendError(res, {
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors,
      meta: buildResponseMeta(req),
    });
  }

  const fallbackMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return sendError(res, {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: fallbackMessage,
    ...(env.NODE_ENV === "development" ? { errors: error } : {}),
    meta: buildResponseMeta(req),
  });
};
