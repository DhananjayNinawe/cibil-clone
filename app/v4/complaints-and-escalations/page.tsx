import type { Metadata } from "next";
import EscalationsContent from "@/components/v4/pages/EscalationsContent";

export const metadata: Metadata = {
  title: "Complaints and Escalations",
  description:
    "Ways to reach CIBIL for support, disputes and escalations — including the Nodal Officer and the RBI Integrated Ombudsman.",
};

export default function V4ComplaintsAndEscalationsPage() {
  return <EscalationsContent />;
}
