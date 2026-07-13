import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuitFiledContent from "@/components/suit-filed/SuitFiledContent";

export const metadata: Metadata = {
  title: "Non Suit and Suit Filed Cases - TransUnion CIBIL",
  description: "Terms, conditions and disclaimer for the suit filed cases information published by TransUnion CIBIL.",
};

export default function SuitFiledCasesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <SuitFiledContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
