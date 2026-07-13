import type { Metadata } from "next";
import CreditMythsContent from "@/components/v4/pages/CreditMythsContent";

export const metadata: Metadata = {
  title: "Credit Myths",
  description: "Debunking common credit myths with TransUnion CIBIL blog articles.",
};

export default function V4CreditMythsPage() {
  return <CreditMythsContent />;
}
