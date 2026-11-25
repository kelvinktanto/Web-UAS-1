import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FormDaftar from "@/components/FormDaftar";

export const instant = false;

async function DaftarPendaftar() {
 const daftar = await prisma.pendaftar.findMany({
 orderBy: { createdAt: "desc" },
 });
 return (
 <>
 <h2 className='mb-3 mt-10 text-xl font-semibold'>
 Data Tersimpan ({daftar.length})
 </h2>
 {daftar.length === 0 ? (
 <p className='text-gray-500'>Belum ada data.</p>
 ) : (
 <ul className='divide-y rounded border'>
 {daftar.map((p) => (
 <li key={p.id} className='p-3'>
 <Link
 href={`/pendaftar/${p.id}`}
 className='font-medium text-blue-600 hover:underline'
 >
 {p.nama}
 </Link>
 <p className='text-sm text-gray-600'>{p.email}</p>
 {p.pesan && <p className='mt-1 text-sm'>{p.pesan}</p>}
 <p className='mt-1 text-xs text-gray-400'>
 {p.createdAt.toLocaleString("id-ID")}
 </p>
 </li>
 ))}
 </ul>
 )}
 </>
 );
}
export default function Home() {
 return (
 <main className='mx-auto max-w-xl p-6'>
 <h1 className='mb-6 text-2xl font-bold'>Form Pendaftaran</h1>
 <FormDaftar />
 <Suspense
 fallback={<p className='mt-10 text-gray-500'>Memuat data...</p>}>
 <DaftarPendaftar />
 </Suspense>
 </main>
 );
}
