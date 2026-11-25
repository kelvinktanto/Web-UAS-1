export default function LoadingBuku() {
  return (
    <main
      aria-label="Memuat daftar buku"
      className="mx-auto max-w-4xl px-4 py-10 sm:px-6"
    >
      <div className="h-9 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-8 h-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
    </main>
  );
}
