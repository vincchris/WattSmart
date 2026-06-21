type Slice = { label: string; value: number; color: string };
type Props = { data: Slice[] };

export function DonutChart({ data }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const size = 120, cx = 60, cy = 60, r = 44;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} className="-rotate-90">
        {data.map((d) => {
          const pct  = d.value / total;
          const dash = pct * circ;
          const el = (
            <circle
              key={d.label}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={16}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset * circ}
            />
          );
          offset += pct;
          return el;
        })}
        <circle cx={cx} cy={cy} r={28} fill="white" />
      </svg>

      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <span className="text-gray-600">{d.label}</span>
            <span className="ml-auto font-semibold text-gray-900 pl-3">
              {((d.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}