import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/framework/HeroSection";
import WhatIsFrameworkSection from "@/components/framework/WhatIsFrameworkSection";
import CompensationDiagram from "@/components/framework/CompensationDiagram";
import FrameworkFaqSection from "@/components/framework/FrameworkFaqSection";
import SafeguardBanner from "@/components/framework/SafeguardBanner";

export const metadata: Metadata = {
  title: "Framework for Compensation - CIBIL",
  description: "Understand RBI's compensation framework for delayed dispute resolution on your CIBIL report.",
};

export default function FrameworkForCompensationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <WhatIsFrameworkSection />
        <CompensationDiagram />
        <FrameworkFaqSection />
      </main>
      <SafeguardBanner />
      <Footer variant="full" accentTop />
    </div>
  );
}
