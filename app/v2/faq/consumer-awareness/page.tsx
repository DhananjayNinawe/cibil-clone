import type { Metadata } from "next";
import ConsumerAwarenessContent from "@/components/v2/pages/faq/ConsumerAwarenessContent";

export const metadata: Metadata = {
  title: "Consumer Awareness Videos",
  description:
    "Watch CIBIL consumer awareness films on credit education, reading your report, report updates and raising disputes.",
};

export default function ConsumerAwarenessPage() {
  return <ConsumerAwarenessContent />;
}
