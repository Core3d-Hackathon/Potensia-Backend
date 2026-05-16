"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdHandler = void 0;
const node_crypto_1 = require("node:crypto");
const requestIdHandler = (req, res, next) => {
    const requestId = (0, node_crypto_1.randomUUID)();
    req.requestId = requestId;
    res.setHeader("X-Request-Id", requestId);
    next();
};
exports.requestIdHandler = requestIdHandler;
//# sourceMappingURL=request-id.js.map