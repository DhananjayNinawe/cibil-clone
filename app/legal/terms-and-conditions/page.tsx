import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TermsContent from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms and Conditions - TransUnion CIBIL",
  description:
    "Terms and conditions for the provision of Credit Information Reports, Company Credit Information Reports and other products and services by TransUnion CIBIL Limited.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <TermsContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
