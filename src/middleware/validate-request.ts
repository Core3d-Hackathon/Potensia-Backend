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
        const parsedQuery = schema.query.parse(req.query) as Request["query"];
        Object.assign(req.query, parsedQuery);
      }

      if (schema.params) {
        const parsedParams = schema.params.parse(req.params) as Request["params"];
        Object.assign(req.params, parsedParams);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
