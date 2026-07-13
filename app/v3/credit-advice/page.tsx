import type { Metadata } from "next";
import CreditAdviceContent from "@/components/v3/pages/CreditAdviceContent";

export const metadata: Metadata = {
  title: "Credit Advice",
  description:
    "Credit advice from TransUnion CIBIL — how to build a positive credit profile, avoid common mistakes and keep your CIBIL Score healthy.",
};

export default function Page() {
  return <CreditAdviceContent />;
}
