-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('opensea', 'looksrare', 'x2y2');

-- CreateTable
CREATE TABLE "normalized_orders" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "insertedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "delayed" BOOLEAN,
    "source" "SourceType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "normalized_orders_pkey" PRIMARY KEY ("id")
);
