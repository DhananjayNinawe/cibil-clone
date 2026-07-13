import type { Metadata } from "next";
import JaagranContent from "@/components/v4/pages/JaagranContent";

export const metadata: Metadata = {
  title: "CIBIL Jaagran — Empowering Your Financial Future",
  description:
    "CIBIL Jaagran is TransUnion CIBIL's flagship initiative to raise credit awareness and promote financial literacy.",
};

export default function V4JaagranPage() {
  return <JaagranContent />;
}
