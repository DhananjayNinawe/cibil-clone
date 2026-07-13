import type { Metadata } from "next";
import TermsContent from "@/components/v4/pages/TermsContent";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for the provision of Credit Information Reports, Company Credit Information Reports and other products and services by TransUnion CIBIL Limited.",
};

export default function V4TermsAndConditionsPage() {
  return <TermsContent />;
}
