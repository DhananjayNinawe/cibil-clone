import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/subscription/Hero";
import PricingPlans from "@/components/subscription/PricingPlans";
import AppPromo from "@/components/subscription/AppPromo";

export const metadata: Metadata = {
  title: "Choose Your CIBIL Subscription",
  description: "Compare CIBIL Score & Report subscription plans and choose the one that fits you.",
};

export default function ChooseSubscriptionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="marketing" />
      <main className="flex-1">
        <section className="bg-[#e6f7fd]">
          <Hero />
          <div className="pb-12">
            <PricingPlans />
          </div>
        </section>
        <AppPromo />
      </main>
      <Footer variant="full" />
    </div>
  );
}
