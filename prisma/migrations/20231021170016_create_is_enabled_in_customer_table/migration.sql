-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Customer" ("createdAt", "email", "id", "name", "phone") SELECT "createdAt", "email", "id", "name", "phone" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_name_key" ON "Customer"("name");
CREATE INDEX "Customer_name_idx" ON "Customer"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
