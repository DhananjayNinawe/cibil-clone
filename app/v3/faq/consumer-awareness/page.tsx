import type { Metadata } from "next";
import ConsumerAwarenessContent from "@/components/v3/pages/faq/ConsumerAwarenessContent";

export const metadata: Metadata = {
  title: "Consumer Awareness Videos",
  description:
    "Watch CIBIL consumer awareness films on credit education, reading your CIBIL Report, report updates, enquiries and raising a dispute.",
};

export default function Page() {
  return <ConsumerAwarenessContent />;
}
