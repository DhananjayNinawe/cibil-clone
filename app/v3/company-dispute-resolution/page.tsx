import type { Metadata } from "next";
import CompanyDisputeContent from "@/components/v3/pages/CompanyDisputeContent";

export const metadata: Metadata = {
  title: "Company Dispute Resolution - CIBIL",
  description: "Raise a dispute to correct errors in your company's CIBIL Credit Information Report.",
};

export default function CompanyDisputeResolutionPage() {
  return <CompanyDisputeContent />;
}
