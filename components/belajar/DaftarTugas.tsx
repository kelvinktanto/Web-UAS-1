"use client";
import { useState, type FormEvent } from "react";
type Tugas = { id: number; teks: string; selesai: boolean };
// Komponen anak 1: form. Memberi tahu induknya lewat prop onTambah.
function FormTugas({ onTambah }: { onTambah: (teks: string) => void }) {
 const [teks, setTeks] = useState(""); // state milik form sendiri
 function kirim(e: FormEvent<HTMLFormElement>) {
 e.preventDefault();
 const bersih = teks.trim();
 if (!bersih) return;
 onTambah(bersih);
 setTeks("");
 }
 return (
 <form onSubmit={kirim} className="flex gap-2">
 <input
 value={teks}
 onChange={(e) => setTeks(e.target.value)}
 placeholder="Tugas baru..."
 className="w-full rounded border border-gray-300 p-2"
 />
 <button className="rounded bg-blue-600 px-4 text-white">Tambah</button>
 </form>
 );
}
// Komponen anak 2: satu baris tugas
function ItemTugas({
 tugas,
 onToggle,
 onHapus,
}: {
 tugas: Tugas;
 onToggle: (id: number) => void;
 onHapus: (id: number) => void;
}) {
 return (
 <li className="flex items-center justify-between gap-3 p-3">
 <label className="flex items-center gap-2">
 <input
 type="checkbox"
 checked={tugas.selesai}
 onChange={() => onToggle(tugas.id)}
 />
 <span className={tugas.selesai ? "text-gray-400 line-through" : ""}>
 {tugas.teks}
 </span>
 </label>
 <button
 type="button"
 onClick={() => onHapus(tugas.id)}
 className="text-sm text-red-600 hover:underline"
 >
 Hapus
 </button>
 </li>
 );
}
// Komponen induk: pemilik state daftar tugas
export default function DaftarTugas() {
 const [daftar, setDaftar] = useState<Tugas[]>([
 { id: 1, teks: "Belajar komponen", selesai: true },
 { id: 2, teks: "Belajar state", selesai: false },
 ]);
 function tambah(teks: string) {
 setDaftar((lama) => [...lama, { id: Date.now(), teks, selesai: false }]);
 }
 function toggle(id: number) {
 setDaftar((lama) =>
 lama.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t))
 );
 }
 function hapus(id: number) {
 setDaftar((lama) => lama.filter((t) => t.id !== id));
 }
 // Nilai turunan: dihitung dari daftar, tidak perlu state sendiri
 const jumlahSelesai = daftar.filter((t) => t.selesai).length;
 return (
 <section className="space-y-3">
 <FormTugas onTambah={tambah} />
 <p className="text-sm text-gray-600">
 {jumlahSelesai} dari {daftar.length} tugas selesai
 </p>
 {daftar.length === 0 ? (
 <p className="text-gray-500">Belum ada tugas.</p>
 ) : (
 <ul className="divide-y rounded border">
 {daftar.map((t) => (
 <ItemTugas
 key={t.id}
 tugas={t}
 onToggle={toggle}
 onHapus={hapus}
 />
 ))}
 </ul>
 )}
 </section>
 );
}
