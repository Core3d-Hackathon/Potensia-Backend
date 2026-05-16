import { Router } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { sendSuccess } from "../utils/api-response";
import { buildResponseMeta } from "../utils/response-meta";

const healthRouter = Router();

healthRouter.get("/", (req, res) => {
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Service is healthy",
    data: {
      service: "Potensia backend",
      status: "up",
    },
    meta: buildResponseMeta(req, { version: "v1" }),
  });
});

export default healthRouter;
