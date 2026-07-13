import type { Metadata } from "next";
import CompanyReportContent from "@/components/v2/pages/faq/CompanyReportContent";

export const metadata: Metadata = {
  title: "CIBIL Rank and Company Credit Report FAQs",
  description:
    "What the CIBIL Rank is, how it is calculated, how it differs from the CIBIL Score, and how to correct a Company Credit Report.",
};

export default function CompanyReportFaqPage() {
  return <CompanyReportContent />;
}
