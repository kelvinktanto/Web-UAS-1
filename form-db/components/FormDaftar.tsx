"use client";

import { useActionState } from "react";
import { simpanPendaftar, type FormState } from "@/app/actions";

const awal: FormState = { sukses: false, pesan: "" };

export default function FormDaftar() {
  const [state, formAction, pending] = useActionState(simpanPendaftar, awal);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="nama" className="block text-sm font-medium">
          Nama
        </label>
        <input
          id="nama"
          name="nama"
          required
          minLength={3}
          maxLength={100}
          defaultValue={state.values?.nama}
          className="mt-1 w-full rounded border border-gray-300 p-2"
        />
        {state.galat?.nama && (
          <p className="mt-1 text-sm text-red-600">{state.galat.nama}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={255}
          defaultValue={state.values?.email}
          className="mt-1 w-full rounded border border-gray-300 p-2"
        />
        {state.galat?.email && (
          <p className="mt-1 text-sm text-red-600">{state.galat.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="pesan" className="block text-sm font-medium">
          Pesan (opsional)
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={3}
          maxLength={1000}
          defaultValue={state.values?.pesan}
          className="mt-1 w-full rounded border border-gray-300 p-2"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Kirim"}
      </button>

      {state.pesan && (
        <p className={state.sukses ? "text-green-700" : "text-red-600"}>
          {state.pesan}
        </p>
      )}
    </form>
  );
}
