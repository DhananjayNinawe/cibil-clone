import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqHero from "@/components/faq/FaqHero";
import ScoreSimContent from "@/components/score-sim/ScoreSimContent";

export const metadata: Metadata = {
  title: "Score Simulator FAQs - CIBIL",
  description: "Frequently asked questions about the CIBIL Score Simulator and how it helps you make credit decisions.",
};

export default function ScoreSimulatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <FaqHero
          titleKey="ssHeroTitlePrefix"
          titleBoldKey="ssHeroTitleBold"
          descKey="ssHeroDesc"
          ctaKey="simulateNowBtn"
          ctaHref="/register"
          imageSrc="https://www.cibil.com/content/dam/cibil/consumer/Score-simulator-banner.jpg"
          imageAlt="Make the right credit decisions with Score Simulator"
        />
        <ScoreSimContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
