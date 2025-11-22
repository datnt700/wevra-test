-- AlterTable
ALTER TABLE "events" ADD COLUMN     "currency" TEXT DEFAULT 'USD',
ADD COLUMN     "is_free" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "price" DECIMAL(10,2);
