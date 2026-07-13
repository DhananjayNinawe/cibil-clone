import type { Metadata } from "next";
import EnquiryContent from "@/components/v4/pages/EnquiryContent";

export const metadata: Metadata = {
  title: "Consumer Enquiry",
  description:
    "A lender checked your CIBIL Report. Understand what a credit enquiry is, and what to do if you do not recognise it.",
};

export default function V4EnquiryPage() {
  return <EnquiryContent />;
}
