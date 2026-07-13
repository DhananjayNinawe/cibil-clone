import type { Metadata } from "next";
import OfficialPartnersContent from "@/components/v4/pages/OfficialPartnersContent";

export const metadata: Metadata = {
  title: "Official Partners",
  description: "TU CIBIL's official partners for distributing CIBIL Score and Report.",
};

export default function V4OfficialPartnersPage() {
  return <OfficialPartnersContent />;
}
