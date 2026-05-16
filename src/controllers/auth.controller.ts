import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { syncAuthenticatedUser } from "../services/auth.service";
import { sendSuccess } from "../utils/api-response";
import { ApiError } from "../utils/api-error";
import { buildResponseMeta } from "../utils/response-meta";

export const getCurrentUser = async (req: Request, res: Response) => {
  if (!req.auth?.clerkUserId) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
  }

  const { user, profile } = await syncAuthenticatedUser(req.auth.clerkUserId);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Authenticated user fetched successfully",
    data: {
      auth: {
        clerkUserId: req.auth.clerkUserId,
        sessionId: req.auth.sessionId ?? null,
      },
      user: {
        id: user.id,
        clerkId: user.clerk_id,
        name: user.name,
        email: user.email,
        imageUrl: user.image_url,
        points: user.points,
        createdAt: user.createdAt,
      },
      clerkProfile: profile,
    },
    meta: buildResponseMeta(req),
  });
};

export const getAuthConfig = async (req: Request, res: Response) => {
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Authentication config fetched successfully",
    data: {
      provider: "google_oauth",
      authProvider: "clerk",
      loginFlow: "frontend_redirect",
      notes: [
        "Frontend should start login with Clerk using the oauth_google strategy.",
        "Backend accepts the Clerk bearer token after Google sign-in succeeds.",
        "Frontend should handle logout directly with Clerk.",
      ],
      endpoints: {
        me: "/v1/auth/me",
      },
    },
    meta: buildResponseMeta(req),
  });
};
