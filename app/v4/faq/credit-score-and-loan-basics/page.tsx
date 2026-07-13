import type { Metadata } from "next";
import CsbContent from "@/components/v4/pages/CsbContent";

export const metadata: Metadata = {
  title: "Credit Score and Loan Basics",
  description:
    "What TransUnion CIBIL is, what a CIBIL Score is, the four major factors that affect it, and how to improve it.",
};

export default function V4CreditScoreLoanBasicsPage() {
  return <CsbContent />;
}
