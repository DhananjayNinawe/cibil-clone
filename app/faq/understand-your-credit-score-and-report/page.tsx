import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqHero from "@/components/faq/FaqHero";
import UcsContent from "@/components/ucs/UcsContent";

export const metadata: Metadata = {
  title: "Understand Your Credit Score and Report - CIBIL",
  description: "Learn everything you need to know about the CIBIL Score and how to read your CIBIL Report.",
};

export default function UnderstandCreditScoreReportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <FaqHero titleKey="ucsHeroTitle" ctaKey="checkNewScoreBtn" ctaHref="/register" gradient="from-[#c7ccd1] to-[#6a7a85]" />
        <UcsContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
