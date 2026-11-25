"use client";
import { useState } from "react";
export default function Penghitung({ awal = 0 }: { awal?: number }) {
 // [nilai saat ini, fungsi untuk mengubahnya] = useState(nilai awal)
 const [angka, setAngka] = useState(awal);
 return (
 <div>
 <div className="flex items-center gap-3">
 <button
 onClick={() => setAngka(angka - 1)}
 className="rounded bg-gray-800 px-3 py-1 text-white"
 >
 -1
 </button>
 <span className="min-w-12 text-center text-2xl font-bold">{angka}</span>
 <button
 onClick={() => setAngka(angka + 1)}
 className="rounded bg-gray-800 px-3 py-1 text-white"
 >
 +1
 </button>
 <button
 onClick={() => setAngka(awal)}
 className="text-sm text-blue-600 underline"
 >
 Reset
 </button>
 </div>
 <div className="mt-3 flex gap-3">
 <button
 onClick={() => {
 setAngka((a) => a + 1);
 setAngka((a) => a + 1);
 setAngka((a) => a + 1);
 }}
 className="rounded bg-blue-600 px-3 py-1 text-white"
 >
 +3 (pakai fungsi)
 </button>
 <button
 onClick={() => {
 setAngka(angka + 1);
 setAngka(angka + 1);
 setAngka(angka + 1);
 }}
 className="rounded bg-red-600 px-3 py-1 text-white"
 >
 +3 (cara salah)
 </button>
 </div>
 </div>
 );
}
