"use client";

import Link from "next/link";
import { HeroSection } from "../../components/Home/HeroSection";
import { BenefitCards } from "../../components/Home/BenefitCards";
import { HowItWorks } from "../../components/Home/HowItWorks";
import { StatsSection } from "../../components/Home/StatsSection";
import { CTABanner } from "../../components/Home/CTABanner";
import { Navbar } from "@/src/components/shared/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070a0f] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <BenefitCards />
      <HowItWorks />
      <CTABanner />
    </div>
  );
}