import type { Metadata } from "next";
import FrameworkContent from "@/components/v4/pages/FrameworkContent";

export const metadata: Metadata = {
  title: "Framework for Compensation",
  description:
    "RBI's compensation framework for delayed dispute resolution: ₹100 for each day a correction to your credit information runs past 30 days.",
};

export default function V4FrameworkForCompensationPage() {
  return <FrameworkContent />;
}
