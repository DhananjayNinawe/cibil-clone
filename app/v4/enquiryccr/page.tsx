import type { Metadata } from "next";
import EnquiryCcrContent from "@/components/v4/pages/EnquiryCcrContent";

export const metadata: Metadata = {
  title: "Commercial Enquiry",
  description:
    "A lender reviewed your CIBIL Rank and Company Credit Report. Understand the enquiry, and what to do if you do not recognise it.",
};

export default function V4EnquiryCcrPage() {
  return <EnquiryCcrContent />;
}
