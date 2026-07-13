import type { Metadata } from "next";
import SubscriptionContent from "@/components/v2/pages/SubscriptionContent";

export const metadata: Metadata = {
  title: "Choose Your CIBIL Subscription",
  description:
    "Compare CIBIL Score & Report subscription plans — Basic, Standard, Premium and Starter — and choose the one that fits you.",
};

export default function V2ChooseSubscriptionPage() {
  return <SubscriptionContent />;
}
