import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqHero from "@/components/faq/FaqHero";
import PpContent from "@/components/pp/PpContent";

export const metadata: Metadata = {
  title: "Purchase and Post-Purchase Help - CIBIL",
  description: "Help with CIBIL unlimited access plans, myCIBIL account access, identity verification, and buying reports.",
};

export default function PurchasePostPurchaseHelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <FaqHero titleKey="ppHeroTitle" ctaKey="getYoursNowBtn" ctaHref="/choose-subscription" gradient="from-[#d0d8de] to-[#8a97a2]" />
        <PpContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
