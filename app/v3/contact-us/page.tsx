import type { Metadata } from "next";
import ContactContent from "@/components/v3/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Quick links for CIBIL consumer, commercial, and microfinance support, plus contact details.",
};

export default function V3ContactUsPage() {
  return <ContactContent />;
}
