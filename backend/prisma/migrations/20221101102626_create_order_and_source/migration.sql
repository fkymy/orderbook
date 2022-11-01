-- CreateTable
CREATE TABLE "Order" (
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

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_orderId_key" ON "Source"("orderId");

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
