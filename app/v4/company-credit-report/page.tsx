import type { Metadata } from "next";
import CcrProductContent from "@/components/v4/pages/CcrProductContent";

export const metadata: Metadata = {
  title: "CIBIL Rank & Company Credit Report (CCR)",
  description:
    "Monitor your company's credit health with CIBIL Rank & Company Credit Report — check your report online anytime.",
};

export default function V4CompanyCreditReportPage() {
  return <CcrProductContent />;
}
