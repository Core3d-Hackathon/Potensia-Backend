"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const env_1 = require("../config/env");
const pool = new pg_1.Pool({
    connectionString: env_1.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = global.__prisma__ ??
    new client_1.PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
    });
if (process.env.NODE_ENV !== "production") {
    global.__prisma__ = exports.prisma;
}
//# sourceMappingURL=prisma.js.map