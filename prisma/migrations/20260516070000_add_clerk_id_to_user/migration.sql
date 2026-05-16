-- AlterTable
ALTER TABLE "User"
ADD COLUMN "clerk_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerk_id_key" ON "User"("clerk_id");
