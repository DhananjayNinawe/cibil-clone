import type { Metadata } from "next";
import CreditAdviceContent from "@/components/v4/pages/CreditAdviceContent";

export const metadata: Metadata = {
  title: "Credit Advice",
  description:
    "Credit advice blog articles from TransUnion CIBIL to help you build and manage your credit.",
};

export default function V4CreditAdvicePage() {
  return <CreditAdviceContent />;
}
