/*
  Warnings:

  - The `tokenType` column on the `contracts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isUsd` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `quantityFilled` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `quantityRemaining` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `tokenSetSchemaHash` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `validUntil` on the `orders` table. All the data in the column will be lost.
  - Added the required column `cancelled` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalized` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFulfilled` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `side` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderSide" AS ENUM ('ASK', 'BUY');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "tokenType",
ADD COLUMN     "tokenType" "TokenType";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "isUsd",
DROP COLUMN "quantityFilled",
DROP COLUMN "quantityRemaining",
DROP COLUMN "tokenSetSchemaHash",
DROP COLUMN "validFrom",
DROP COLUMN "validUntil",
ADD COLUMN     "cancelled" BOOLEAN NOT NULL,
ADD COLUMN     "finalized" BOOLEAN NOT NULL,
ADD COLUMN     "isFulfilled" BOOLEAN NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL,
ADD COLUMN     "tokenId" INTEGER NOT NULL,
DROP COLUMN "side",
ADD COLUMN     "side" "OrderSide" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL;
