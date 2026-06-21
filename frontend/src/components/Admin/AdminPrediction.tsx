"use client";

import { useState } from "react";
import { PREDICTIONS } from "./data";
import { KategoriBadge } from "./KategoriBadge";
import { formatRupiah } from "./utils";

const KATEGORI_LIST = ["Semua", "Hemat", "Normal", "Boros", "Sangat Boros"];

export function AdminPredictions() {
  const [search, setSearch]       = useState("");
  const [filterKat, setFilterKat] = useState("Semua");

  const filtered = PREDICTIONS.filter(p =>
    (filterKat === "Semua" || p.kategori === filterKat) &&
    (p.user.toLowerCase().includes(search.toLowerCase()) ||
     p.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-syne text-2xl font-bold text-gray-900">Data Prediksi</h1>
        <p className="text-sm text-gray-400 mt-0.5">Semua riwayat prediksi pengguna</p>
      </div>

      {/* Filter + Search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari pengguna atau ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 h-10 text-[13px] w-64"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {KATEGORI_LIST.map(k => (
            <button
              key={k}
              onClick={() => setFilterKat(k)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all ${
                filterKat === k
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <span className="ml-auto text-[12px] text-gray-400">{filtered.length} data</span>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["ID", "Pengguna", "Tanggal", "kWh/bulan", "Tagihan", "Kategori", "Aksi"].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5 text-[12px] font-mono text-gray-400">{p.id}</td>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-gray-800 text-[13px]">{p.user}</p>
                  <p className="text-[11px] text-gray-400">{p.email}</p>
                </td>
                <td className="px-5 py-3.5 text-[12px] text-gray-500">{p.tanggal}</td>
                <td className="px-5 py-3.5 font-syne font-bold text-gray-900">{p.kwh}</td>
                <td className="px-5 py-3.5 text-[12px] text-gray-600">{formatRupiah(p.tagihan)}</td>
                <td className="px-5 py-3.5"><KategoriBadge kategori={p.kategori} /></td>
                <td className="px-5 py-3.5">
                  <button className="text-[12px] text-emerald-600 hover:text-emerald-700 font-medium">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10 mx-auto mb-3 opacity-30">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-sm">Tidak ada data yang cocok</p>
          </div>
        )}
      </div>
    </div>
  );
}