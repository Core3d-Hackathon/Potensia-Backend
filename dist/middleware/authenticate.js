"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const backend_1 = require("@clerk/backend");
const env_1 = require("../config/env");
const http_status_1 = require("../constants/http-status");
const api_error_1 = require("../utils/api-error");
const extractBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) {
        return null;
    }
    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return null;
    }
    return token;
};
const authenticate = async (req, _res, next) => {
    try {
        const token = extractBearerToken(req.header("authorization"));
        if (!token) {
            throw new api_error_1.ApiError(http_status_1.HTTP_STATUS.UNAUTHORIZED, "Unauthorized. Bearer token is required.");
        }
        const payload = await (0, backend_1.verifyToken)(token, {
            secretKey: env_1.env.CLERK_SECRET_KEY,
            ...(env_1.env.CLERK_JWT_KEY ? { jwtKey: env_1.env.CLERK_JWT_KEY } : {}),
        });
        req.auth = {
            clerkUserId: payload.sub,
            ...(typeof payload.sid === "string" ? { sessionId: payload.sid } : {}),
            email: typeof payload.email === "string" ? payload.email : null,
        };
        next();
    }
    catch (error) {
        next(new api_error_1.ApiError(http_status_1.HTTP_STATUS.UNAUTHORIZED, "Unauthorized. Invalid or expired token.", error));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map