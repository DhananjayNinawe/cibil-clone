import type { Metadata } from "next";
import ScoreSimulatorContent from "@/components/v3/pages/faq/ScoreSimulatorContent";

export const metadata: Metadata = {
  title: "Score Simulator FAQs",
  description:
    "How the CIBIL Score Simulator works, where to find it, and whether simulating a credit decision affects your existing CIBIL Score.",
};

export default function Page() {
  return <ScoreSimulatorContent />;
}
