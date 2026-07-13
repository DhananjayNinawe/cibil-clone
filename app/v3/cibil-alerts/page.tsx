import type { Metadata } from "next";
import AlertsContent from "@/components/v3/pages/AlertsContent";

export const metadata: Metadata = {
  title: "CIBIL Alerts",
  description:
    "Stay informed & in control with CIBIL Alerts — get notified instantly of any changes in your CIBIL Score & Report.",
};

export default function V3CibilAlertsPage() {
  return <AlertsContent />;
}
