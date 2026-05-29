"use client";

const benefits = [
  {
    icon: "⚡",
    title: "Prediksi Akurat",
    description:
      "Model regresi linear berganda yang dilatih pada ribuan data rumah tangga Indonesia menghasilkan prediksi yang sangat akurat.",
    color: "#00e5a0",
    bg: "rgba(0,229,160,0.06)",
    border: "rgba(0,229,160,0.15)",
  },
  {
    icon: "💡",
    title: "Rekomendasi Cerdas",
    description:
      "Dapatkan saran efisiensi energi yang dipersonalisasi berdasarkan pola konsumsi unik rumah Anda.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.15)",
  },
  {
    icon: "📊",
    title: "Visualisasi Lengkap",
    description:
      "Grafik interaktif menampilkan breakdown konsumsi per perangkat, tren bulanan, dan perbandingan efisiensi.",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.15)",
  },
  {
    icon: "💰",
    title: "Hemat Tagihan",
    description:
      "Ketahui estimasi tagihan listrik bulanan dan potensi penghematan yang bisa Anda raih dengan mudah.",
    color: "#ec4899",
    bg: "rgba(236,72,153,0.06)",
    border: "rgba(236,72,153,0.15)",
  },
  {
    icon: "🔍",
    title: "Deteksi Perangkat Boros",
    description:
      "Identifikasi perangkat elektronik mana yang paling banyak mengonsumsi listrik di rumah Anda.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.15)",
  },
  {
    icon: "📱",
    title: "Mudah Digunakan",
    description:
      "Antarmuka yang intuitif memungkinkan siapa saja memasukkan data dan mendapatkan prediksi dalam hitungan detik.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.06)",
    border: "rgba(6,182,212,0.15)",
  },
];

export function BenefitCards() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#00e5a0] text-xs font-semibold uppercase tracking-widest mb-3">
            Kenapa WattSmart?
          </p>
          <h2 className="font-syne text-4xl font-bold text-white mb-4">
            Manfaat Menggunakan Sistem Ini
          </h2>
          <p className="text-white/45 max-w-lg mx-auto text-sm leading-relaxed">
            Dari prediksi hingga rekomendasi, semua yang Anda butuhkan untuk mengelola
            konsumsi listrik rumah tangga ada di sini.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{
                background: benefit.bg,
                borderColor: benefit.border,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top left, ${benefit.color}10, transparent 70%)`,
                }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${benefit.color}15` }}
              >
                {benefit.icon}
              </div>

              <h3 className="font-syne font-bold text-white text-base mb-2">
                {benefit.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}