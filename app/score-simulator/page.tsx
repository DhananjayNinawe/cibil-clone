import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScoreSimProductContent from "@/components/score-sim-product/ScoreSimProductContent";

export const metadata: Metadata = {
  title: "Score Simulator - CIBIL",
  description: "Make the right credit decisions with the CIBIL Score Simulator — see how your credit actions can impact your CIBIL Score.",
};

export default function ScoreSimulatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <ScoreSimProductContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
