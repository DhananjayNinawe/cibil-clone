import type { Metadata } from "next";
import ComplaintsEscalationsContent from "@/components/v2/pages/ComplaintsEscalationsContent";

export const metadata: Metadata = {
  title: "Complaints and Escalations",
  description:
    "Every way to reach CIBIL, the 30-day dispute review timeline, and the full escalation ladder — Nodal Officer, Principal Nodal Officer and the RBI Integrated Ombudsman.",
};

export default function Page() {
  return <ComplaintsEscalationsContent />;
}
