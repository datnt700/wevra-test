-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "is_open" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "review_count" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "restaurants_is_active_idx" ON "restaurants"("is_active");

-- CreateIndex
CREATE INDEX "restaurants_is_open_idx" ON "restaurants"("is_open");
