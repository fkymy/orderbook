/*
  Warnings:

  - You are about to drop the `normalized_orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "normalized_orders";

-- CreateTable
CREATE TABLE "relay_orders" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "insertedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "delayed" BOOLEAN,
    "source" "SourceType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "relay_orders_pkey" PRIMARY KEY ("id")
);
