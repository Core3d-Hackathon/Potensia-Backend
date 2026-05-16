import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject, ZodType } from "zod";

type RequestSchema = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodObject;
};

export const validateRequest = (schema: RequestSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query) as Request["query"];
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params) as Request["params"];
      }

      next();
    } catch (error) {
      next(error instanceof ZodError ? error : new ZodError([]));
    }
  };
};
