import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/dispute/HeroSection";
import HowToInitiate from "@/components/dispute/HowToInitiate";
import ProcessDiagram from "@/components/dispute/ProcessDiagram";
import ImportantPoints from "@/components/dispute/ImportantPoints";
import DisputeFaqSection from "@/components/dispute/DisputeFaqSection";
import FeaturedArticles from "@/components/dispute/FeaturedArticles";

export const metadata: Metadata = {
  title: "Consumer Dispute Resolution - CIBIL",
  description: "Learn how to raise and track a dispute to correct errors in your CIBIL report.",
};

export default function ConsumerDisputeResolutionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <HowToInitiate />
        <ProcessDiagram />
        <ImportantPoints />
        <DisputeFaqSection />
        <FeaturedArticles />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
