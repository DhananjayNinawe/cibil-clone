import type { Metadata } from "next";
import AlertsContent from "@/components/v2/pages/AlertsContent";

export const metadata: Metadata = {
  title: "CIBIL Alerts",
  description:
    "Stay informed and in control with CIBIL Alerts — get notified instantly of any change in your CIBIL Score & Report.",
};

export default function V2CibilAlertsPage() {
  return <AlertsContent />;
}
