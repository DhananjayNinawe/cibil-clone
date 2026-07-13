import type { Metadata } from "next";
import CreditAdviceContent from "@/components/v2/pages/CreditAdviceContent";

export const metadata: Metadata = {
  title: "Credit Advice",
  description:
    "Credit advice articles from TransUnion CIBIL to help you build, protect and manage your credit.",
};

export default function CreditAdvicePage() {
  return <CreditAdviceContent />;
}
