import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/blog-grid/BlogGrid";
import { CREDIT_MYTHS_CARDS } from "@/lib/blogCards";

export const metadata: Metadata = {
  title: "Credit Myths - CIBIL",
  description: "Debunking common credit myths with TransUnion CIBIL blog articles.",
};

export default function CreditMythsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <BlogGrid
          titleKey="creditMythsTitle"
          cards={CREDIT_MYTHS_CARDS}
          heroImage="https://www.cibil.com/content/dam/cibil/consumer/myths.jpg"
          gradient="from-[#5aa9d9] to-[#2a6a9a]"
        />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
