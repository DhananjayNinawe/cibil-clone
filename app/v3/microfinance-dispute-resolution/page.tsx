import type { Metadata } from "next";
import MfiDisputeContent from "@/components/v3/pages/MfiDisputeContent";

export const metadata: Metadata = {
  title: "Microfinance Dispute Resolution - CIBIL",
  description: "Raise a dispute to correct discrepancies in your CIBIL MFI Report.",
};

export default function MicrofinanceDisputeResolutionPage() {
  return <MfiDisputeContent />;
}
