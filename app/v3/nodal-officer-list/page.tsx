import type { Metadata } from "next";
import NodalOfficerContent from "@/components/v3/pages/NodalOfficerContent";

export const metadata: Metadata = {
  title: "Nodal Officer List",
  description: "Find Nodal Officer contact details for banks and financial institutions.",
};

export default function V3NodalOfficerListPage() {
  return <NodalOfficerContent />;
}
