-- CreateTable
CREATE TABLE "Buku" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tahun" INTEGER,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "deskripsi" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telepon" TEXT,
    "pesan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Pendaftar_email_key" ON "Pendaftar"("email");
