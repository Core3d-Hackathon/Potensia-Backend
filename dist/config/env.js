"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().min(1, "DATABASE_URL is required"),
    PORT: zod_1.z.coerce.number().int().positive().default(3000),
    API_PREFIX: zod_1.z.string().min(1).default("/api/v1"),
    CLIENT_ORIGIN: zod_1.z.string().min(1).optional(),
    FRONTEND_URL: zod_1.z.string().min(1).optional(),
    CLERK_SECRET_KEY: zod_1.z.string().min(1, "CLERK_SECRET_KEY is required"),
    CLERK_JWT_KEY: zod_1.z.string().min(1).optional(),
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
});
const parsedEnv = envSchema.parse(process.env);
exports.env = {
    ...parsedEnv,
    CLIENT_ORIGIN: parsedEnv.CLIENT_ORIGIN ?? parsedEnv.FRONTEND_URL ?? "*",
};
//# sourceMappingURL=env.js.map