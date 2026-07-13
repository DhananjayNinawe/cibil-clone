import type { Metadata } from "next";
import ComplaintsEscalationsContent from "@/components/v3/pages/ComplaintsEscalationsContent";

export const metadata: Metadata = {
  title: "CIBIL Complaints and Escalations",
  description:
    "Ways to reach CIBIL for support, disputes, and escalations, including the Nodal Officer and RBI Ombudsman escalation path.",
};

export default function ComplaintsAndEscalationsPage() {
  return <ComplaintsEscalationsContent />;
}
