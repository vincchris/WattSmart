"use client";

export function InputStepRumah({ form, onChange }: any) {
  return (
    <div
      className="rounded-2xl p-6 space-y-5 border"
      style={{ background: "#0f1420", borderColor: "rgba(255,255,255,0.05)" }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: "rgba(0,229,160,0.1)" }}
        >
          🏠
        </div>
        <div>
          <h2 className="font-syne font-bold text-white">Informasi Rumah</h2>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Data dasar hunian Anda
          </p>
        </div>
      </div>

      {/* Luas Rumah */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
          Luas Rumah
        </label>
        <div className="relative">
          <input
            type="number"
            value={form.luas_rumah}
            min={10}
            onChange={(e) => onChange({ luas_rumah: Number(e.target.value) })}
            className="input-field pr-12"
            placeholder="72"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            m²
          </span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
          Total luas bangunan yang menggunakan listrik
        </p>
      </div>

      {/* Jumlah Penghuni */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
          Jumlah Penghuni
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange({ jumlah_penghuni: Math.max(1, form.jumlah_penghuni - 1) })}
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
          >
            −
          </button>
          <div className="flex-1 text-center">
            <span className="font-syne text-3xl font-bold text-white">{form.jumlah_penghuni}</span>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>orang</p>
          </div>
          <button
            type="button"
            onClick={() => onChange({ jumlah_penghuni: Math.min(20, form.jumlah_penghuni + 1) })}
            className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
          >
            +
          </button>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
          Berapa orang yang tinggal di rumah secara tetap
        </p>
      </div>

      {/* Daya Listrik */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
          Daya Listrik Terpasang
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[900, 1300, 2200, 3500].map((daya) => {
            const isSelected = form.daya_listrik === daya;
            return (
              <button
                key={daya}
                type="button"
                onClick={() => onChange({ daya_listrik: daya })}
                className="py-2.5 rounded-xl border text-sm font-medium transition-all"
                style={{
                  background: isSelected ? "rgba(0,229,160,0.1)" : "rgba(255,255,255,0.03)",
                  borderColor: isSelected ? "rgba(0,229,160,0.35)" : "rgba(255,255,255,0.08)",
                  color: isSelected ? "#00e5a0" : "rgba(255,255,255,0.5)",
                }}
              >
                {daya}
                <span className="block text-[9px] opacity-60">VA</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
          Kapasitas listrik PLN yang terpasang di rumah Anda
        </p>
      </div>

      {/* Golongan Tarif */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
          Golongan Tarif Listrik
        </label>
        <select
          className="input-field"
          value={form.golongan_tarif}
          onChange={(e) => onChange({ golongan_tarif: e.target.value })}
        >
          <option value="R-1/TR" className="text-black">R-1/TR — Rumah Tangga Kecil (≤ 2.200 VA)</option>
          <option value="R-2/TR" className="text-black">R-2/TR — Rumah Tangga Menengah (2.200–6.600 VA)</option>
          <option value="R-3/TR" className="text-black">R-3/TR — Rumah Tangga Besar (&gt; 6.600 VA)</option>
        </select>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
          Digunakan untuk menghitung estimasi tagihan berdasarkan tarif PLN
        </p>
      </div>

      {/* Info box */}
      <div
        className="rounded-xl p-3 flex gap-2.5"
        style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={2} className="w-4 h-4 flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(147,197,253,0.75)" }}>
          Data ini digunakan sebagai faktor bobot dalam model regresi linear untuk menyesuaikan prediksi
          konsumsi berdasarkan karakteristik rumah Anda.
        </p>
      </div>
    </div>
  );
}