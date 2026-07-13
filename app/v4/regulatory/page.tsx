import type { Metadata } from "next";
import RegulatoryContent from "@/components/v4/pages/RegulatoryContent";

export const metadata: Metadata = {
  title: "Regulatory Disclosure",
  description: "Regulatory disclosures published by TransUnion CIBIL Limited.",
};

export default function V4RegulatoryPage() {
  return <RegulatoryContent />;
}
