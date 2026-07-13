import type { Metadata } from "next";
import CsrContent from "@/components/v3/pages/CsrContent";

export const metadata: Metadata = {
  title: "CIBIL Score & Report",
  description:
    "Prepare yourself for a promising journey ahead with your CIBIL Score & Report and the CIBIL Dashboard.",
};

export default function V3CibilScoreReportPage() {
  return <CsrContent />;
}
