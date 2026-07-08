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
        <FaqHero
          titleKey="ppHeroTitle"
          ctaKey="getYoursNowBtn"
          ctaHref="/choose-subscription"
          imageSrc="https://www.cibil.com/content/dam/cibil/consumer/S-Collections-Management-2hero-D-090916.jpg"
          imageAlt="Get unlimited access to CIBIL Score"
        />
        <PpContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
