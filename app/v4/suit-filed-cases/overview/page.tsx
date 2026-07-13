import type { Metadata } from "next";
import SuitFiledOverviewContent from "@/components/v4/pages/SuitFiledOverviewContent";

export const metadata: Metadata = {
  title: "Suit Filed Cases Overview",
  description:
    "An overview of the RBI suit-filed and non-suit filed account data maintained by TransUnion CIBIL, and the RBI circulars that govern its reporting.",
};

export default function V4SuitFiledOverviewPage() {
  return <SuitFiledOverviewContent />;
}
