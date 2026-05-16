"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Email is invalid"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
});
exports.logoutSchema = zod_1.z.object({
    sessionId: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=auth.validator.js.map