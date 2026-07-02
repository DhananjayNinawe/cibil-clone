import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SakshamContent from "@/components/saksham/SakshamContent";

export const metadata: Metadata = {
  title: "CIBIL Saksham - Empowering You With Credit Knowledge",
  description: "CIBIL Saksham is a credit education platform by TransUnion CIBIL with interactive learning modules.",
};

export default function CibilSakshamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <SakshamContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
