import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MicrofinanceContent from "@/components/microfinance/MicrofinanceContent";

export const metadata: Metadata = {
  title: "CIBIL Microfinance Score & Report",
  description: "Get your Free CIBIL Microfinance Score & Report today and stay credit ready for your MFI loan.",
};

export default function MicrofinancePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <MicrofinanceContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
