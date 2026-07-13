import type { Metadata } from "next";
import DisputesContent from "@/components/v2/pages/faq/DisputesContent";

export const metadata: Metadata = {
  title: "Loan Rejections and Disputes",
  description:
    "Why loans get rejected, what inaccuracies can appear on your CIBIL Report, and how to raise and track a dispute.",
};

export default function DisputesPage() {
  return <DisputesContent />;
}
