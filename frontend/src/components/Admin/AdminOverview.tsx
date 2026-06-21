"use client";

import type { NavKey } from "./types";
import { PREDICTIONS, BAR_DATA, DONUT_DATA } from "./data";
import { MiniBarChart } from "./MiniBarChart";
import { DonutChart } from "./DonutChart";
import { KategoriBadge } from "./KategoriBadge";
import { formatRupiah } from "./utils";

type Props = { onNavChange: (key: NavKey) => void };

const STAT_CARDS = [
  {
    label: "Total Pengguna",
    value: "1.284",
    sub: "+42 bulan ini",
    positive: true,
    accent: "text-blue-600 bg-blue-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
      </svg>
    ),
  },
  {
    label: "Total Prediksi",
    value: "8.741",
    sub: "+318 bulan ini",
    positive: true,
    accent: "text-emerald-600 bg-emerald-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: "Rata-rata kWh",
    value: (PREDICTIONS.reduce((s, p) => s + p.kwh, 0) / PREDICTIONS.length).toFixed(1),
    sub: "kWh per prediksi",
    positive: null,
    accent: "text-amber-600 bg-amber-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Akurasi Model",
    value: "94.2%",
    sub: "R² = 0.942",
    positive: true,
    accent: "text-purple-600 bg-purple-50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export function AdminOverview({ onNavChange }: Props) {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Ringkasan aktivitas sistem WattSmart</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-3.5 py-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Juni 2026
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.accent}`}>
                {card.icon}
              </div>
              {card.positive !== null && (
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  card.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                  {card.positive ? "↑" : "↓"}
                </span>
              )}
            </div>
            <p className="font-syne text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
            <p className="text-[11px] text-gray-300 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="mb-5">
            <h3 className="font-syne font-bold text-gray-900 text-sm">Prediksi per Hari</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">7 hari terakhir</p>
          </div>
          <MiniBarChart data={BAR_DATA} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-syne font-bold text-gray-900 text-sm mb-1">Distribusi Kategori</h3>
          <p className="text-[11px] text-gray-400 mb-4">Dari total prediksi</p>
          <DonutChart data={DONUT_DATA} />
        </div>
      </div>

      {/* Recent predictions table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-syne font-bold text-gray-900 text-sm">Prediksi Terbaru</h3>
          <button
            onClick={() => onNavChange("predictions")}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Lihat semua →
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["ID", "Pengguna", "Tanggal", "kWh", "Tagihan", "Kategori"].map(h => (
                <th key={h} className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PREDICTIONS.slice(0, 5).map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 pr-4 text-[12px] font-mono text-gray-400">{p.id}</td>
                <td className="py-3 pr-4">
                  <p className="font-medium text-gray-800 text-[13px]">{p.user}</p>
                  <p className="text-[11px] text-gray-400">{p.email}</p>
                </td>
                <td className="py-3 pr-4 text-[12px] text-gray-500">{p.tanggal}</td>
                <td className="py-3 pr-4 font-syne font-bold text-gray-900 text-[13px]">{p.kwh}</td>
                <td className="py-3 pr-4 text-[12px] text-gray-600">{formatRupiah(p.tagihan)}</td>
                <td className="py-3"><KategoriBadge kategori={p.kategori} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}