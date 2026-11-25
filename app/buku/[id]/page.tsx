import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export const instant = false;

async function DetailBuku({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idBuku = Number(id);

  if (!Number.isInteger(idBuku) || idBuku < 1) {
    notFound();
  }

  const book = await prisma.buku.findUnique({
    where: { id: idBuku },
    select: {
      id: true,
      judul: true,
      penulis: true,
      kategori: true,
      tahun: true,
      stok: true,
      jumlahStok: true,
      deskripsi: true,
      createdAt: true,
    },
  });

  if (!book) {
    notFound();
  }

  return (
    <article className="mt-6 grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-[9rem_1fr] dark:border-slate-800">
      <div
        aria-label="Sampul buku belum tersedia"
        className="flex aspect-[3/4] max-w-36 items-center justify-center border border-slate-300 bg-slate-100 px-3 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
      >
        Sampul belum tersedia
      </div>
      <div>
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900 dark:bg-blue-950 dark:text-blue-200">
          {book.kategori}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{book.judul}</h1>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500 dark:text-slate-400">
              Penulis
            </dt>
            <dd className="mt-1 font-medium">{book.penulis}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500 dark:text-slate-400">
              Tahun terbit
            </dt>
            <dd className="mt-1 font-medium">{book.tahun ?? "Tidak dicantumkan"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500 dark:text-slate-400">
              Ketersediaan
            </dt>
            <dd className="mt-1 font-medium">
              <span
                className={
                  book.stok === 0
                    ? "rounded bg-red-100 px-2 py-1 text-red-800 dark:bg-red-950 dark:text-red-200"
                    : "rounded bg-green-100 px-2 py-1 text-green-800 dark:bg-green-950 dark:text-green-200"
                }
              >
                Stok: {book.stok} dari {book.jumlahStok} tersedia
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500 dark:text-slate-400">
              Ditambahkan
            </dt>
            <dd className="mt-1 font-medium">
              {book.createdAt.toLocaleDateString("id-ID")}
            </dd>
          </div>
        </dl>
        <section className="mt-6">
          <h2 className="font-semibold">Deskripsi</h2>
          <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-600 dark:text-slate-300">
            {book.deskripsi || "Belum ada deskripsi untuk buku ini."}
          </p>
        </section>
      </div>
    </article>
  );
}

export default function DetailBukuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/buku"
        className="text-sm font-medium text-blue-800 hover:underline hover:underline-offset-4 dark:text-blue-300"
      >
        &larr; Kembali ke daftar
      </Link>
      <Suspense
        fallback={
          <div
            aria-label="Memuat detail buku"
            className="mt-6 h-64 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"
          />
        }
      >
        <DetailBuku params={params} />
      </Suspense>
    </main>
  );
}
