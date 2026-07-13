import type { Metadata } from "next";
import CommercialCreditContent from "@/components/v2/pages/CommercialCreditContent";

export const metadata: Metadata = {
  title: "Commercial Credit",
  description:
    "Commercial credit articles for businesses: CIBIL Rank, the Company Credit Report and loan eligibility.",
};

export default function CommercialCreditPage() {
  return <CommercialCreditContent />;
}
