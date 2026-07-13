import type { Metadata } from "next";
import EnquiryContent from "@/components/v3/pages/EnquiryContent";

export const metadata: Metadata = {
  title: "Consumer Enquiry",
  description:
    "Understand a credit enquiry on your CIBIL Report and what to do if you don't recognize it.",
};

export default function V3EnquiryPage() {
  return <EnquiryContent />;
}
