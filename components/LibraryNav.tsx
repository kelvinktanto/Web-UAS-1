import Link from "next/link";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/buku", label: "Daftar Buku" },
  { href: "/buku/baru", label: "Tambah Buku" },
];

export default function LibraryNav() {
  return (
    <header className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-950 dark:text-white"
        >
          Pustaka<span className="text-blue-700 dark:text-blue-400">Ku</span>
        </Link>
        <div className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-300 dark:focus-visible:outline-blue-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
