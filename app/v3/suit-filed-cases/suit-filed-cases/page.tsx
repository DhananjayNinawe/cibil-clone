import type { Metadata } from "next";
import SuitFiledContent from "@/components/v3/pages/suit-filed/SuitFiledContent";

export const metadata: Metadata = {
  title: "Non Suit and Suit Filed Cases",
  description:
    "Terms, conditions and disclaimer for the suit filed cases information published by TransUnion CIBIL.",
};

export default function SuitFiledCasesPage() {
  return <SuitFiledContent />;
}
