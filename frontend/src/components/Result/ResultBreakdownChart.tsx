"use client";

type ApplianceBreakdown = {
  nama: string;
  kwh: number;
  persentase: number;
  biaya: number;
  icon: string;
};

type ResultBreakdownChartProps = {
  data: ApplianceBreakdown[];
};

const COLORS = ["#00e5a0", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

export function ResultBreakdownChart({ data }: ResultBreakdownChartProps) {
  const sorted = [...data].sort((a, b) => b.kwh - a.kwh);
  const max = sorted[0]?.kwh ?? 1;

  return (
    <div className="space-y-3">
      {sorted.map((item, i) => (
        <div key={item.nama} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.65)" }}>{item.nama}</span>
            </div>
            <span className="font-syne font-semibold text-white">
              {item.persentase.toFixed(1)}%
            </span>
          </div>

          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(item.kwh / max) * 100}%`,
                background: COLORS[i % COLORS.length],
                boxShadow: `0 0 8px ${COLORS[i % COLORS.length]}40`,
              }}
            />
          </div>

          <p className="text-[10px] text-right" style={{ color: "rgba(255,255,255,0.28)" }}>
            {item.kwh.toFixed(1)} kWh
          </p>
        </div>
      ))}
    </div>
  );
}