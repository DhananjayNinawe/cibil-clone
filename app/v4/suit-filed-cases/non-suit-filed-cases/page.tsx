import type { Metadata } from "next";
import NonSuitFiledContent from "@/components/v4/pages/NonSuitFiledContent";

export const metadata: Metadata = {
  title: "Non Suit Filed Cases",
  description:
    "Terms, conditions, disclaimer and governing law for the non-suit filed cases information published by TransUnion CIBIL.",
};

export default function V4NonSuitFiledCasesPage() {
  return <NonSuitFiledContent />;
}
