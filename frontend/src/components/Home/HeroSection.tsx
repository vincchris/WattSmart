"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,160,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,160,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#00e5a0] opacity-[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500 opacity-[0.04] blur-[80px] pointer-events-none" />

      {/* Floating energy nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "10%", y: "20%", size: 4, delay: "0s" },
          { x: "85%", y: "15%", size: 6, delay: "0.8s" },
          { x: "20%", y: "75%", size: 3, delay: "1.2s" },
          { x: "75%", y: "70%", size: 5, delay: "0.4s" },
          { x: "50%", y: "10%", size: 3, delay: "1.6s" },
          { x: "90%", y: "50%", size: 4, delay: "2s" },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00e5a0]"
            style={{
              left: node.x,
              top: node.y,
              width: node.size,
              height: node.size,
              opacity: 0.3,
              animation: `pulse 3s ease-in-out ${node.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/8 mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
          <span className="text-[#00e5a0] text-xs font-medium tracking-wide">
            Berbasis Machine Learning & XGBoost
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-syne text-6xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          Prediksi{" "}
          <span
            className="relative"
            style={{
              background: "linear-gradient(135deg, #00e5a0, #00b8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Konsumsi Listrik
          </span>
          <br />
          Rumah Anda
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          Masukkan data perangkat elektronik rumah Anda, dan sistem kami akan
          memprediksi konsumsi listrik bulanan serta memberikan rekomendasi
          efisiensi energi yang dipersonalisasi.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          <Link
            href="/Input"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#00e5a0] text-[#070a0f] font-syne font-bold text-base hover:bg-[#00c98e] transition-all duration-200 active:scale-[0.98] shadow-[0_0_40px_rgba(0,229,160,0.2)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Mulai Prediksi Sekarang
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-medium text-sm transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Pelajari Cara Kerja
          </Link>
        </div>

        {/* Trust indicators */}
        <div
          className="flex items-center justify-center gap-6 mt-12 animate-fade-up"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          {[
            { icon: "🎯", label: "Akurasi 94.2%" },
            { icon: "⚡", label: "Hasil Instan" },
            { icon: "🔒", label: "Data Aman" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-white/35 text-sm">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
        <span className="text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2); opacity: 0.6; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease forwards;
        }
      `}</style>
    </section>
  );
}