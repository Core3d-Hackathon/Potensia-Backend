"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const error_handler_1 = require("./middleware/error-handler");
const not_found_1 = require("./middleware/not-found");
const request_id_1 = require("./middleware/request-id");
const routes_1 = __importDefault(require("./routes"));
const http_status_1 = require("./constants/http-status");
const api_response_1 = require("./utils/api-response");
const response_meta_1 = require("./utils/response-meta");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_ORIGIN === "*" ? true : env_1.env.CLIENT_ORIGIN,
}));
app.use(request_id_1.requestIdHandler);
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "2mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return (0, api_response_1.sendSuccess)(res, {
        statusCode: http_status_1.HTTP_STATUS.OK,
        message: "Potensia backend is running",
        data: {
            name: "backend",
            version: "v1",
        },
        meta: (0, response_meta_1.buildResponseMeta)(req),
    });
});
app.use(env_1.env.API_PREFIX, routes_1.default);
app.use(not_found_1.notFoundHandler);
app.use(error_handler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map