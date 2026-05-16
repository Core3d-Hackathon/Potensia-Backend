"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthConfig = exports.logout = exports.getCurrentUser = void 0;
const http_status_1 = require("../constants/http-status");
const auth_service_1 = require("../services/auth.service");
const api_response_1 = require("../utils/api-response");
const api_error_1 = require("../utils/api-error");
const response_meta_1 = require("../utils/response-meta");
const getCurrentUser = async (req, res) => {
    if (!req.auth?.clerkUserId) {
        throw new api_error_1.ApiError(http_status_1.HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
    }
    const { user, profile } = await (0, auth_service_1.syncAuthenticatedUser)(req.auth.clerkUserId);
    return (0, api_response_1.sendSuccess)(res, {
        statusCode: http_status_1.HTTP_STATUS.OK,
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
        meta: (0, response_meta_1.buildResponseMeta)(req),
    });
};
exports.getCurrentUser = getCurrentUser;
const logout = async (req, res) => {
    const { sessionId: bodySessionId } = req.body;
    const sessionId = bodySessionId ?? req.auth?.sessionId;
    if (!sessionId) {
        throw new api_error_1.ApiError(http_status_1.HTTP_STATUS.BAD_REQUEST, "sessionId is required to logout this session");
    }
    const revokedSession = await (0, auth_service_1.logoutClerkSession)(sessionId);
    return (0, api_response_1.sendSuccess)(res, {
        statusCode: http_status_1.HTTP_STATUS.OK,
        message: "Logout successful",
        data: {
            session: {
                id: revokedSession.id,
                userId: revokedSession.userId,
                status: revokedSession.status,
            },
        },
        meta: (0, response_meta_1.buildResponseMeta)(req),
    });
};
exports.logout = logout;
const getAuthConfig = async (req, res) => {
    return (0, api_response_1.sendSuccess)(res, {
        statusCode: http_status_1.HTTP_STATUS.OK,
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
        meta: (0, response_meta_1.buildResponseMeta)(req),
    });
};
exports.getAuthConfig = getAuthConfig;
//# sourceMappingURL=auth.controller.js.map