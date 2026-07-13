import type { Metadata } from "next";
import LrdContent from "@/components/v4/pages/LrdContent";

export const metadata: Metadata = {
  title: "Loan Rejections and Disputes",
  description:
    "Errors in your CIBIL Report: what kinds there are, how to raise a dispute, what happens after you do, and how long it takes. Dispute resolution is a free service.",
};

export default function V4LoanRejectionsDisputesPage() {
  return <LrdContent />;
}
