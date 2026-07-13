import type { Metadata } from "next";
import UnderstandScoreContent from "@/components/v3/pages/faq/UnderstandScoreContent";

export const metadata: Metadata = {
  title: "Understand Your Credit Score and Report",
  description:
    "Everything you need to know about the CIBIL Score, how to read your CIBIL Report, and what each section of it means.",
};

export default function Page() {
  return <UnderstandScoreContent />;
}
