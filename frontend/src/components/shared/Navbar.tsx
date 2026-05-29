"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/Home",            label: "Beranda" },
  { href: "/Input",           label: "Prediksi" },
  { href: "/Result",          label: "Hasil" },
  { href: "/Recommendations", label: "Rekomendasi" },
  { href: "/History",         label: "Riwayat" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "rgba(7,10,15,0.85)",
        borderColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "#00e5a0" }}
          >
            <svg viewBox="0 0 24 24" fill="#070a0f" className="w-4 h-4">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-syne font-bold text-white text-base">WattSmart</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? "rgba(0,229,160,0.1)" : "transparent",
                  color: isActive ? "#00e5a0" : "rgba(255,255,255,0.45)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: Login button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
          >
            Masuk
          </Link>

          <Link
            href="/input"
            className="px-4 py-1.5 rounded-lg text-sm font-syne font-bold transition-all duration-200 active:scale-[0.97]"
            style={{ background: "#00e5a0", color: "#070a0f" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00c98e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00e5a0";
            }}
          >
            Mulai Prediksi
          </Link>
        </div>

      </div>
    </nav>
  );
}