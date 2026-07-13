import type { Metadata } from "next";
import NodalOfficerContent from "@/components/v4/pages/NodalOfficerContent";

export const metadata: Metadata = {
  title: "Nodal Officer List",
  description:
    "Nodal Officer contact details for banks and financial institutions — filter the register by institution.",
};

export default function V4NodalOfficerListPage() {
  return <NodalOfficerContent />;
}
