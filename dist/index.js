"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const prisma_1 = require("./lib/prisma");
const startServer = async () => {
    await prisma_1.prisma.$connect();
    const server = app_1.default.listen(env_1.env.PORT, () => {
        console.log(`Potensia backend listening on http://localhost:${env_1.env.PORT}`);
    });
    const shutdown = async (signal) => {
        console.log(`${signal} received, shutting down gracefully...`);
        server.close(async () => {
            await prisma_1.prisma.$disconnect();
            process.exit(0);
        });
    };
    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
};
startServer().catch(async (error) => {
    console.error("Failed to start Potensia backend:", error);
    await prisma_1.prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=index.js.map