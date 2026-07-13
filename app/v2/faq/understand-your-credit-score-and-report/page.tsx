import type { Metadata } from "next";
import UnderstandScoreContent from "@/components/v2/pages/faq/UnderstandScoreContent";

export const metadata: Metadata = {
  title: "Understand Your Credit Score and Report",
  description:
    "Learn everything you need to know about the CIBIL Score and how to read every section of your CIBIL Report.",
};

export default function UnderstandScorePage() {
  return <UnderstandScoreContent />;
}
