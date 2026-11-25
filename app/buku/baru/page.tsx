import type { Metadata } from "next";
import Link from "next/link";
import FormBuku from "@/components/FormBuku";

export const metadata: Metadata = {
  title: "Tambah Buku",
};

export default function TambahBukuPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href="/buku"
        className="text-sm font-medium text-blue-800 hover:underline hover:underline-offset-4 dark:text-blue-300"
      >
        &larr; Kembali ke daftar
      </Link>
      <section className="mt-5 border-y border-slate-200 py-6 dark:border-slate-800">
        <h1 className="text-3xl font-bold tracking-tight">Tambah buku baru</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Masukkan informasi buku untuk menambahkannya ke katalog.
        </p>
        <div className="mt-6">
          <FormBuku />
        </div>
      </section>
    </main>
  );
}
