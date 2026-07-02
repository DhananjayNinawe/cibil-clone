import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CavContent from "@/components/cav/CavContent";

export const metadata: Metadata = {
  title: "Consumer Awareness Videos - CIBIL",
  description: "Watch CIBIL consumer awareness videos on credit education, reading your report, and raising disputes.",
};

export default function ConsumerAwarenessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <CavContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
