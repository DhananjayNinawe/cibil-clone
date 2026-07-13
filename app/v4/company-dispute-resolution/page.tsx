import type { Metadata } from "next";
import CompanyDisputeContent from "@/components/v4/pages/CompanyDisputeContent";

export const metadata: Metadata = {
  title: "Company Dispute Resolution",
  description:
    "Raise a dispute to correct errors in your company's CIBIL Company Credit Information Report.",
};

export default function V4CompanyDisputeResolutionPage() {
  return <CompanyDisputeContent />;
}
