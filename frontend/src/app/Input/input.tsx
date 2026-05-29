"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputProgressBar } from "../../components/Input/InputProgressBar";
import { InputStepRumah } from "../../components/Input/InputStepRumah";
import { InputStepPerangkat } from "../../components/Input/InputStepPerangkat";
import { InputStepTambahan } from "../../components/Input/InputStepTambahan";

const STEPS = ["Informasi Rumah", "Perangkat Utama", "Perangkat Tambahan"];

const defaultForm = {
  // Step 1 — Informasi Rumah
  luas_rumah: 72,
  jumlah_penghuni: 4,
  daya_listrik: 1300,
  golongan_tarif: "R-1/TR",

  // Step 2 — Perangkat Utama
  jumlah_ac: 1,
  jam_ac_per_hari: 8,
  jumlah_kulkas: 1,
  jumlah_tv: 2,
  jam_tv_per_hari: 5,
  jumlah_lampu: 10,
  jam_lampu_per_hari: 8,
  jumlah_mesin_cuci: 1,
  frekuensi_cuci_per_minggu: 3,
  jumlah_komputer: 1,
  jam_komputer_per_hari: 4,

  // Step 3 — Perangkat Tambahan
  water_heater: false,
  dispenser: true,
  microwave: false,
};

export default function InputPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (updates) => setForm((prev) => ({ ...prev, ...updates }));

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // TODO: ganti base URL sesuai alamat FastAPI backend
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || "Gagal terhubung ke server");
      }

      const result = await response.json();

      // Simpan hasil + input ke sessionStorage untuk halaman result & history
      sessionStorage.setItem("prediction_result", JSON.stringify(result));
      sessionStorage.setItem("prediction_input", JSON.stringify(form));

      router.push("/Result");
    } catch (err) {
      // Jika FastAPI belum aktif — tetap navigasi dengan flag demo
      // Hapus baris di bawah saat backend sudah siap
      sessionStorage.setItem("prediction_input", JSON.stringify(form));
      sessionStorage.setItem("prediction_demo", "true");
      router.push("/Result");

      // Aktifkan baris ini ketika backend sudah siap:
      // setError(err.message || "Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <a
            href="/Home"
            className="inline-flex items-center gap-2 text-white/35 text-sm hover:text-white/60 transition-colors mb-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Beranda
          </a>

          <h1 className="font-syne text-3xl font-bold text-white">Input Data Rumah</h1>
          <p className="text-white/45 text-sm mt-1.5">
            Lengkapi informasi berikut untuk mendapatkan prediksi yang akurat
          </p>
        </div>

        {/* Step Progress */}
        <InputProgressBar steps={STEPS} currentStep={step} />

        {/* Error */}
        {error && (
          <div className="mt-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="mt-8">
          {step === 0 && <InputStepRumah form={form} onChange={updateForm} />}
          {step === 1 && <InputStepPerangkat form={form} onChange={updateForm} />}
          {step === 2 && <InputStepTambahan form={form} onChange={updateForm} />}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-6">
          {step > 0 && (
            <button onClick={handleBack} className="btn-secondary flex-1">
              ← Sebelumnya
            </button>
          )}

          {step < STEPS.length - 1 ? (
            <button onClick={handleNext} className="btn-primary flex-1">
              Selanjutnya →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex-1 py-4"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#070a0f]/30 border-t-[#070a0f] rounded-full animate-spin" />
                  Menghitung Prediksi...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Hitung Prediksi
                </span>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}