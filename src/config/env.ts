import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  PORT: z.coerce.number().int().positive().default(3000),
  API_PREFIX: z.string().min(1).default("/api/v1"),
  CLIENT_ORIGIN: z.string().min(1).optional(),
  FRONTEND_URL: z.string().min(1).optional(),
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
  CLERK_JWT_KEY: z.string().min(1).optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  CLIENT_ORIGIN: parsedEnv.CLIENT_ORIGIN ?? parsedEnv.FRONTEND_URL ?? "*",
};
