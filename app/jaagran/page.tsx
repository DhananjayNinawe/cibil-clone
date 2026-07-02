import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JaagranContent from "@/components/jaagran/JaagranContent";

export const metadata: Metadata = {
  title: "CIBIL Jaagran - Empowering Your Financial Future",
  description: "CIBIL Jaagran is TransUnion CIBIL's flagship initiative to raise credit awareness and promote financial literacy.",
};

export default function JaagranPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <JaagranContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
