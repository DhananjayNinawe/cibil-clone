import type { Metadata } from "next";
import MfiDisputeContent from "@/components/v2/pages/MfiDisputeContent";

export const metadata: Metadata = {
  title: "Microfinance Dispute Resolution",
  description:
    "Found a discrepancy in your CIBIL MFI Report? Raise a dispute, request your MFI report, and see how CIBIL works with lenders to correct it — free of charge.",
};

export default function Page() {
  return <MfiDisputeContent />;
}
