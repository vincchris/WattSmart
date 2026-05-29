"use client";

type ToggleCardProps = {
  icon: string;
  label: string;
  description: string;
  watt: number;
  value: boolean;
  onToggle: (v: boolean) => void;
};

type FormTambahan = {
  luas_rumah: number;
  jumlah_penghuni: number;
  daya_listrik: number;
  golongan_tarif: string;
  jumlah_ac: number;
  jam_ac_per_hari: number;
  jumlah_kulkas: number;
  jumlah_tv: number;
  jam_tv_per_hari: number;
  jumlah_lampu: number;
  jam_lampu_per_hari: number;
  jumlah_mesin_cuci: number;
  frekuensi_cuci_per_minggu: number;
  jumlah_komputer: number;
  jam_komputer_per_hari: number;
  water_heater: boolean;
  dispenser: boolean;
  microwave: boolean;
};

type InputStepTambahanProps = {
  form: FormTambahan;
  onChange: (updates: Partial<FormTambahan>) => void;
};

function ToggleCard({ icon, label, description, watt, value, onToggle }: ToggleCardProps) {
  return (
    <div
      onClick={() => onToggle(!value)}
      className="p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none"
      style={{
        background: value ? "rgba(0,229,160,0.07)" : "rgba(255,255,255,0.025)",
        borderColor: value ? "rgba(0,229,160,0.25)" : "rgba(255,255,255,0.06)",
      }}
    >
      {/* Top row: icon + toggle switch */}
      <div className="flex items-start justify-between mb-2.5">
        <span className="text-2xl">{icon}</span>
        <div
          className="relative rounded-full transition-all duration-300"
          style={{
            width: 36,
            height: 20,
            background: value ? "#00e5a0" : "rgba(255,255,255,0.12)",
          }}
        >
          <div
            className="absolute top-0.5 rounded-full bg-white shadow transition-all duration-300"
            style={{
              width: 16,
              height: 16,
              left: value ? 18 : 2,
            }}
          />
        </div>
      </div>

      <p
        className="font-medium text-sm"
        style={{ color: value ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
      >
        {label}
      </p>
      <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
        {description}
      </p>
      <p
        className="text-[10px] mt-2 font-medium"
        style={{ color: value ? "rgba(0,229,160,0.6)" : "rgba(255,255,255,0.18)" }}
      >
        ~{watt}W
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between text-sm py-2"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <span style={{ color: "rgba(255,255,255,0.38)" }}>{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

export function InputStepTambahan({ form, onChange }: InputStepTambahanProps) {
  const tambahanList = [
    form.water_heater && "Water Heater",
    form.dispenser && "Dispenser",
    form.microwave && "Microwave",
  ].filter(Boolean) as string[];

  const estimasiKwh = (
    form.jumlah_ac * form.jam_ac_per_hari * 0.9 * 30 +
    form.jumlah_kulkas * 24 * 0.1 * 30 +
    form.jumlah_tv * form.jam_tv_per_hari * 0.08 * 30 +
    form.jumlah_lampu * form.jam_lampu_per_hari * 0.01 * 30 +
    form.jumlah_mesin_cuci * form.frekuensi_cuci_per_minggu * 0.5 * 4 +
    form.jumlah_komputer * form.jam_komputer_per_hari * 0.12 * 30 +
    (form.water_heater ? 2 * 30 : 0) +
    (form.dispenser ? 0.3 * 24 * 30 : 0) +
    (form.microwave ? 1 * 0.5 * 30 : 0)
  ).toFixed(1);

  return (
    <div className="space-y-4">

      {/* Header */}
      <div
        className="rounded-2xl p-4 border"
        style={{ background: "#0f1420", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(139,92,246,0.1)" }}
          >
            ⚡
          </div>
          <div>
            <h2 className="font-syne font-bold text-white">Perangkat Tambahan</h2>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Pilih perangkat yang Anda miliki di rumah
            </p>
          </div>
        </div>
      </div>

      {/* Toggle cards */}
      <div className="grid grid-cols-3 gap-3">
        <ToggleCard
          icon="🚿"
          label="Water Heater"
          description="Pemanas air listrik"
          watt={2000}
          value={form.water_heater}
          onToggle={(v) => onChange({ water_heater: v })}
        />
        <ToggleCard
          icon="💧"
          label="Dispenser"
          description="Galon panas / dingin"
          watt={300}
          value={form.dispenser}
          onToggle={(v) => onChange({ dispenser: v })}
        />
        <ToggleCard
          icon="🍕"
          label="Microwave"
          description="Oven microwave"
          watt={1000}
          value={form.microwave}
          onToggle={(v) => onChange({ microwave: v })}
        />
      </div>

      {/* Ringkasan Input */}
      <div
        className="rounded-2xl p-5 border"
        style={{ background: "#0f1420", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-syne font-semibold text-white text-sm">Ringkasan Input</h3>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
            style={{
              background: "rgba(0,229,160,0.08)",
              borderColor: "rgba(0,229,160,0.2)",
              color: "#00e5a0",
            }}
          >
            ✓ Data Lengkap
          </span>
        </div>

        <div>
          <SummaryRow label="Luas Rumah" value={`${form.luas_rumah} m²`} />
          <SummaryRow label="Jumlah Penghuni" value={`${form.jumlah_penghuni} orang`} />
          <SummaryRow label="Daya Listrik" value={`${form.daya_listrik} VA`} />
          <SummaryRow label="Golongan Tarif" value={form.golongan_tarif} />
          <SummaryRow label="AC" value={`${form.jumlah_ac} unit × ${form.jam_ac_per_hari} jam/hari`} />
          <SummaryRow label="Kulkas" value={`${form.jumlah_kulkas} unit (24 jam)`} />
          <SummaryRow label="TV" value={`${form.jumlah_tv} unit × ${form.jam_tv_per_hari} jam/hari`} />
          <SummaryRow label="Lampu" value={`${form.jumlah_lampu} buah × ${form.jam_lampu_per_hari} jam/hari`} />
          <SummaryRow label="Mesin Cuci" value={`${form.jumlah_mesin_cuci} unit × ${form.frekuensi_cuci_per_minggu}×/minggu`} />
          <SummaryRow label="Komputer" value={`${form.jumlah_komputer} unit × ${form.jam_komputer_per_hari} jam/hari`} />
          <SummaryRow
            label="Perangkat Tambahan"
            value={tambahanList.length > 0 ? tambahanList.join(", ") : "Tidak ada"}
          />
        </div>

        {/* Estimasi kasar */}
        <div
          className="mt-4 rounded-xl p-3 flex items-center justify-between"
          style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.12)" }}
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(0,229,160,0.6)" }}>
              Estimasi Kasar
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Sebelum diproses model ML
            </p>
          </div>
          <div className="text-right">
            <p className="font-syne font-bold text-[#00e5a0] text-xl">{estimasiKwh}</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>kWh/bulan</p>
          </div>
        </div>
      </div>

      {/* Final info */}
      <div
        className="rounded-xl p-3 flex gap-2.5"
        style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2} className="w-4 h-4 flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(147,197,253,0.75)" }}>
          Semua data di atas akan dikirim ke model regresi linear berganda di backend FastAPI
          untuk menghasilkan prediksi konsumsi listrik yang akurat.
        </p>
      </div>

    </div>
  );
}