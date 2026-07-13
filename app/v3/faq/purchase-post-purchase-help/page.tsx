import type { Metadata } from "next";
import PurchaseHelpContent from "@/components/v3/pages/faq/PurchaseHelpContent";

export const metadata: Metadata = {
  title: "Purchase and Post-Purchase Help",
  description:
    "Help with CIBIL unlimited access plans, myCIBIL account access, identity verification, and buying your CIBIL Report.",
};

export default function Page() {
  return <PurchaseHelpContent />;
}
