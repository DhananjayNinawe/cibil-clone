import type { Metadata } from "next";
import EnquiryContent from "@/components/v2/pages/EnquiryContent";

export const metadata: Metadata = {
  title: "Consumer Enquiry",
  description:
    "A lender checked your CIBIL Report. Here is what a credit enquiry is, the terms on the alert, and exactly what to do if you do not recognise it.",
};

export default function Page() {
  return <EnquiryContent />;
}
