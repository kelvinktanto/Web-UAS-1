type KartuProfilProps = {
 nama: string;
 peran: string;
 aktif?: boolean; // tanda ? = boleh tidak diisi
};
export default function KartuProfil({
 nama,
 peran,
 aktif = false, // nilai bawaan kalau tidak diisi
}: KartuProfilProps) {
 return (
 <div className="rounded border border-gray-300 p-4">
 <h3 className="font-semibold">{nama}</h3>
 <p className="text-sm text-gray-600">{peran}</p>
 <span
 className={`mt-2 inline-block rounded px-2 py-0.5 text-xs ${
 aktif ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
 }`}
 >
 {aktif ? "Aktif" : "Nonaktif"}
 </span>
 </div>
 );
}
