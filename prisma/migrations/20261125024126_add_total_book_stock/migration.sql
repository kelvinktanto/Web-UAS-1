-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Buku" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tahun" INTEGER,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "jumlahStok" INTEGER NOT NULL DEFAULT 0,
    "deskripsi" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Buku" ("createdAt", "deskripsi", "id", "judul", "kategori", "penulis", "stok", "tahun", "updatedAt") SELECT "createdAt", "deskripsi", "id", "judul", "kategori", "penulis", "stok", "tahun", "updatedAt" FROM "Buku";
DROP TABLE "Buku";
ALTER TABLE "new_Buku" RENAME TO "Buku";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
