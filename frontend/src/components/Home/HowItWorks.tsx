"use client";

import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Input Data Rumah",
    description:
      "Masukkan informasi rumah Anda: luas, jumlah penghuni, dan daftar perangkat elektronik beserta durasi penggunaan hariannya.",
    icon: "📋",
    href: "/input",
  },
  {
    number: "02",
    title: "Proses ML",
    description:
      "Algoritma regresi linear berganda memproses data Anda menggunakan model yang telah dilatih pada ribuan data rumah tangga nyata.",
    icon: "🤖",
    href: null,
  },
  {
    number: "03",
    title: "Hasil Prediksi",
    description:
      "Dapatkan estimasi konsumsi listrik dalam kWh, perkiraan tagihan, grafik breakdown per perangkat, dan level efisiensi.",
    icon: "📊",
    href: "/result",
  },
  {
    number: "04",
    title: "Rekomendasi",
    description:
      "Terima saran efisiensi energi yang dipersonalisasi: perangkat mana yang perlu dioptimalkan dan tips praktis penghematan.",
    icon: "💡",
    href: "/recommendations",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#08090e]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#00e5a0] text-xs font-semibold uppercase tracking-widest mb-3">
            Alur Penggunaan
          </p>
          <h2 className="font-syne text-4xl font-bold text-white mb-4">
            Cara Kerja WattSmart
          </h2>
          <p className="text-white/45 max-w-lg mx-auto text-sm leading-relaxed">
            Empat langkah sederhana dari input data hingga mendapatkan rekomendasi efisiensi energi.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-12 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col items-center text-center group">
                {/* Node */}
                <div className="relative mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl relative z-10 border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: i === 0 ? "rgba(0,229,160,0.12)" : "rgba(255,255,255,0.04)",
                      borderColor: i === 0 ? "rgba(0,229,160,0.3)" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#070a0f] border border-white/10 flex items-center justify-center text-[9px] font-bold text-white/40 z-20">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-syne font-bold text-white text-sm mb-2">{step.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{step.description}</p>

                {step.href && (
                  <a
                    href={step.href}
                    className="mt-3 text-[#00e5a0] text-xs font-medium hover:underline underline-offset-2"
                  >
                    Ke halaman →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/input"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#00e5a0] text-[#070a0f] font-syne font-bold hover:bg-[#00c98e] transition-all active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Mulai Sekarang — Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}