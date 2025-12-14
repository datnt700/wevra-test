-- CreateEnum
CREATE TYPE "CoinTransactionType" AS ENUM ('EARNED', 'SPENT', 'BONUS', 'REFUND');

-- CreateEnum
CREATE TYPE "XPTransactionType" AS ENUM ('QUEST', 'LESSON', 'CHALLENGE', 'HABIT', 'MILESTONE', 'BONUS');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "coinBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentLevel" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "currentXP" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalCoinsEarned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalCoinsSpent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalXP" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "coin_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "type" "CoinTransactionType" NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "relatedId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coin_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xp_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "totalXP" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "type" "XPTransactionType" NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "relatedId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coin_transactions_userId_createdAt_idx" ON "coin_transactions"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "xp_transactions_userId_createdAt_idx" ON "xp_transactions"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "coin_transactions" ADD CONSTRAINT "coin_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
