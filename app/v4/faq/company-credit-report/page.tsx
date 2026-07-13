import type { Metadata } from "next";
import CcrfContent from "@/components/v4/pages/CcrfContent";

export const metadata: Metadata = {
  title: "CIBIL Rank and Company Credit Report FAQs",
  description:
    "What the CIBIL Rank is, how it is calculated, what a Company Credit Report contains, and how the Rank differs from the CIBIL Score.",
};

export default function V4CompanyCreditReportFaqPage() {
  return <CcrfContent />;
}
