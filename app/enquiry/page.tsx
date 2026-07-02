import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/enquiry/HeroSection";
import PlanOptionsSection from "@/components/enquiry/PlanOptionsSection";
import EligibleBanner from "@/components/enquiry/EligibleBanner";
import KeyTermsSection from "@/components/enquiry/KeyTermsSection";
import DontRecogniseSection from "@/components/enquiry/DontRecogniseSection";
import VideoSection from "@/components/enquiry/VideoSection";
import RecommendedReadsSection from "@/components/enquiry/RecommendedReadsSection";

export const metadata: Metadata = {
  title: "Consumer Enquiry - CIBIL",
  description: "Understand a credit enquiry on your CIBIL Report and what to do if you don't recognize it.",
};

export default function EnquiryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <PlanOptionsSection />
        <EligibleBanner />
        <KeyTermsSection />
        <DontRecogniseSection />
        <VideoSection />
        <RecommendedReadsSection />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
