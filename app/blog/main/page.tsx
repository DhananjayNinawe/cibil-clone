import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogMainContent from "@/components/blog-main/BlogMainContent";

export const metadata: Metadata = {
  title: "Blog - CIBIL",
  description: "Credit tips and news you can use — the TransUnion CIBIL blog.",
};

export default function BlogMainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <BlogMainContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
