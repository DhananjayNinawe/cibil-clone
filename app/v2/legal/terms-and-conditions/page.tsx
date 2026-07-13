import type { Metadata } from "next";
import TermsContent from "@/components/v2/pages/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for the provision of Credit Information Reports, Company Credit Information Reports and other products and services by TransUnion CIBIL Limited.",
};

export default function TermsAndConditionsPage() {
  return <TermsContent />;
}
