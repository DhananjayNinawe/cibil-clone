import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqHero from "@/components/faq/FaqHero";
import CcrfContent from "@/components/ccrf/CcrfContent";

export const metadata: Metadata = {
  title: "CIBIL Rank and Company Credit Report FAQs - CIBIL",
  description: "Frequently asked questions about the CIBIL Rank and Company Credit Report (CCR).",
};

export default function CompanyCreditReportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <FaqHero
          titleKey="ccrfHeroTitle"
          ctaKey="getRankReportBtn"
          ctaHref="/register"
          imageSrc="https://www.cibil.com/content/dam/cibil/consumer/P-Custom-Scorecards-2hero-D-310816.jpg"
          imageAlt="Two business colleagues reviewing a company credit report"
        />
        <CcrfContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
