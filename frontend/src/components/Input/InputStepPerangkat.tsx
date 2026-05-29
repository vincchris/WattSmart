"use client";

type DeviceRowProps = {
  icon: string;
  label: string;
  subLabel?: string;
  watt?: number;
  count: number;
  hours: number;
  onCountChange: (v: number) => void;
  onHoursChange: (v: number) => void;
  hoursLabel?: string;
};

type FormPerangkat = {
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
};

type InputStepPerangkatProps = {
  form: FormPerangkat;
  onChange: (updates: Partial<FormPerangkat>) => void;
};

function DeviceRow({
  icon,
  label,
  subLabel,
  watt,
  count,
  hours,
  onCountChange,
  onHoursChange,
  hoursLabel = "jam/hari",
}: DeviceRowProps) {
  return (
    <div
      className="p-4 rounded-xl border transition-all"
      style={{
        background: "rgba(255,255,255,0.025)",
        borderColor: count > 0 ? "rgba(0,229,160,0.12)" : "rgba(255,255,255,0.06)",
      }}
    >
      {/* Device info */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{label}</p>
          {subLabel && (
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              {subLabel}
            </p>
          )}
        </div>
        {watt && (
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: count > 0 ? "rgba(0,229,160,0.1)" : "rgba(255,255,255,0.05)",
              color: count > 0 ? "rgba(0,229,160,0.7)" : "rgba(255,255,255,0.25)",
            }}
          >
            ~{watt}W
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Jumlah unit */}
        <div>
          <p className="text-[10px] mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            Jumlah Unit
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onCountChange(Math.max(0, count - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              −
            </button>
            <span className="flex-1 text-center font-syne font-bold text-white text-lg">
              {count}
            </span>
            <button
              type="button"
              onClick={() => onCountChange(Math.min(20, count + 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              +
            </button>
          </div>
        </div>

        {/* Durasi */}
        <div>
          <p className="text-[10px] mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {hoursLabel}
          </p>
          <input
            type="number"
            value={hours}
            min={0}
            max={hoursLabel === "jam/hari" ? 24 : 30}
            onChange={(e) => onHoursChange(Number(e.target.value))}
            disabled={count === 0}
            className="input-field text-center py-2 text-sm"
            style={{ opacity: count === 0 ? 0.35 : 1 }}
          />
        </div>
      </div>

      {/* Estimasi konsumsi sederhana */}
      {count > 0 && watt && hoursLabel === "jam/hari" && (
        <p className="mt-2 text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          ≈ {((count * watt * hours * 30) / 1000).toFixed(1)} kWh/bulan
        </p>
      )}
    </div>
  );
}

export function InputStepPerangkat({ form, onChange }: InputStepPerangkatProps) {
  return (
    <div className="space-y-3">
      {/* Header card */}
      <div
        className="rounded-2xl p-4 border"
        style={{ background: "#0f1420", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(245,158,11,0.1)" }}
          >
            🔌
          </div>
          <div>
            <h2 className="font-syne font-bold text-white">Perangkat Elektronik Utama</h2>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Masukkan jumlah unit dan rata-rata durasi penggunaan per hari
            </p>
          </div>
        </div>
      </div>

      {/* AC */}
      <DeviceRow
        icon="❄️"
        label="AC / Pendingin Udara"
        subLabel="Air Conditioner"
        watt={900}
        count={form.jumlah_ac}
        hours={form.jam_ac_per_hari}
        onCountChange={(v) => onChange({ jumlah_ac: v })}
        onHoursChange={(v) => onChange({ jam_ac_per_hari: v })}
      />

      {/* Kulkas */}
      <DeviceRow
        icon="🧊"
        label="Kulkas"
        subLabel="Refrigerator — menyala 24 jam"
        watt={100}
        count={form.jumlah_kulkas}
        hours={24}
        onCountChange={(v) => onChange({ jumlah_kulkas: v })}
        onHoursChange={() => {}}
        hoursLabel="jam/hari (tetap)"
      />

      {/* TV */}
      <DeviceRow
        icon="📺"
        label="Televisi"
        subLabel="TV LED / Smart TV"
        watt={80}
        count={form.jumlah_tv}
        hours={form.jam_tv_per_hari}
        onCountChange={(v) => onChange({ jumlah_tv: v })}
        onHoursChange={(v) => onChange({ jam_tv_per_hari: v })}
      />

      {/* Lampu */}
      <DeviceRow
        icon="💡"
        label="Lampu"
        subLabel="LED / Neon (rata-rata per rumah)"
        watt={10}
        count={form.jumlah_lampu}
        hours={form.jam_lampu_per_hari}
        onCountChange={(v) => onChange({ jumlah_lampu: v })}
        onHoursChange={(v) => onChange({ jam_lampu_per_hari: v })}
      />

      {/* Mesin Cuci */}
      <DeviceRow
        icon="🌀"
        label="Mesin Cuci"
        subLabel="Washing Machine"
        watt={500}
        count={form.jumlah_mesin_cuci}
        hours={form.frekuensi_cuci_per_minggu}
        onCountChange={(v) => onChange({ jumlah_mesin_cuci: v })}
        onHoursChange={(v) => onChange({ frekuensi_cuci_per_minggu: v })}
        hoursLabel="kali/minggu"
      />

      {/* Komputer */}
      <DeviceRow
        icon="💻"
        label="Komputer / Laptop"
        subLabel="Desktop / Notebook"
        watt={120}
        count={form.jumlah_komputer}
        hours={form.jam_komputer_per_hari}
        onCountChange={(v) => onChange({ jumlah_komputer: v })}
        onHoursChange={(v) => onChange({ jam_komputer_per_hari: v })}
      />

      {/* Info */}
      <div
        className="rounded-xl p-3 flex gap-2.5"
        style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2} className="w-4 h-4 flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(147,197,253,0.75)" }}>
          Estimasi kWh/bulan di tiap perangkat dihitung otomatis dan akan digunakan
          model regresi sebagai fitur input prediksi.
        </p>
      </div>
    </div>
  );
}