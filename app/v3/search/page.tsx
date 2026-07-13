import { Suspense } from "react";
import type { Metadata } from "next";
import SearchContent from "@/components/v3/pages/SearchContent";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search every page on the TransUnion CIBIL site: credit score and report products, dispute resolution, FAQs, help and support.",
};

export default function V3SearchPage() {
  return (
    // The results read the ?q= param, which is only known at request time. Without this boundary
    // useSearchParams opts the whole route out of prerendering and the build fails.
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
