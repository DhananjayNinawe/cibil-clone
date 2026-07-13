import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SitemapContent from "@/components/sitemap/SitemapContent";

export const metadata: Metadata = {
  title: "Site Map - TransUnion CIBIL",
  description: "Browse every section of the TransUnion CIBIL site: personal and business credit products, help centre, dispute resolution and more.",
};

export default function SitemapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <SitemapContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
