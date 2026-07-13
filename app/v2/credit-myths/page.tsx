import type { Metadata } from "next";
import CreditMythsContent from "@/components/v2/pages/CreditMythsContent";

export const metadata: Metadata = {
  title: "Credit Myths",
  description: "Debunking the most common credit myths, with TransUnion CIBIL.",
};

export default function CreditMythsPage() {
  return <CreditMythsContent />;
}
