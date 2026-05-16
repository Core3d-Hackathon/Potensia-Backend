"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponseMeta = void 0;
const buildResponseMeta = (req, extraMeta) => {
    return {
        ...(req.requestId ? { requestId: req.requestId } : {}),
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method,
        ...(extraMeta ?? {}),
    };
};
exports.buildResponseMeta = buildResponseMeta;
//# sourceMappingURL=response-meta.js.map