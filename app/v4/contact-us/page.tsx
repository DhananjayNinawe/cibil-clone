import type { Metadata } from "next";
import ContactUsContent from "@/components/v4/pages/ContactUsContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Quick links for CIBIL consumer, commercial, and microfinance support, plus contact details.",
};

export default function V4ContactUsPage() {
  return <ContactUsContent />;
}
