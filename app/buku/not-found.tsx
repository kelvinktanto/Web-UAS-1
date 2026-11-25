import Link from "next/link";

export default function BukuNotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">Buku tidak ditemukan</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Buku yang dicari tidak tersedia di katalog.
      </p>
      <Link
        href="/buku"
        className="mt-6 inline-flex rounded-md bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-300"
      >
        Kembali ke daftar buku
      </Link>
    </main>
  );
}
