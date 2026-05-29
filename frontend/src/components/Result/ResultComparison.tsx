"use client";

type ResultComparisonProps = {
  kwh: number;
};

type Benchmark = {
  label: string;
  kwh: number;
  color: string;
  highlight?: boolean;
};

export function ResultComparison({ kwh }: ResultComparisonProps) {
  const benchmarks: Benchmark[] = [
    { label: "Rumah Sangat Hemat",  kwh: 150,  color: "#22c55e" },
    { label: "Rata-rata Nasional",  kwh: 288,  color: "#3b82f6" },
    { label: "Konsumsi Anda",       kwh,       color: "#00e5a0", highlight: true },
    { label: "Rata-rata Boros",     kwh: 420,  color: "#f59e0b" },
  ];

  const max = Math.max(...benchmarks.map((b) => b.kwh)) * 1.1;
  const selisih = kwh - 288;

  return (
    <div className="space-y-4">
      {benchmarks.map((b) => (
        <div key={b.label} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: b.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)", fontWeight: b.highlight ? 600 : 400 }}>
              {b.label}{b.highlight && " ★"}
            </span>
            <span className="font-syne font-bold" style={{ color: b.color }}>
              {b.kwh.toFixed(0)} kWh
            </span>
          </div>

          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(b.kwh / max) * 100}%`,
                background: b.color,
                opacity: b.highlight ? 1 : 0.5,
                boxShadow: b.highlight ? `0 0 8px ${b.color}50` : "none",
              }}
            />
          </div>
        </div>
      ))}

      {/* Selisih info */}
      <div
        className="mt-2 rounded-xl p-3 text-xs"
        style={{
          background: selisih > 0 ? "rgba(245,158,11,0.06)" : "rgba(34,197,94,0.06)",
          border: `1px solid ${selisih > 0 ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)"}`,
          color: selisih > 0 ? "rgba(245,158,11,0.85)" : "rgba(34,197,94,0.85)",
        }}
      >
        {selisih > 0
          ? `↑ ${selisih.toFixed(0)} kWh di atas rata-rata nasional. Ada peluang penghematan!`
          : `✓ ${Math.abs(selisih).toFixed(0)} kWh di bawah rata-rata nasional. Konsumsi Anda efisien!`}
      </div>
    </div>
  );
}