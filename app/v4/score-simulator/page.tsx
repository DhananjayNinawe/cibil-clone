import type { Metadata } from "next";
import ScoreSimulatorContent from "@/components/v4/pages/ScoreSimulatorContent";

export const metadata: Metadata = {
  title: "Score Simulator",
  description:
    "Make the right credit decisions with the CIBIL Score Simulator — see how your credit actions can impact your CIBIL Score.",
};

export default function V4ScoreSimulatorPage() {
  return <ScoreSimulatorContent />;
}
