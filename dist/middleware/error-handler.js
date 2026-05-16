"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const env_1 = require("../config/env");
const http_status_1 = require("../constants/http-status");
const api_error_1 = require("../utils/api-error");
const api_response_1 = require("../utils/api-response");
const response_meta_1 = require("../utils/response-meta");
const errorHandler = (error, req, res, _next) => {
    if (error instanceof zod_1.ZodError) {
        return (0, api_response_1.sendError)(res, {
            statusCode: http_status_1.HTTP_STATUS.BAD_REQUEST,
            message: "Validation error",
            errors: error.flatten(),
            meta: (0, response_meta_1.buildResponseMeta)(req),
        });
    }
    if (error instanceof api_error_1.ApiError) {
        return (0, api_response_1.sendError)(res, {
            statusCode: error.statusCode,
            message: error.message,
            errors: error.errors,
            meta: (0, response_meta_1.buildResponseMeta)(req),
        });
    }
    const fallbackMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return (0, api_response_1.sendError)(res, {
        statusCode: http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: fallbackMessage,
        ...(env_1.env.NODE_ENV === "development" ? { errors: error } : {}),
        meta: (0, response_meta_1.buildResponseMeta)(req),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map