import type { Metadata } from "next";
import PurchaseHelpContent from "@/components/v2/pages/faq/PurchaseHelpContent";

export const metadata: Metadata = {
  title: "Purchase and Post-Purchase Help",
  description:
    "Help with CIBIL unlimited access plans, myCIBIL account access, identity verification and buying reports.",
};

export default function PurchaseHelpPage() {
  return <PurchaseHelpContent />;
}
