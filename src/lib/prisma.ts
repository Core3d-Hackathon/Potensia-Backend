import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { env } from "../config/env";

declare global {
  // Reuse a single Prisma client during local hot reload.
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma =
  global.__prisma__ ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__prisma__ = prisma;
}
