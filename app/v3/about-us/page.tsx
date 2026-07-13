import type { Metadata } from "next";
import AboutUsContent from "@/components/v3/pages/AboutUsContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TransUnion CIBIL is India's leading credit information company with one of the largest collections of consumer information.",
};

export default function V3AboutUsPage() {
  return <AboutUsContent />;
}
