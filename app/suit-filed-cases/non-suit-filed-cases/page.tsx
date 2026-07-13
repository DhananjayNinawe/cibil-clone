import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NonSuitFiledContent from "@/components/suit-filed/NonSuitFiledContent";

export const metadata: Metadata = {
  title: "Non Suit Filed Cases - TransUnion CIBIL",
  description:
    "Terms, conditions, disclaimer and governing law for the non-suit filed cases information published by TransUnion CIBIL.",
};

export default function NonSuitFiledCasesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <NonSuitFiledContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
