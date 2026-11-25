"use client";

import Link from "next/link";
import { useActionState } from "react";
import { simpanBuku, type BookFormState } from "@/app/buku/actions";
import { BOOK_CATEGORIES } from "@/lib/book-constants";

const initialState: BookFormState = {};

const inputClassName =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-950";

export default function FormBuku() {
  const [state, formAction, pending] = useActionState(
    simpanBuku,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.message && (
        <p
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        >
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="judul" className="block text-sm font-medium">
          Judul <span className="text-red-700 dark:text-red-300">*</span>
        </label>
        <input
          id="judul"
          name="judul"
          required
          maxLength={200}
          autoComplete="off"
          placeholder="Judul buku"
          defaultValue={state.values?.judul}
          aria-invalid={Boolean(state.errors?.judul)}
          aria-describedby={state.errors?.judul ? "judul-error" : undefined}
          className={inputClassName}
        />
        {state.errors?.judul && (
          <p id="judul-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
            {state.errors.judul}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="penulis" className="block text-sm font-medium">
          Penulis <span className="text-red-700 dark:text-red-300">*</span>
        </label>
        <input
          id="penulis"
          name="penulis"
          required
          maxLength={160}
          autoComplete="off"
          placeholder="Nama penulis"
          defaultValue={state.values?.penulis}
          aria-invalid={Boolean(state.errors?.penulis)}
          aria-describedby={state.errors?.penulis ? "penulis-error" : undefined}
          className={inputClassName}
        />
        {state.errors?.penulis && (
          <p id="penulis-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
            {state.errors.penulis}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="kategori" className="block text-sm font-medium">
          Kategori <span className="text-red-700 dark:text-red-300">*</span>
        </label>
        <select
          id="kategori"
          name="kategori"
          required
          defaultValue={state.values?.kategori ?? ""}
          aria-invalid={Boolean(state.errors?.kategori)}
          aria-describedby={state.errors?.kategori ? "kategori-error" : undefined}
          className={inputClassName}
        >
          <option value="" disabled>
            Pilih kategori
          </option>
          {BOOK_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {state.errors?.kategori && (
          <p id="kategori-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
            {state.errors.kategori}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className="block text-sm font-medium">
            Tahun terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="Contoh: 2005"
            defaultValue={state.values?.tahun}
            aria-invalid={Boolean(state.errors?.tahun)}
            aria-describedby={state.errors?.tahun ? "tahun-error" : undefined}
            className={inputClassName}
          />
          {state.errors?.tahun && (
            <p id="tahun-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
              {state.errors.tahun}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="stok" className="block text-sm font-medium">
            Jumlah stok <span className="text-red-700 dark:text-red-300">*</span>
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            min={0}
            step={1}
            required
            inputMode="numeric"
            defaultValue={state.values?.stok ?? "5"}
            aria-invalid={Boolean(state.errors?.stok)}
            aria-describedby={state.errors?.stok ? "stok-error" : undefined}
            className={inputClassName}
          />
          {state.errors?.stok && (
            <p id="stok-error" className="mt-1 text-sm text-red-700 dark:text-red-300">
              {state.errors.stok}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={4}
          maxLength={2000}
          placeholder="Deskripsi singkat buku"
          defaultValue={state.values?.deskripsi}
          aria-invalid={Boolean(state.errors?.deskripsi)}
          aria-describedby={
            state.errors?.deskripsi ? "deskripsi-error" : undefined
          }
          className={inputClassName}
        />
        {state.errors?.deskripsi && (
          <p
            id="deskripsi-error"
            className="mt-1 text-sm text-red-700 dark:text-red-300"
          >
            {state.errors.deskripsi}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
        <Link
          href="/buku"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-slate-700 dark:hover:bg-slate-800 dark:focus-visible:outline-blue-300"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:outline-blue-300"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
