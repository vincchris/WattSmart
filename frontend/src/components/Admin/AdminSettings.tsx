"use client";

const SECTIONS = [
  {
    title: "Tarif Listrik PLN",
    fields: [
      { label: "Tarif R-1/TR (Rp/kWh)", value: "1444.70" },
      { label: "Tarif R-2/TR (Rp/kWh)", value: "1699.53" },
      { label: "Tarif R-3/TR (Rp/kWh)", value: "1699.53" },
    ],
  },
  {
    title: "Konfigurasi API",
    fields: [
      { label: "FastAPI Base URL",  value: "http://localhost:8000" },
      { label: "Endpoint Prediksi", value: "/predict" },
      { label: "Endpoint History",  value: "/history" },
    ],
  },
];

export function AdminSettings() {
  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-syne text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-sm text-gray-400 mt-0.5">Konfigurasi sistem WattSmart</p>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-syne font-bold text-gray-900 text-sm mb-4 pb-3 border-b border-gray-100">
            {section.title}
          </h3>
          <div className="space-y-3">
            {section.fields.map((f) => (
              <div key={f.label}>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
                  {f.label}
                </label>
                <input
                  type="text"
                  defaultValue={f.value}
                  className="input-field h-10 text-[13px]"
                />
              </div>
            ))}
          </div>
          <button className="btn-primary px-4 py-2 text-sm mt-4">Simpan</button>
        </div>
      ))}
    </div>
  );
}