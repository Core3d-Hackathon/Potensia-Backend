"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, { statusCode, message, data, meta, }) => {
    const payload = {
        success: true,
        message,
        data,
        ...(meta ? { meta } : {}),
    };
    return res.status(statusCode).json(payload);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, { statusCode, message, errors, meta, }) => {
    const payload = {
        success: false,
        message,
        ...(errors !== undefined ? { errors } : {}),
        ...(meta ? { meta } : {}),
    };
    return res.status(statusCode).json(payload);
};
exports.sendError = sendError;
//# sourceMappingURL=api-response.js.map