import type { Metadata } from "next";
import ConsumerDisputeContent from "@/components/v3/pages/ConsumerDisputeContent";

export const metadata: Metadata = {
  title: "Consumer Dispute Resolution - CIBIL",
  description: "Learn how to raise and track a dispute to correct errors in your CIBIL report.",
};

export default function ConsumerDisputeResolutionPage() {
  return <ConsumerDisputeContent />;
}
