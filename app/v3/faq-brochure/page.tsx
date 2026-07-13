import type { Metadata } from "next";
import BrochureContent from "@/components/v3/pages/faq/BrochureContent";

export const metadata: Metadata = {
  title: "Understanding CIBIL: Functions, Product and Service",
  description:
    "A guide to TransUnion CIBIL, the CIBIL Score and Report, and why they are integral to the loan application process.",
};

export default function Page() {
  return <BrochureContent />;
}
