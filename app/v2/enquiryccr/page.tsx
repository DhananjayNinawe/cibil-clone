import type { Metadata } from "next";
import EnquiryCcrContent from "@/components/v2/pages/EnquiryCcrContent";

export const metadata: Metadata = {
  title: "Commercial Enquiry",
  description:
    "A lender reviewed your CIBIL Rank and Company Credit Report. Understand the enquiry alert, the terms on it, and what to do if you do not recognise it.",
};

export default function Page() {
  return <EnquiryCcrContent />;
}
