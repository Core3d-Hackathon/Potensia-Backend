"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_1 = require("../constants/http-status");
const api_response_1 = require("../utils/api-response");
const response_meta_1 = require("../utils/response-meta");
const healthRouter = (0, express_1.Router)();
healthRouter.get("/", (req, res) => {
    return (0, api_response_1.sendSuccess)(res, {
        statusCode: http_status_1.HTTP_STATUS.OK,
        message: "Service is healthy",
        data: {
            service: "Potensia backend",
            status: "up",
        },
        meta: (0, response_meta_1.buildResponseMeta)(req, { version: "v1" }),
    });
});
exports.default = healthRouter;
//# sourceMappingURL=health.route.js.map