import type { Metadata } from "next";
import ConsumerDisputeContent from "@/components/v2/pages/ConsumerDisputeContent";

export const metadata: Metadata = {
  title: "Consumer Dispute Resolution",
  description:
    "Spotted an error in your CIBIL Report? Raise a dispute in four steps, see exactly what happens next, and track it to closure. Dispute resolution is free.",
};

export default function Page() {
  return <ConsumerDisputeContent />;
}
