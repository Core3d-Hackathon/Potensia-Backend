import app from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const startServer = async () => {
  await prisma.$connect();

  const server = app.listen(env.PORT, () => {
    console.log(`Potensia backend listening on http://localhost:${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
};

startServer().catch(async (error) => {
  console.error("Failed to start Potensia backend:", error);
  await prisma.$disconnect();
  process.exit(1);
});
