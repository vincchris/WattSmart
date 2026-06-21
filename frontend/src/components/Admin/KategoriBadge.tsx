type Props = { kategori: string };

const MAP: Record<string, string> = {
  Hemat:          "bg-emerald-50 text-emerald-700 border-emerald-200",
  Normal:         "bg-blue-50 text-blue-700 border-blue-200",
  Boros:          "bg-amber-50 text-amber-700 border-amber-200",
  "Sangat Boros": "bg-red-50 text-red-700 border-red-200",
};

export function KategoriBadge({ kategori }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${MAP[kategori] ?? ""}`}>
      {kategori}
    </span>
  );
}