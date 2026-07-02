import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotificationBanner from "@/components/enquiry-ccr/NotificationBanner";
import HeroSection from "@/components/enquiry-ccr/HeroSection";
import PlanOptionsSection from "@/components/enquiry-ccr/PlanOptionsSection";
import KeyTermsSection from "@/components/enquiry-ccr/KeyTermsSection";
import DontRecogniseSection from "@/components/enquiry-ccr/DontRecogniseSection";

export const metadata: Metadata = {
  title: "Commercial Enquiry - CIBIL",
  description: "Understand a lender enquiry on your CIBIL Rank and Company Credit Report (CCR) and what to do if you don't recognize it.",
};

export default function EnquiryCcrPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <NotificationBanner />
      <main className="flex-1">
        <HeroSection />
        <PlanOptionsSection />
        <KeyTermsSection />
        <DontRecogniseSection />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
