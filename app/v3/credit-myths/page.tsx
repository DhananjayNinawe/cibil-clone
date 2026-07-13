import type { Metadata } from "next";
import CreditMythsContent from "@/components/v3/pages/CreditMythsContent";

export const metadata: Metadata = {
  title: "Credit Myths",
  description:
    "Common credit myths, answered — what really moves your CIBIL Score, and what does not.",
};

export default function Page() {
  return <CreditMythsContent />;
}
