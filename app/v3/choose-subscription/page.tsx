import type { Metadata } from "next";
import SubscriptionContent from "@/components/v3/pages/SubscriptionContent";

export const metadata: Metadata = {
  title: "Choose Your CIBIL Subscription",
  description: "Compare CIBIL Score & Report subscription plans and choose the one that fits you.",
};

export default function V3ChooseSubscriptionPage() {
  return <SubscriptionContent />;
}
