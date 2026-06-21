"use client";

const METRICS = [
  { label: "Total Baris Dataset", value: "10.500", icon: "📊" },
  { label: "Jumlah Fitur",         value: "22",      icon: "🔢" },
  { label: "Akurasi Model (R²)",   value: "94.2%",   icon: "🎯" },
  { label: "MAE",                  value: "12.4 kWh", icon: "📉" },
  { label: "RMSE",                 value: "18.7 kWh", icon: "📈" },
  { label: "Terakhir Dilatih",     value: "Jun 2026", icon: "🕐" },
];

const FEATURES = [
  "luas_rumah_m2", "jumlah_penghuni", "daya_listrik_va", "golongan_tarif",
  "jumlah_ac", "jam_ac_per_hari", "jumlah_kulkas", "jumlah_tv",
  "jam_tv_per_hari", "jumlah_lampu", "jam_lampu_per_hari", "jumlah_mesin_cuci",
  "frekuensi_cuci_per_minggu", "jumlah_komputer", "jam_komputer_per_hari",
  "water_heater", "dispenser", "microwave", "suhu_rata_rata_c",
  "kelembaban_pct", "bulan", "total_kwh_per_bulan (target)",
];

export function AdminDataset() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-syne text-2xl font-bold text-gray-900">Dataset & Model</h1>
        <p className="text-sm text-gray-400 mt-0.5">Informasi dataset dan performa model ML</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {METRICS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="font-syne font-bold text-gray-900 text-xl">{s.value}</p>
              <p className="text-[12px] text-gray-400 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-syne font-bold text-gray-900 text-sm mb-4">Fitur Dataset</h3>
        <div className="grid grid-cols-2 gap-2">
          {FEATURES.map((f) => {
            const isTarget = f.includes("target");
            return (
              <div
                key={f}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-mono border ${
                  isTarget
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 font-bold"
                    : "bg-gray-50 border-gray-100 text-gray-600"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isTarget ? "bg-emerald-500" : "bg-gray-300"}`} />
                {f}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn-primary px-5 py-2.5 text-sm">↻ Latih Ulang Model</button>
        <button className="btn-secondary px-5 py-2.5 text-sm">↓ Unduh Dataset CSV</button>
      </div>
    </div>
  );
}