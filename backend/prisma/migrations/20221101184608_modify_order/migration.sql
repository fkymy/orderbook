/*
  Warnings:

  - You are about to drop the column `isFulfilled` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "isFulfilled",
ALTER COLUMN "taker" DROP NOT NULL,
ALTER COLUMN "rawAmount" DROP NOT NULL,
ALTER COLUMN "signature" DROP NOT NULL;
