import type { Metadata } from "next";
import AboutUsContent from "@/components/v2/pages/AboutUsContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TransUnion CIBIL is India's leading credit information company with one of the largest collections of consumer information.",
};

export default function V2AboutUsPage() {
  return <AboutUsContent />;
}
