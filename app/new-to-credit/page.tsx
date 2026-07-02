import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/blog-grid/BlogGrid";
import { NEW_TO_CREDIT_CARDS } from "@/lib/blogCards";

export const metadata: Metadata = {
  title: "New To Credit - CIBIL",
  description: "New to credit? Blog articles from TransUnion CIBIL to help you get started.",
};

export default function NewToCreditPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <BlogGrid titleKey="newToCreditTitle" cards={NEW_TO_CREDIT_CARDS} ctaKey="blogReadMore" gradient="from-[#4a5a6a] to-[#1a2a33]" />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
