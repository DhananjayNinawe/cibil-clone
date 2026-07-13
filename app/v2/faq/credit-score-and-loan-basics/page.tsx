import type { Metadata } from "next";
import CreditBasicsContent from "@/components/v2/pages/faq/CreditBasicsContent";

export const metadata: Metadata = {
  title: "Credit Score and Loan Basics",
  description:
    "The basics of the CIBIL Score: what it is, the four factors that move it, and the six habits that improve it.",
};

export default function CreditBasicsPage() {
  return <CreditBasicsContent />;
}
