"use client";

export function StatsSection() {
  const stats = [
    { value: "94.2%", label: "Akurasi Prediksi", sub: "Regresi Linear Berganda" },
    { value: "10K+", label: "Data Training", sub: "Rumah tangga Indonesia" },
    { value: "30%", label: "Rata-rata Penghematan", sub: "Dengan rekomendasi kami" },
    { value: "< 1s", label: "Waktu Prediksi", sub: "Hasil instan real-time" },
  ];

  return (
    <section className="relative py-16 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p
                className="font-syne text-4xl font-extrabold mb-1"
                style={{
                  background: "linear-gradient(135deg, #00e5a0, #00b8ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </p>
              <p className="text-white font-semibold text-sm">{stat.label}</p>
              <p className="text-white/35 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}