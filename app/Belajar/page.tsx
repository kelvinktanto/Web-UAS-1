import Link from "next/link";
import KartuProfil from "@/components/belajar/KartuProfil";
import Penghitung from "@/components/belajar/Penghitung";
import DaftarTugas from "@/components/belajar/DaftarTugas";
import KotakLipat from "@/components/belajar/KotakLipat";

export default function BelajarPage() {
  return (
    <main className="mx-auto max-w-xl space-y-8 p-6">
      <Link href="/" className="text-sm text-blue-600 underline">
        &larr; Kembali
      </Link>

      <h1 className="text-2xl font-bold">Belajar Komponen dan State</h1>

      <section>
        <h2 className="mb-3 text-xl font-semibold">1. Komponen dan props</h2>
        <div className="space-y-3">
          <KartuProfil nama="Budi Santoso" peran="Siswa" aktif />
          <KartuProfil nama="Siti Aminah" peran="Guru" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">
          2. State dengan useState
        </h2>
        <Penghitung awal={0} />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">3. State berupa array</h2>
        <DaftarTugas />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">
          4. Komponen dalam komponen
        </h2>
        <KotakLipat judul="Klik untuk membuka">
          <KartuProfil nama="Rina Wijaya" peran="Admin" aktif />
        </KotakLipat>
      </section>
    </main>
  );
}