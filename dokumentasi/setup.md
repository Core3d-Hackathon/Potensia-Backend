# Potensia Backend Setup Guide

## Tech Stack

Backend Potensia menggunakan:

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Clerk Authentication
- Gemini AI
- Zod Validation

---

# 1. Struktur Folder Final

```txt
potensia-backend/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│
│   ├── config/
│   │   ├── env.ts
│   │   └── gemini.ts
│   │
│   ├── constants/
│   │   ├── curriculum.ts
│   │   ├── facilities.ts
│   │   └── learningModels.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── module.controller.ts
│   │   ├── generate.controller.ts
│   │   └── export.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── module.service.ts
│   │   ├── gemini.service.ts
│   │   └── export.service.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── module.routes.ts
│   │   ├── generate.routes.ts
│   │   └── export.routes.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   │
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── generate.validator.ts
│   │   └── module.validator.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── utils/
│   │   ├── response.ts
│   │   ├── promptBuilder.ts
│   │   └── formatter.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

# 2. Init Project

## Buat Project

```bash
mkdir potensia-backend
cd potensia-backend
```

---

## Init Node.js

```bash
npm init -y
```

---

# 3. Install Dependencies

## Core Backend

```bash
npm install express cors dotenv helmet morgan
```

---

## Prisma + PostgreSQL

```bash
npm install prisma @prisma/client
```

---

## Clerk Authentication

```bash
npm install @clerk/backend
```

---

## Gemini AI

```bash
npm install @google/generative-ai
```

---

## Validation

```bash
npm install zod
```

---

## DOCX Export

```bash
npm install docx
```

---

# 4. Install TypeScript

```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/morgan
```

---

# 5. Init TypeScript

```bash
npx tsc --init
```

---

# 6. Setup tsconfig.json

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",

    "module": "CommonJS",

    "rootDir": "./src",

    "outDir": "./dist",

    "moduleResolution": "node",

    "resolveJsonModule": true,

    "strict": true,

    "noImplicitAny": true,

    "esModuleInterop": true,

    "allowSyntheticDefaultImports": true,

    "skipLibCheck": true,

    "typeRoots": ["./node_modules/@types", "./src/types"]
  },

  "include": ["src"],

  "exclude": ["node_modules", "dist"]
}
```

---

# 7. Setup package.json Scripts

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",

  "build": "tsc",

  "start": "node dist/server.js",

  "db:migrate": "prisma migrate dev",

  "db:generate": "prisma generate",

  "db:push": "prisma db push",

  "db:studio": "prisma studio"
}
```

---

# 8. Setup Prisma

## Init Prisma

```bash
npx prisma init
```

---

# 9. Setup Neon Database

## Create Database

Buka Neon:

[https://neon.tech](https://neon.tech)

Langkah:

1. Create Project
2. Pilih Region Singapore
3. Masuk ke menu Connect
4. Pilih Prisma
5. Copy:
   - Pooled URL
   - Direct URL

---

# 10. Setup .env

## .env

```env
DATABASE_URL="YOUR_POOLED_DATABASE_URL"

DIRECT_URL="YOUR_DIRECT_DATABASE_URL"

PORT=8000

GEMINI_API_KEY=your_gemini_api_key

CLERK_SECRET_KEY=your_clerk_secret_key
```

---

# 11. Setup Prisma Schema

## prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"

  url       = env("DATABASE_URL")

  directUrl = env("DIRECT_URL")
}

model User {
  id         String   @id @default(uuid())

  clerkId    String   @unique

  name       String

  email      String   @unique

  imageUrl   String?

  points     Int @default(0)

  createdAt  DateTime @default(now())

  modules    Module[]

  upvotes    UserUpvote[]
}

model Module {
  id                String   @id @default(uuid())

  authorId          String

  judulModul        String

  jenjang           String

  faseKelas         String

  mapel             String

  materi            String

  kategoriWilayah   String

  contentJson       Json

  status            ModuleStatus @default(DRAFT)

  upvoteCount       Int @default(0)

  createdAt         DateTime @default(now())

  updatedAt         DateTime @updatedAt

  author User @relation(
    fields: [authorId],
    references: [id],
    onDelete: Cascade
  )

  upvoters UserUpvote[]

  @@index([authorId])

  @@index([status])

  @@index([mapel])

  @@index([jenjang])
}

model UserUpvote {
  userId    String

  moduleId  String

  createdAt DateTime @default(now())

  user User @relation(
    fields: [userId],
    references: [id],
    onDelete: Cascade
  )

  module Module @relation(
    fields: [moduleId],
    references: [id],
    onDelete: Cascade
  )

  @@id([userId, moduleId])
}

enum ModuleStatus {
  DRAFT
  PRIVATE
  PUBLISHED
}
```

---

# 12. Push Database

```bash
npm run db:push
```

---

# 13. Generate Prisma Client

```bash
npm run db:generate
```

---

# 14. Setup Prisma Client

## src/lib/prisma.ts

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

---

# 15. Setup ENV Config

## src/config/env.ts

```ts
import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 8000,

  DATABASE_URL: process.env.DATABASE_URL!,

  DIRECT_URL: process.env.DIRECT_URL!,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,

  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
};
```

---

# 16. Setup Express Types

## src/types/express.d.ts

```ts
import { JwtPayload } from "@clerk/backend";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
```

---

# 17. Setup Error Middleware

## src/middleware/error.middleware.ts

```ts
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
```

---

# 18. Setup App

## src/app.ts

```ts
import express from "express";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Potensia Backend Running",
  });
});

app.use(errorMiddleware);

export default app;
```

---

# 19. Setup Server

## src/server.ts

```ts
import app from "./app";

import { env } from "./config/env";

import { prisma } from "./lib/prisma";

async function bootstrap() {
  try {
    await prisma.$connect();

    console.log("Database Connected");

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
```

---

# 20. Setup .gitignore

## .gitignore

```gitignore
node_modules

dist

.env
```

---

# 21. Jalankan Backend

```bash
npm run dev
```

---

# Output Jika Berhasil

```txt
Database Connected
Server running on port 8000
```

---

# 22. Test API

Buka:

```txt
http://localhost:8000
```

Response:

```json
{
  "success": true,
  "message": "Potensia Backend Running"
}
```

---

# Kondisi Backend Saat Ini

Backend Potensia sekarang sudah memiliki:

- Express TypeScript
- Prisma ORM
- Neon PostgreSQL
- Modular Architecture
- Error Middleware
- Prisma Client
- AI-ready Structure
- Community-ready Database
- Type-safe Backend Structure

---

# Next Step

Urutan development berikutnya:

1. Auth Middleware
2. Clerk Integration
3. User Sync
4. Module CRUD
5. AI Generate Endpoint
6. Export DOCX/PDF
7. Community & Upvote System
