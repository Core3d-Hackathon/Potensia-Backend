import { Request } from "express";
import { ApiMeta } from "../types/api";

export const buildResponseMeta = (
  req: Request,
  extraMeta?: Omit<ApiMeta, "requestId" | "timestamp" | "path" | "method">,
): ApiMeta => {
  return {
    ...(req.requestId ? { requestId: req.requestId } : {}),
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
    ...(extraMeta ?? {}),
  };
};
