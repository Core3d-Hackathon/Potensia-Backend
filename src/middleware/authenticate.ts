import { verifyToken } from "@clerk/backend";
import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { HTTP_STATUS } from "../constants/http-status";
import { ApiError } from "../utils/api-error";

const extractBearerToken = (authorizationHeader?: string) => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = extractBearerToken(req.header("authorization"));

    if (!token) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Unauthorized. Bearer token is required.",
      );
    }

    const payload = await verifyToken(token, {
      secretKey: env.CLERK_SECRET_KEY,
      ...(env.CLERK_JWT_KEY ? { jwtKey: env.CLERK_JWT_KEY } : {}),
    });

    req.auth = {
      clerkUserId: payload.sub,
      ...(typeof payload.sid === "string" ? { sessionId: payload.sid } : {}),
      email: typeof payload.email === "string" ? payload.email : null,
    };

    next();
  } catch (error) {
    next(new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized. Invalid or expired token.", error));
  }
};
