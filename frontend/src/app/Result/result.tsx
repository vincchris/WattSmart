"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ResultBreakdownChart } from "../../components/Result/ResultBreakdownChart";
import { ResultEfficiencyGauge } from "../../components/Result/ResultEfficiencyGauge";
import { ResultComparison } from "../../components/Result/ResultComparison";

type ApplianceBreakdown = {
  nama: string;
  kwh: number;
  persentase: number;
  biaya: number;
  icon: string;
};

type PredictionResult = {
  prediksi_kwh: number;
  prediksi_tagihan: number;
  confidence: number;
  kategori: "Hemat" | "Normal" | "Boros" | "Sangat Boros";
  persentase_vs_rata_rata: number;
  breakdown: ApplianceBreakdown[];
};

const DEMO_RESULT: PredictionResult = {
  prediksi_kwh: 312.4,
  prediksi_tagihan: 449856,
  confidence: 94.2,
  kategori: "Normal",
  persentase_vs_rata_rata: 8.5,
  breakdown: [
    { nama: "AC", kwh: 129.6, persentase: 41.5, biaya: 186624, icon: "❄️" },
    { nama: "Lampu", kwh: 48.0, persentase: 15.4, biaya: 69120, icon: "💡" },
    { nama: "Kulkas", kwh: 36.0, persentase: 11.5, biaya: 51840, icon: "🧊" },
    { nama: "TV", kwh: 30.0, persentase: 9.6, biaya: 43200, icon: "📺" },
    { nama: "Komputer", kwh: 28.8, persentase: 9.2, biaya: 41472, icon: "💻" },
    {
      nama: "Mesin Cuci",
      kwh: 21.0,
      persentase: 6.7,
      biaya: 30240,
      icon: "🌀",
    },
    { nama: "Lainnya", kwh: 19.0, persentase: 6.1, biaya: 27360, icon: "⚡" },
  ],
};

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function KategoriBadge({ kategori }: { kategori: string }) {
  const map: Record<string, { bg: string; color: string; dot: string }> = {
    Hemat: { bg: "rgba(34,197,94,0.1)", color: "#22c55e", dot: "#22c55e" },
    Normal: { bg: "rgba(59,130,246,0.1)", color: "#3b82f6", dot: "#3b82f6" },
    Boros: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", dot: "#f59e0b" },
    "Sangat Boros": {
      bg: "rgba(239,68,68,0.1)",
      color: "#ef4444",
      dot: "#ef4444",
    },
  };
  const cfg = map[kategori] ?? map["Normal"];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
      style={{
        background: cfg.bg,
        color: cfg.color,
        borderColor: cfg.color + "33",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: cfg.dot }}
      />
      {kategori}
    </span>
  );
}

function getKategoriGradient(kategori: string): string {
  const map: Record<string, string> = {
    Hemat: "rgba(34,197,94,0.08)",
    Normal: "rgba(59,130,246,0.08)",
    Boros: "rgba(245,158,11,0.08)",
    "Sangat Boros": "rgba(239,68,68,0.08)",
  };
  return map[kategori] ?? map["Normal"];
}

export default function ResultPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("prediction_result");
    setResult(stored ? JSON.parse(stored) : DEMO_RESULT);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/10 border-t-[#00e5a0] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Memproses prediksi...
          </p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#070a0f] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <a
              href="/input"
              className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-4"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-3.5 h-3.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Ubah Data Input
            </a>
            <h1 className="font-syne text-3xl font-bold text-white">
              Hasil Prediksi
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Estimasi konsumsi listrik bulanan rumah Anda
            </p>
          </div>
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-syne font-bold text-sm transition-all"
            style={{ background: "#00e5a0", color: "#070a0f" }}
          >
            💡 Lihat Rekomendasi
          </Link>
        </div>

        {/* Main Result Card */}
        <div
          className="rounded-2xl p-8 mb-5 relative overflow-hidden border"
          style={{
            background: getKategoriGradient(result.kategori),
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.015)",
              filter: "blur(40px)",
            }}
          />

          <div className="grid grid-cols-3 gap-6 relative z-10">
            {/* KWh + Tagihan */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <KategoriBadge kategori={result.kategori} />
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Akurasi model {result.confidence}%
                </span>
              </div>

              <p
                className="text-sm mb-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Estimasi Konsumsi Listrik
              </p>
              <p
                className="font-syne font-extrabold text-white leading-none"
                style={{ fontSize: 56 }}
              >
                {result.prediksi_kwh.toFixed(1)}
                <span
                  className="text-xl font-normal ml-2"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  kWh
                </span>
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                per bulan
              </p>

              <div className="flex items-center gap-6 mt-6">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Tagihan Listrik
                  </p>
                  <p className="font-syne font-bold text-white text-xl">
                    {formatRupiah(result.prediksi_tagihan)}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    estimasi per bulan
                  </p>
                </div>

                <div
                  className="w-px h-10"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />

                <div>
                  <p
                    className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    vs Rata-rata Nasional
                  </p>
                  <p
                    className="font-syne font-bold text-xl"
                    style={{
                      color:
                        result.persentase_vs_rata_rata > 0
                          ? "#f59e0b"
                          : "#22c55e",
                    }}
                  >
                    {result.persentase_vs_rata_rata > 0 ? "+" : ""}
                    {result.persentase_vs_rata_rata.toFixed(1)}%
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {result.persentase_vs_rata_rata > 0
                      ? "di atas rata-rata"
                      : "di bawah rata-rata"}
                  </p>
                </div>
              </div>
            </div>

            {/* Gauge */}
            <div className="flex items-center justify-center">
              <ResultEfficiencyGauge kategori={result.kategori} />
            </div>
          </div>
        </div>

        {/* Breakdown + Comparison */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "#0f1420",
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >
            <h3 className="font-syne font-semibold text-white mb-5">
              Distribusi per Perangkat
            </h3>
            <ResultBreakdownChart data={result.breakdown} />
          </div>

          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "#0f1420",
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >
            <h3 className="font-syne font-semibold text-white mb-5">
              Perbandingan Konsumsi
            </h3>
            <ResultComparison kwh={result.prediksi_kwh} />
          </div>
        </div>

        {/* Detail table */}
        <div
          className="rounded-2xl p-6 mb-5 border"
          style={{
            background: "#0f1420",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          <h3 className="font-syne font-semibold text-white mb-4">
            Detail Konsumsi per Perangkat
          </h3>

          {/* Table header */}
          <div
            className="grid grid-cols-4 gap-4 pb-2 mb-1 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              color: "rgba(255,255,255,0.3)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span>Perangkat</span>
            <span className="text-right">kWh/bulan</span>
            <span className="text-right">Porsi</span>
            <span className="text-right">Biaya/bulan</span>
          </div>

          {result.breakdown.map((item) => (
            <div
              key={item.nama}
              className="grid grid-cols-4 gap-4 py-3 text-sm"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>
                  {item.nama}
                </span>
              </div>

              <div className="text-right">
                <span className="text-white font-medium">
                  {item.kwh.toFixed(1)}
                </span>
                <span
                  className="text-xs ml-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  kWh
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <div
                  className="w-14 h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.persentase}%`,
                      background: "#00e5a0",
                    }}
                  />
                </div>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {item.persentase.toFixed(0)}%
                </span>
              </div>

              <div
                className="text-right text-xs"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {formatRupiah(item.biaya)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/recommendations"
            className="flex-1 py-4 rounded-xl font-syne font-bold text-sm text-center transition-all"
            style={{ background: "#00e5a0", color: "#070a0f" }}
          >
            💡 Lihat Rekomendasi Efisiensi
          </Link>
          <Link
            href="/history"
            className="px-6 py-4 rounded-xl font-medium text-sm text-center border transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.8)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            📊 Riwayat
          </Link>
          <Link
            href="/input"
            className="px-6 py-4 rounded-xl font-medium text-sm text-center border transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.8)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            🔄 Hitung Ulang
          </Link>
        </div>
      </div>
    </div>
  );
}
