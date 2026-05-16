"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authenticate_1 = require("../middleware/authenticate");
const async_handler_1 = require("../utils/async-handler");
const authRouter = (0, express_1.Router)();
authRouter.get("/config", (0, async_handler_1.asyncHandler)(auth_controller_1.getAuthConfig));
authRouter.post("/logout", authenticate_1.authenticate, (0, async_handler_1.asyncHandler)(auth_controller_1.logout));
authRouter.get("/me", authenticate_1.authenticate, (0, async_handler_1.asyncHandler)(auth_controller_1.getCurrentUser));
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map