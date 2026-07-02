import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/escalations/HeroSection";
import ConcernsMatterSection from "@/components/escalations/ConcernsMatterSection";
import WaysToReachUsSection from "@/components/escalations/WaysToReachUsSection";
import TimelineSection from "@/components/escalations/TimelineSection";
import EscalationFrameworkSection from "@/components/escalations/EscalationFrameworkSection";

export const metadata: Metadata = {
  title: "CIBIL Complaints and Escalations",
  description: "Ways to reach CIBIL for support, disputes, and escalations, including the Nodal Officer and RBI Ombudsman escalation path.",
};

export default function ComplaintsAndEscalationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <ConcernsMatterSection />
        <WaysToReachUsSection />
        <TimelineSection />
        <EscalationFrameworkSection />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
