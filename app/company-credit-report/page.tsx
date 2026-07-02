import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CcrProductContent from "@/components/ccr-product/CcrProductContent";

export const metadata: Metadata = {
  title: "CIBIL Rank & Company Credit Report (CCR)",
  description: "Monitor your company's credit health with CIBIL Rank & Company Credit Report — check your report online anytime.",
};

export default function CompanyCreditReportProductPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <CcrProductContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
