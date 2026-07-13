import type { Metadata } from "next";
import BrochureContent from "@/components/v2/pages/BrochureContent";

export const metadata: Metadata = {
  title: "Understanding CIBIL: Functions, Product and Service",
  description:
    "A guide to CIBIL, the CIBIL Score & Report, and the services TransUnion CIBIL offers.",
};

export default function FaqBrochurePage() {
  return <BrochureContent />;
}
