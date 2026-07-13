import type { Metadata } from "next";
import EnquiryCcrContent from "@/components/v3/pages/EnquiryCcrContent";

export const metadata: Metadata = {
  title: "Commercial Enquiry",
  description:
    "Understand a lender enquiry on your CIBIL Rank and Company Credit Report (CCR) and what to do if you don't recognize it.",
};

export default function V3EnquiryCcrPage() {
  return <EnquiryCcrContent />;
}
