import type { Metadata } from "next";
import CavContent from "@/components/v4/pages/CavContent";

export const metadata: Metadata = {
  title: "Consumer Awareness Videos",
  description:
    "Five short videos on credit education: raising a dispute, reading your CIBIL Report, how reports are updated, and what credit enquiries mean.",
};

export default function V4ConsumerAwarenessPage() {
  return <CavContent />;
}
