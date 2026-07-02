import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/mfi-dispute/HeroSection";
import HowToFixSection from "@/components/mfi-dispute/HowToFixSection";
import GetReportSection from "@/components/mfi-dispute/GetReportSection";
import ProcessDiagram from "@/components/dispute/ProcessDiagram";
import ImportantPoints from "@/components/dispute/ImportantPoints";
import WaysToRaiseDispute from "@/components/mfi-dispute/WaysToRaiseDispute";

export const metadata: Metadata = {
  title: "Microfinance Dispute Resolution - CIBIL",
  description: "Raise a dispute to correct discrepancies in your CIBIL MFI Report.",
};

export default function MicrofinanceDisputeResolutionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <HowToFixSection />
        <GetReportSection />
        <ProcessDiagram headingKey="disputeHappensHeading" />
        <ImportantPoints />
        <WaysToRaiseDispute />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
