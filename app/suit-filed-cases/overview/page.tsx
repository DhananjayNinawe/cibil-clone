import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuitFiledOverviewContent from "@/components/suit-filed/SuitFiledOverviewContent";

export const metadata: Metadata = {
  title: "Suit Filed Cases Overview - TransUnion CIBIL",
  description:
    "An overview of the RBI suit-filed and non-suit filed account data maintained by TransUnion CIBIL, and the RBI circulars that govern its reporting.",
};

export default function SuitFiledOverviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <SuitFiledOverviewContent />
      </main>
      <Footer variant="corporate" accentTop />
    </div>
  );
}
