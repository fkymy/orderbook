/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_orderId_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Source";

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "kind" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tokenSetId" TEXT NOT NULL,
    "tokenSetSchemaHash" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "taker" TEXT NOT NULL,
    "currencyName" TEXT NOT NULL,
    "currencySymbol" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "rawAmount" TEXT NOT NULL,
    "decimalAmount" DOUBLE PRECISION NOT NULL,
    "isUsd" DOUBLE PRECISION NOT NULL,
    "isOrderbook" BOOLEAN NOT NULL,
    "isReservoir" BOOLEAN NOT NULL,
    "validFrom" INTEGER NOT NULL,
    "validUntil" INTEGER NOT NULL,
    "quantityFilled" INTEGER NOT NULL,
    "quantityRemaining" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sources_orderId_key" ON "sources"("orderId");

-- AddForeignKey
ALTER TABLE "sources" ADD CONSTRAINT "sources_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
