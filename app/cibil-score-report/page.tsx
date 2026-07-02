import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CsrContent from "@/components/product-csr/CsrContent";

export const metadata: Metadata = {
  title: "CIBIL Score & Report",
  description: "Prepare yourself for a promising journey ahead with your CIBIL Score & Report and the CIBIL Dashboard.",
};

export default function CibilScoreReportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <CsrContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
