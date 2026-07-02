import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfficialPartnersContent from "@/components/official-partners/OfficialPartnersContent";

export const metadata: Metadata = {
  title: "Official Partners - CIBIL",
  description: "TU CIBIL's official partners for distributing CIBIL Score and Report.",
};

export default function OfficialPartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <OfficialPartnersContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
