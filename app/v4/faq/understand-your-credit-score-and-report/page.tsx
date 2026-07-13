import type { Metadata } from "next";
import UcsContent from "@/components/v4/pages/UcsContent";

export const metadata: Metadata = {
  title: "Understand Your Credit Score and Report",
  description:
    "How to read your CIBIL Report — its six sections, what account and enquiry information mean, and how your CIBIL Score is derived from them.",
};

export default function V4UnderstandCreditScoreReportPage() {
  return <UcsContent />;
}
