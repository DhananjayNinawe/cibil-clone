import { Suspense } from "react";
import type { Metadata } from "next";
import SearchResultsContent from "@/components/v2/pages/SearchResultsContent";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search every page on the TransUnion CIBIL site: credit score and report products, dispute resolution, FAQs, help and support.",
};

export default function SearchPage() {
  return (
    // The results read the ?q= param, which is only known at request time; without this boundary
    // `useSearchParams` opts the whole route out of static rendering.
    <Suspense>
      <SearchResultsContent />
    </Suspense>
  );
}
