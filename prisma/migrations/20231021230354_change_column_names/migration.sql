/*
  Warnings:

  - You are about to drop the column `priceBuy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceSell` on the `Product` table. All the data in the column will be lost.
  - Added the required column `buyPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sellPrice" REAL NOT NULL,
    "buyPrice" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Product" ("createdAt", "enabled", "id", "name") SELECT "createdAt", "enabled", "id", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
CREATE INDEX "Product_name_idx" ON "Product"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
