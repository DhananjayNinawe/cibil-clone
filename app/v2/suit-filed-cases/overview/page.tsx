import type { Metadata } from "next";
import SuitFiledOverviewContent from "@/components/v2/pages/suit-filed/SuitFiledOverviewContent";

export const metadata: Metadata = {
  title: "Suit Filed Cases Overview",
  description:
    "An overview of the RBI suit-filed and non-suit filed account data maintained by TransUnion CIBIL, and the RBI circulars that govern its reporting.",
};

export default function SuitFiledOverviewPage() {
  return <SuitFiledOverviewContent />;
}
