"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BOOK_CATEGORIES } from "@/lib/book-constants";
import { prisma } from "@/lib/prisma";

export type BookFormState = {
  message?: string;
  errors?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    tahun?: string;
    stok?: string;
    deskripsi?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahun: string;
    stok: string;
    deskripsi: string;
  };
};

export async function simpanBuku(
  _previousState: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  const values = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? "").trim(),
    tahun: String(formData.get("tahun") ?? "").trim(),
    stok: String(formData.get("stok") ?? "").trim(),
    deskripsi: String(formData.get("deskripsi") ?? "").trim(),
  };

  const errors: NonNullable<BookFormState["errors"]> = {};
  const year = values.tahun ? Number(values.tahun) : null;
  const stock = values.stok === "" ? Number.NaN : Number(values.stok);
  const currentYear = new Date().getFullYear();

  if (!values.judul) errors.judul = "Judul wajib diisi.";
  if (values.judul.length > 200) errors.judul = "Judul maksimal 200 karakter.";
  if (!values.penulis) errors.penulis = "Penulis wajib diisi.";
  if (values.penulis.length > 160) {
    errors.penulis = "Nama penulis maksimal 160 karakter.";
  }
  if (!BOOK_CATEGORIES.some((category) => category === values.kategori)) {
    errors.kategori = "Pilih kategori buku yang tersedia.";
  }
  if (
    values.tahun &&
    (!Number.isSafeInteger(year) ||
      year === null ||
      year < 1000 ||
      year > currentYear + 1)
  ) {
    errors.tahun = "Masukkan tahun terbit yang valid.";
  }
  if (!Number.isSafeInteger(stock) || stock < 0) {
    errors.stok = "Stok harus berupa bilangan bulat nol atau lebih.";
  }
  if (values.deskripsi.length > 2000) {
    errors.deskripsi = "Deskripsi maksimal 2000 karakter.";
  }

  if (Object.keys(errors).length > 0) {
    return { message: "Periksa kembali data buku.", errors, values };
  }

  let bukuId: number;
  try {
    const buku = await prisma.buku.create({
      data: {
        judul: values.judul,
        penulis: values.penulis,
        kategori: values.kategori,
        tahun: year,
        stok: stock,
        jumlahStok: stock,
        deskripsi: values.deskripsi || null,
      },
      select: { id: true },
    });
    bukuId = buku.id;
  } catch (error) {
    console.error("Gagal menyimpan buku:", error);
    return {
      message: "Buku gagal disimpan. Silakan coba lagi.",
      values,
    };
  }

  revalidatePath("/buku");
  redirect(`/buku/${bukuId}`);
}
