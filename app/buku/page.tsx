import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export const instant = false;

async function DaftarBuku({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  const { cari: rawCari } = await searchParams;
  const cari = Array.isArray(rawCari) ? rawCari[0]?.trim() : rawCari?.trim();
  const books = await prisma.buku.findMany({
    where: cari
      ? {
          OR: [
            { judul: { contains: cari } },
            { penulis: { contains: cari } },
          ],
        }
      : undefined,
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    select: {
      id: true,
      judul: true,
      penulis: true,
      kategori: true,
      tahun: true,
      stok: true,
      jumlahStok: true,
    },
  });

  return (
    <>
      <form action="/buku" method="get" className="mt-8 flex gap-2">
        <label htmlFor="cari" className="sr-only">
          Cari judul atau penulis
        </label>
        <input
          id="cari"
          name="cari"
          type="search"
          defaultValue={cari}
          placeholder="Cari judul atau penulis"
          className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-950"
        />
        <button className="rounded-md bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-300">
          Cari
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {books.length} buku ditemukan
        </p>
        {cari && (
          <Link
            href="/buku"
            className="text-sm font-medium text-blue-800 underline underline-offset-4 hover:text-blue-950 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Hapus pencarian
          </Link>
        )}
      </div>

      {books.length === 0 ? (
        <div className="mt-4 border-y border-slate-200 py-10 dark:border-slate-800">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            {cari ? "Buku tidak ditemukan" : "Katalog masih kosong"}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {cari
              ? "Coba kata pencarian lain atau lihat seluruh katalog."
              : "Tambahkan buku pertama untuk mulai mengisi katalog."}
          </p>
          {!cari && (
            <Link
              href="/buku/baru"
              className="mt-4 inline-flex rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Tambah buku
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto border-y border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <caption className="sr-only">Daftar koleksi buku perpustakaan</caption>
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <tr>
                <th scope="col" className="px-3 py-3 font-semibold">
                  No
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Judul
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Penulis
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Kategori
                </th>
                <th scope="col" className="px-3 py-3 font-semibold">
                  Stok
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {books.map((book, index) => (
                <tr
                  key={book.id}
                  className="bg-white transition-colors hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"
                >
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                    {index + 1}
                  </td>
                  <th scope="row" className="px-3 py-3 font-medium">
                    {book.judul}
                  </th>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                    {book.penulis}
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-300">
                    {book.kategori}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={
                        book.stok === 0
                          ? "inline-flex rounded bg-red-100 px-2 py-1 font-medium text-red-800 dark:bg-red-950 dark:text-red-200"
                          : "inline-flex rounded bg-green-100 px-2 py-1 font-medium text-green-800 dark:bg-green-950 dark:text-green-200"
                      }
                    >
                      {book.stok}/{book.jumlahStok}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Link
                      href={`/buku/${book.id}`}
                      className="inline-flex min-h-9 items-center rounded-md border border-slate-300 px-3 font-medium text-slate-800 transition hover:border-blue-700 hover:bg-blue-50 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-200 dark:focus-visible:outline-blue-300"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default function BukuPage({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daftar Buku</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Telusuri koleksi dan periksa stok yang tersedia.
          </p>
        </div>
        <Link
          href="/buku/baru"
          className="rounded-md bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-300"
        >
          Tambah buku
        </Link>
      </div>
      <Suspense
        fallback={
          <div
            aria-label="Memuat daftar buku"
            className="mt-8 h-40 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800"
          />
        }
      >
        <DaftarBuku searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
