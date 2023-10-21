-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("cep", "city", "customerId", "district", "id", "number", "street") SELECT "cep", "city", "customerId", "district", "id", "number", "street" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_customerId_key" ON "Address"("customerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
