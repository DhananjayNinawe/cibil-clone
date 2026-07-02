import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/blog-grid/BlogGrid";
import { COMMERCIAL_CREDIT_CARDS } from "@/lib/blogCards";

export const metadata: Metadata = {
  title: "Commercial Credit - CIBIL",
  description: "Commercial credit blog articles for businesses from TransUnion CIBIL.",
};

export default function CommercialCreditPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <BlogGrid titleKey="commercialCreditTitle" cards={COMMERCIAL_CREDIT_CARDS} ctaKey="blogReadMore" gradient="from-[#3aa8d8] to-[#0a3a52]" />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
