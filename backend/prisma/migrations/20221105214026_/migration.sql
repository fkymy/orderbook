/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `relay_orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "relay_orders_hash_key" ON "relay_orders"("hash");
