import type { Metadata } from "next";
import PpContent from "@/components/v4/pages/PpContent";

export const metadata: Metadata = {
  title: "Purchase and Post-Purchase Help",
  description:
    "Help with CIBIL Unlimited Access plans, the myCIBIL Refresh Center, identity verification, and buying the CIBIL Report on its own.",
};

export default function V4PurchasePostPurchaseHelpPage() {
  return <PpContent />;
}
