import type { Metadata } from "next";
import RegulatoryContent from "@/components/v3/pages/legal/RegulatoryContent";

export const metadata: Metadata = {
  title: "Regulatory Disclosure",
  description: "Regulatory disclosures published by TransUnion CIBIL Limited.",
};

export default function RegulatoryPage() {
  return <RegulatoryContent />;
}
