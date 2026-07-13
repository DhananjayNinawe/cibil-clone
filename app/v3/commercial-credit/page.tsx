import type { Metadata } from "next";
import CommercialCreditContent from "@/components/v3/pages/CommercialCreditContent";

export const metadata: Metadata = {
  title: "Commercial Credit",
  description: "Commercial credit blog articles for businesses from TransUnion CIBIL.",
};

export default function V3CommercialCreditPage() {
  return <CommercialCreditContent />;
}
