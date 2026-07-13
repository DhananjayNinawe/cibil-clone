import type { Metadata } from "next";
import CompanyDisputeContent from "@/components/v2/pages/CompanyDisputeContent";

export const metadata: Metadata = {
  title: "Company Dispute Resolution",
  description:
    "Correct company details, account details, ownership or duplicate accounts on your CIBIL Company Credit Report. Raising a dispute is free for commercial entities.",
};

export default function Page() {
  return <CompanyDisputeContent />;
}
