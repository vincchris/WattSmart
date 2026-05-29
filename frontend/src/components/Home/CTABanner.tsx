"use client";

import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-12 text-center border border-[#00e5a0]/15"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(0,184,255,0.05) 50%, rgba(0,0,0,0) 100%)",
          }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#00e5a0] opacity-[0.04] blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-blue-500 opacity-[0.04] blur-[60px] pointer-events-none" />

          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.2)" }}
          >
            <svg viewBox="0 0 24 24" fill="#00e5a0" className="w-8 h-8">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          <h2 className="font-syne text-4xl font-bold text-white mb-4">
            Siap Menghemat Listrik?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed mb-8">
            Ribuan rumah tangga sudah menggunakan WattSmart untuk memantau dan mengoptimalkan
            konsumsi listrik mereka. Bergabunglah sekarang, gratis.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/input"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#00e5a0] text-[#070a0f] font-syne font-bold hover:bg-[#00c98e] transition-all active:scale-[0.98] shadow-[0_0_40px_rgba(0,229,160,0.2)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Mulai Prediksi Gratis
            </Link>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
            >
              Lihat Riwayat
            </Link>
          </div>

          {/* Feature list */}
          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              "✓ Tidak perlu daftar",
              "✓ Hasil langsung",
              "✓ Data tersimpan otomatis",
            ].map((text) => (
              <span key={text} className="text-xs text-white/35 font-medium">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}