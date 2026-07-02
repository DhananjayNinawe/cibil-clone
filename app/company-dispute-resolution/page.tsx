import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/company-dispute/HeroSection";
import IntroSection from "@/components/company-dispute/IntroSection";
import FieldDetailsSection from "@/components/company-dispute/FieldDetailsSection";
import OwnershipDuplicateSection from "@/components/company-dispute/OwnershipDuplicateSection";
import ProcessDiagram from "@/components/company-dispute/ProcessDiagram";
import ClosingSection from "@/components/company-dispute/ClosingSection";

export const metadata: Metadata = {
  title: "Company Dispute Resolution - CIBIL",
  description: "Raise a dispute to correct errors in your company's CIBIL Credit Information Report.",
};

export default function CompanyDisputeResolutionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <FieldDetailsSection />
        <OwnershipDuplicateSection />
        <ProcessDiagram />
        <ClosingSection />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
