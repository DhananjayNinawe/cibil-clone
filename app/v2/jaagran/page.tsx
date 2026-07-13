import type { Metadata } from "next";
import JaagranContent from "@/components/v2/pages/JaagranContent";

export const metadata: Metadata = {
  title: "CIBIL Jaagran",
  description:
    "CIBIL Jaagran is TransUnion CIBIL's flagship initiative to raise credit awareness and promote financial literacy.",
};

export default function JaagranPage() {
  return <JaagranContent />;
}
