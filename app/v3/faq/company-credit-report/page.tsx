import type { Metadata } from "next";
import CompanyReportContent from "@/components/v3/pages/faq/CompanyReportContent";

export const metadata: Metadata = {
  title: "CIBIL Rank and Company Credit Report FAQs",
  description:
    "What the CIBIL Rank is, how it is calculated, how it differs from the CIBIL Score and a credit rating, and how to rectify a Company Credit Report.",
};

export default function Page() {
  return <CompanyReportContent />;
}
