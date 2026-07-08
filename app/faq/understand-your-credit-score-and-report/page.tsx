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
        <FaqHero
          titleKey="ucsHeroTitle"
          ctaKey="checkNewScoreBtn"
          ctaHref="/register"
          imageSrc="https://www.cibil.com/content/dam/cibil/consumer/S-Credit-Reporting-2hero-D-090916.jpg"
          imageAlt="Learn everything you need to know about the new CIBIL Score"
        />
        <UcsContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
