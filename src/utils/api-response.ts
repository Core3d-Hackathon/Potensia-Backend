import { Response } from "express";
import { ApiErrorResponse, ApiMeta, ApiSuccessResponse } from "../types/api";

export const sendSuccess = <T>(
  res: Response,
  {
    statusCode,
    message,
    data,
    meta,
  }: {
    statusCode: number;
    message: string;
    data: T;
    meta?: ApiMeta;
  },
) => {
  const payload: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  };

  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  {
    statusCode,
    message,
    errors,
    meta,
  }: {
    statusCode: number;
    message: string;
    errors?: unknown;
    meta?: ApiMeta;
  },
) => {
  const payload: ApiErrorResponse = {
    success: false,
    message,
    ...(errors !== undefined ? { errors } : {}),
    ...(meta ? { meta } : {}),
  };

  return res.status(statusCode).json(payload);
};
