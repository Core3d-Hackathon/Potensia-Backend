import { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export const requestIdHandler = (req: Request, res: Response, next: NextFunction) => {
  const requestId = randomUUID();

  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);

  next();
};
