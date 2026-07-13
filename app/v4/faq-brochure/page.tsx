import type { Metadata } from "next";
import BrochureContent from "@/components/v4/pages/BrochureContent";

export const metadata: Metadata = {
  title: "Understanding CIBIL: Functions, Product and Service",
  description:
    "The front door to CIBIL's help system: what TransUnion CIBIL does, and every FAQ topic — credit score basics, reading your report, disputes, purchases, the Score Simulator, CIBIL Rank and the awareness videos.",
};

export default function V4FaqBrochurePage() {
  return <BrochureContent />;
}
