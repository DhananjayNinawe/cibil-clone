import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FcsContent from "@/components/fcs/FcsContent";

export const metadata: Metadata = {
  title: "Free CIBIL Score & Report - CIBIL",
  description: "Get your Free CIBIL Score & Report instantly, once every calendar year.",
};

export default function FreeCibilScorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <FcsContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
