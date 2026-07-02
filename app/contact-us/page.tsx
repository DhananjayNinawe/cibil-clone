import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/contact/HeroBanner";
import QuickLinksSection from "@/components/contact/QuickLinksSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ChatWidget from "@/components/contact/ChatWidget";

export const metadata: Metadata = {
  title: "Contact Us - CIBIL",
  description: "Quick links for CIBIL consumer, commercial, and microfinance support, plus contact details.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroBanner />
        <QuickLinksSection />
        <ContactInfoSection />
      </main>
      <Footer variant="full" accentTop />
      <ChatWidget />
    </div>
  );
}
