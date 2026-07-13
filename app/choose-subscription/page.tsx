import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/subscription/Hero";
import PricingPlans from "@/components/subscription/PricingPlans";
import AppPromo from "@/components/subscription/AppPromo";
import SubscriptionFaq from "@/components/subscription/SubscriptionFaq";

export const metadata: Metadata = {
  title: "Choose Your CIBIL Subscription",
  description: "Compare CIBIL Score & Report subscription plans and choose the one that fits you.",
};

export default function ChooseSubscriptionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="marketing" />
      <main className="flex-1">
        <section className="bg-white">
          <Hero />
          <PricingPlans />
        </section>
        <AppPromo />
        <SubscriptionFaq />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
