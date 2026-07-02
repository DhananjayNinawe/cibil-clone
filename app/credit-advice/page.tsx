import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/blog-grid/BlogGrid";
import { CREDIT_ADVICE_CARDS } from "@/lib/blogCards";

export const metadata: Metadata = {
  title: "Credit Advice - CIBIL",
  description: "Credit advice blog articles from TransUnion CIBIL to help you build and manage your credit.",
};

export default function CreditAdvicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <BlogGrid titleKey="creditAdviceTitle" cards={CREDIT_ADVICE_CARDS} gradient="from-[#e8b97a] to-[#8a5a35]" />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
