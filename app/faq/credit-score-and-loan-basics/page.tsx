import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqHero from "@/components/faq/FaqHero";
import CsbContent from "@/components/csb/CsbContent";

export const metadata: Metadata = {
  title: "Credit Score and Loan Basics - CIBIL",
  description: "Learn the basics of the CIBIL Score, the factors that affect it, and how to improve it.",
};

export default function CreditScoreLoanBasicsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <FaqHero titleKey="csbHeroTitle" ctaKey="getYoursNowBtn" ctaHref="/register" />
        <CsbContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
