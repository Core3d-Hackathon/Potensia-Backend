import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";
import { requestIdHandler } from "./middleware/request-id";
import apiRouter from "./routes";
import { HTTP_STATUS } from "./constants/http-status";
import { sendSuccess } from "./utils/api-response";
import { buildResponseMeta } from "./utils/response-meta";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN === "*" ? true : env.CLIENT_ORIGIN,
  }),
);
app.use(requestIdHandler);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Potensia backend is running",
    data: {
      name: "backend",
      version: "v1",
    },
    meta: buildResponseMeta(req),
  });
});

app.use(env.API_PREFIX, apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
