import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrochureContent from "@/components/faq-brochure/BrochureContent";

export const metadata: Metadata = {
  title: "Understanding CIBIL: Functions, Product and Service",
  description: "A comprehensive guide to CIBIL, the CIBIL Score & Report, and the services TransUnion CIBIL offers.",
};

export default function FaqBrochurePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <BrochureContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
