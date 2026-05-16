"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkClient = void 0;
const backend_1 = require("@clerk/backend");
const env_1 = require("../config/env");
exports.clerkClient = (0, backend_1.createClerkClient)({
    secretKey: env_1.env.CLERK_SECRET_KEY,
});
//# sourceMappingURL=clerk.js.map