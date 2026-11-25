import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-16">
      <section className="max-w-2xl">
        <p className="mb-4 text-sm font-semibold text-blue-800 dark:text-blue-300">
          Perpustakaan sekolah
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          Temukan buku di perpustakaan sekolah.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          PustakaKu membantu siswa dan petugas perpustakaan melihat koleksi
          buku, mengetahui ketersediaan stok, dan memperbarui katalog.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/buku"
            className="rounded-md bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-300"
          >
            Lihat daftar buku
          </Link>
          <Link
            href="/buku/baru"
            className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900 dark:focus-visible:outline-blue-300"
          >
            Tambah buku
          </Link>
        </div>
      </section>

      <aside
        aria-label="Informasi layanan perpustakaan"
        className="border-l-4 border-blue-800 bg-white px-6 py-7 shadow-sm shadow-slate-200/70 sm:px-8 dark:border-blue-400 dark:bg-slate-900 dark:shadow-none"
      >
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Katalog dalam satu tempat
        </h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          Cari judul, lihat penulis dan kategori, lalu periksa jumlah buku yang
          tersedia sebelum berkunjung ke perpustakaan.
        </p>
        <p className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
          Data koleksi tersimpan di database lokal SQLite.
        </p>
      </aside>
    </main>
  );
}
