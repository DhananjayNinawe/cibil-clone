import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqHero from "@/components/faq/FaqHero";
import LrdContent from "@/components/lrd/LrdContent";

export const metadata: Metadata = {
  title: "Loan Rejections and Disputes - CIBIL",
  description: "Understand loan rejections, inaccuracies in your CIBIL report, and how to raise a dispute.",
};

export default function LoanRejectionsDisputesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <FaqHero titleKey="lrdHeroTitle" ctaKey="raiseDisputeOnlineBtn" ctaHref="/consumer-dispute-resolution" />
        <LrdContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
