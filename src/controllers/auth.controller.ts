import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/http-status";
import { logoutClerkSession, syncAuthenticatedUser } from "../services/auth.service";
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

export const logout = async (
  req: Request,
  res: Response,
) => {
  const { sessionId: bodySessionId } = req.body as { sessionId?: string };
  const sessionId = bodySessionId ?? req.auth?.sessionId;

  if (!sessionId) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "sessionId is required to logout this session",
    );
  }

  const revokedSession = await logoutClerkSession(sessionId);

  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: "Logout successful",
    data: {
      session: {
        id: revokedSession.id,
        userId: revokedSession.userId,
        status: revokedSession.status,
      },
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
      ],
      endpoints: {
        me: "/api/v1/auth/me",
        logout: "/api/v1/auth/logout",
      },
    },
    meta: buildResponseMeta(req),
  });
};
