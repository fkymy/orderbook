/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `marketplaces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `marketplaces` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "marketplaces_name_key" ON "marketplaces"("name");

-- CreateIndex
CREATE UNIQUE INDEX "marketplaces_slug_key" ON "marketplaces"("slug");
