# PustakaKu

PustakaKu adalah aplikasi katalog perpustakaan sekolah. Pengguna dapat melihat dan mencari koleksi, memeriksa stok yang tersedia, melihat detail buku, serta menambahkan buku baru. Data disimpan secara lokal menggunakan SQLite dan Prisma.

## Teknologi

- Next.js 16 dengan App Router dan React 19
- TypeScript
- Tailwind CSS 4
- Prisma 6
- SQLite

## Instalasi dan menjalankan aplikasi

Pastikan Node.js dan npm sudah terpasang, lalu jalankan dari folder proyek:

```bash
npm install
```

Salin `.env.example` menjadi `.env`. Di PowerShell:

```powershell
Copy-Item .env.example .env
```

Siapkan database dan isi katalog awal:

```bash
npx prisma migrate dev
npx prisma db seed
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000). Prisma Client dibuat otomatis oleh script `postinstall` saat dependensi dipasang. Untuk memperbaruinya secara manual, jalankan `npx prisma generate`.

## Struktur folder

```text
app/
  buku/
    [id]/page.tsx       Detail buku
    baru/page.tsx       Form tambah buku
    actions.ts          Server Action penyimpanan buku
    loading.tsx         Tampilan pemuatan katalog
    not-found.tsx       Tampilan buku yang tidak ditemukan
    page.tsx            Daftar dan pencarian buku
  Belajar/              Halaman latihan komponen
  globals.css           Gaya global
  layout.tsx            Layout utama dan navigasi
  page.tsx              Beranda
components/
  belajar/              Komponen latihan yang terpisah dari katalog
  FormBuku.tsx          Form buku
  LibraryNav.tsx        Navigasi perpustakaan
lib/
  book-constants.ts     Daftar kategori buku
  prisma.ts             Prisma Client singleton
prisma/
  migrations/           Migrasi database
  schema.prisma         Model database
  seed.ts               Data awal katalog
```

## Skema tabel `Buku`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `Int` | Primary key, bertambah otomatis |
| `judul` | `String` | Judul buku |
| `penulis` | `String` | Nama penulis |
| `kategori` | `String` | Kategori buku |
| `tahun` | `Int?` | Tahun terbit, opsional |
| `stok` | `Int` | Jumlah stok tersedia, default `0` |
| `jumlahStok` | `Int` | Jumlah stok total, default `0` |
| `deskripsi` | `String?` | Deskripsi, opsional |
| `createdAt` | `DateTime` | Waktu data dibuat |
| `updatedAt` | `DateTime` | Waktu data diperbarui |

## Rute

| Rute | Fungsi |
|---|---|
| `/` | Beranda PustakaKu |
| `/buku` | Daftar buku, pencarian, serta stok tersedia dan total |
| `/buku/[id]` | Detail buku berdasarkan ID |
| `/buku/baru` | Form untuk menambahkan buku |
| `/Belajar` | Halaman latihan komponen React |
