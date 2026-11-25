"use client";
import { useState, type ReactNode } from "react";
export default function KotakLipat({
 judul,
 children,
}: {
 judul: string;
 children: ReactNode;
}) {
 const [buka, setBuka] = useState(false);
 return (
 <div className="rounded border border-gray-300">
 <button
 type="button"
 onClick={() => setBuka(!buka)}
 aria-expanded={buka}
 className="w-full p-3 text-left font-medium"
 >
 [{buka ? "-" : "+"}] {judul}
 </button>
 {buka && <div className="border-t p-3">{children}</div>}
 </div>
 );
}