import type { Metadata } from "next";
import ConsumerDisputeContent from "@/components/v4/pages/ConsumerDisputeContent";

export const metadata: Metadata = {
  title: "Consumer Dispute Resolution",
  description:
    "Raise and track a dispute to correct errors in your CIBIL report. A free service, resolved within 30 days.",
};

export default function V4ConsumerDisputeResolutionPage() {
  return <ConsumerDisputeContent />;
}
