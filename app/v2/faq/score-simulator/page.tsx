import type { Metadata } from "next";
import ScoreSimulatorContent from "@/components/v2/pages/faq/ScoreSimulatorContent";

export const metadata: Metadata = {
  title: "Score Simulator FAQs",
  description:
    "How the CIBIL Score Simulator works, where to find it, and how simulating credit decisions helps you plan.",
};

export default function ScoreSimulatorFaqPage() {
  return <ScoreSimulatorContent />;
}
