type Bar = { label: string; value: number };
type Props = { data: Bar[] };

export function MiniBarChart({ data }: Props) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-[10px] text-gray-400 font-medium">{d.value}</span>
          <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: `${(d.value / max) * 88}px`,
              background: i === data.length - 1 ? "#10b981" : "#d1fae5",
            }}
          />
          <span className="text-[10px] text-gray-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}