import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResultsContent from "@/components/search/SearchResultsContent";

export const metadata: Metadata = {
  title: "Search - TransUnion CIBIL",
  description: "Search every page on the TransUnion CIBIL site: credit score and report products, dispute resolution, FAQs, help and support.",
};

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        {/* The results read the ?q= param, which is only known at request time; the boundary lets
            the header and footer prerender around them. */}
        <Suspense>
          <SearchResultsContent />
        </Suspense>
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
