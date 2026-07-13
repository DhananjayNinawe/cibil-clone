import type { Metadata } from "next";
import JaagranContent from "@/components/v3/pages/JaagranContent";

export const metadata: Metadata = {
  title: "CIBIL Jaagran",
  description:
    "CIBIL Jaagran is TransUnion CIBIL's flagship initiative to raise credit awareness and promote financial literacy across India.",
};

export default function Page() {
  return <JaagranContent />;
}
