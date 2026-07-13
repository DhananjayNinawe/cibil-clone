import type { Metadata } from "next";
import MfiDisputeContent from "@/components/v4/pages/MfiDisputeContent";

export const metadata: Metadata = {
  title: "Microfinance Dispute Resolution",
  description: "Raise a dispute to correct discrepancies in your CIBIL MFI Report — free of charge.",
};

export default function V4MicrofinanceDisputeResolutionPage() {
  return <MfiDisputeContent />;
}
