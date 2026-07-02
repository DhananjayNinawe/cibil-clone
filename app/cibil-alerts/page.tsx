import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlertsContent from "@/components/alerts/AlertsContent";

export const metadata: Metadata = {
  title: "CIBIL Alerts",
  description: "Stay informed & in control with CIBIL Alerts — get notified instantly of any changes in your CIBIL Score & Report.",
};

export default function CibilAlertsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <AlertsContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
