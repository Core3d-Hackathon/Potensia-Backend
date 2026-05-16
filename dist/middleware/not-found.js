"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const http_status_1 = require("../constants/http-status");
const api_response_1 = require("../utils/api-response");
const response_meta_1 = require("../utils/response-meta");
const notFoundHandler = (req, res, _next) => {
    return (0, api_response_1.sendError)(res, {
        statusCode: http_status_1.HTTP_STATUS.NOT_FOUND,
        message: `Route ${req.method} ${req.originalUrl} not found`,
        meta: (0, response_meta_1.buildResponseMeta)(req),
    });
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=not-found.js.map