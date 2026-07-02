import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegulatoryContent from "@/components/regulatory/RegulatoryContent";

export const metadata: Metadata = {
  title: "Regulatory Disclosure - TransUnion CIBIL",
  description: "Regulatory disclosures published by TransUnion CIBIL Limited.",
};

export default function RegulatoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <RegulatoryContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
