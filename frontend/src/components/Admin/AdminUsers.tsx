"use client";

import { useState } from "react";
import { USERS } from "./data";

export function AdminUsers() {
  const [search, setSearch] = useState("");

  const filtered = USERS.filter(u =>
    u.nama.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-sm text-gray-400 mt-0.5">Daftar akun yang terdaftar</p>
        </div>
        <button className="btn-primary px-4 py-2 text-sm">+ Tambah Pengguna</button>
      </div>

      <div className="relative max-w-xs">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Cari pengguna..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9 h-10 text-[13px]"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Pengguna", "Email", "Prediksi", "Bergabung", "Status", "Aksi"].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs flex-shrink-0">
                      {u.nama.charAt(0)}
                    </div>
                    <p className="font-medium text-gray-800 text-[13px]">{u.nama}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[12px] text-gray-500">{u.email}</td>
                <td className="px-5 py-3.5">
                  <span className="font-syne font-bold text-gray-900">{u.prediksi}</span>
                  <span className="text-[11px] text-gray-400 ml-1">prediksi</span>
                </td>
                <td className="px-5 py-3.5 text-[12px] text-gray-500">{u.bergabung}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    u.status === "Aktif"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                    <button className="text-[12px] text-red-500 hover:text-red-600 font-medium">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}