"use client";

type ResultEfficiencyGaugeProps = {
  kategori: string;
};

type KategoriConfig = {
  color: string;
  score: number;
  label: string;
};

const KATEGORI_CONFIG: Record<string, KategoriConfig> = {
  Hemat:          { color: "#22c55e", score: 90, label: "Sangat Efisien" },
  Normal:         { color: "#3b82f6", score: 65, label: "Efisiensi Normal" },
  Boros:          { color: "#f59e0b", score: 35, label: "Kurang Efisien" },
  "Sangat Boros": { color: "#ef4444", score: 10, label: "Tidak Efisien" },
};

export function ResultEfficiencyGauge({ kategori }: ResultEfficiencyGaugeProps) {
  const config = KATEGORI_CONFIG[kategori] ?? KATEGORI_CONFIG["Normal"];

  const size = 150;
  const cx = size / 2;
  const cy = size * 0.62;
  const r = 56;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcX1 = cx + r * Math.cos(toRad(-180));
  const arcY1 = cy + r * Math.sin(toRad(-180));
  const arcX2 = cx + r * Math.cos(toRad(0));
  const arcY2 = cy + r * Math.sin(toRad(0));
  const circumference = Math.PI * r;

  const needleAngle = -180 + (config.score / 100) * 180;
  const nx = cx + (r - 10) * Math.cos(toRad(needleAngle));
  const ny = cy + (r - 10) * Math.sin(toRad(needleAngle));

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.68} viewBox={`0 0 ${size} ${size * 0.68}`}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#22c55e" />
            <stop offset="40%"  stopColor="#3b82f6" />
            <stop offset="70%"  stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={`M ${arcX1} ${arcY1} A ${r} ${r} 0 0 1 ${arcX2} ${arcY2}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={14}
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d={`M ${arcX1} ${arcY1} A ${r} ${r} 0 0 1 ${arcX2} ${arcY2}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={`${(config.score / 100) * circumference} ${circumference}`}
        />

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={nx} y2={ny}
          stroke={config.color}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={5} fill={config.color} />
      </svg>

      <div className="text-center -mt-1">
        <p className="font-syne font-bold text-2xl" style={{ color: config.color }}>
          {config.score}
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          {config.label}
        </p>
      </div>
    </div>
  );
}