import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RbiNotificationsContent from "@/components/rbi-notifications/RbiNotificationsContent";

export const metadata: Metadata = {
  title: "RBI Notifications - TransUnion CIBIL",
  description: "RBI Circulars pertaining to Credit Information and its Submission.",
};

export default function RbiNotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <RbiNotificationsContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
