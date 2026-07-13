import type { Metadata } from "next";
import NonSuitFiledContent from "@/components/v2/pages/suit-filed/NonSuitFiledContent";

export const metadata: Metadata = {
  title: "Non Suit Filed Cases",
  description:
    "Terms, conditions, disclaimer and governing law for the non-suit filed cases information published by TransUnion CIBIL.",
};

export default function NonSuitFiledCasesPage() {
  return <NonSuitFiledContent />;
}
