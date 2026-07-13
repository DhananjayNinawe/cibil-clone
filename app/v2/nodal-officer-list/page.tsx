import type { Metadata } from "next";
import NodalOfficerContent from "@/components/v2/pages/NodalOfficerContent";

export const metadata: Metadata = {
  title: "Nodal Officer List",
  description:
    "Search Nodal Officer contact details for banks and financial institutions — the escalation route when a lender has not resolved your dispute.",
};

export default function Page() {
  return <NodalOfficerContent />;
}
