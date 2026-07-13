import type { Metadata } from "next";
import DisputesContent from "@/components/v3/pages/faq/DisputesContent";

export const metadata: Metadata = {
  title: "Loan Rejections and Disputes",
  description:
    "Understand loan rejections, the inaccuracies that can appear on your CIBIL Report, how to raise a dispute and how long it takes to resolve.",
};

export default function Page() {
  return <DisputesContent />;
}
