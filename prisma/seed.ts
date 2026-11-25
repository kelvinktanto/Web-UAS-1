import { prisma } from "../lib/prisma";

async function main() {
  const books = [
    {
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      kategori: "Novel",
      tahun: 2005,
      jumlahStok: 5,
      stok: 3,
      deskripsi: "Kisah perjuangan anak-anak Belitung dalam meraih pendidikan.",
    },
    {
      judul: "Bumi Manusia",
      penulis: "Pramoedya Ananta Toer",
      kategori: "Novel",
      tahun: 1980,
      jumlahStok: 2,
      stok: 0,
      deskripsi: "Novel tentang kehidupan Minke pada masa kolonial.",
    },
    {
      judul: "Matematika untuk SMA",
      penulis: "Dewi N. Kurnia",
      kategori: "Pelajaran",
      tahun: 2022,
      jumlahStok: 4,
      stok: 0,
      deskripsi: "Buku latihan matematika untuk siswa SMA.",
    },
    {
      judul: "Mengenal Tata Surya",
      penulis: "Rizki Pratama",
      kategori: "Sains",
      tahun: 2021,
      jumlahStok: 6,
      stok: 4,
      deskripsi: "Pengenalan planet dan benda langit di tata surya.",
    },
    {
      judul: "Sejarah Indonesia Modern",
      penulis: "M. Arif Santoso",
      kategori: "Sejarah",
      tahun: 2019,
      jumlahStok: 3,
      stok: 2,
      deskripsi: "Ringkasan peristiwa penting dalam sejarah Indonesia modern.",
    },
    {
      judul: "Kamus Bahasa Indonesia",
      penulis: "Tim Bahasa Nusantara",
      kategori: "Referensi",
      tahun: 2020,
      jumlahStok: 5,
      stok: 5,
      deskripsi: "Kamus untuk membantu memahami kosakata bahasa Indonesia.",
    },
    {
      judul: "Cerita Rakyat Nusantara",
      penulis: "Ayu Lestari",
      kategori: "Lainnya",
      tahun: 2018,
      jumlahStok: 3,
      stok: 1,
      deskripsi: "Kumpulan cerita rakyat dari berbagai daerah di Indonesia.",
    },
  ];

  await prisma.$transaction(async (transaction) => {
    await transaction.buku.deleteMany();
    await transaction.buku.createMany({ data: books });
  });

  console.log(`Seed berhasil: ${books.length} buku ditambahkan.`);
}

main()
  .catch((error: unknown) => {
    console.error("Seed buku gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
