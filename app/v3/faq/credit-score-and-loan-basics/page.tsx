import type { Metadata } from "next";
import CreditBasicsContent from "@/components/v3/pages/faq/CreditBasicsContent";

export const metadata: Metadata = {
  title: "Credit Score and Loan Basics",
  description:
    "What TransUnion CIBIL does, why your CIBIL Score decides a loan application, the four factors that move it, and how to improve it.",
};

export default function Page() {
  return <CreditBasicsContent />;
}
