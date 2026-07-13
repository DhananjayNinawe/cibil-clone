import type { Metadata } from "next";
import ScoreSimContent from "@/components/v4/pages/ScoreSimContent";

export const metadata: Metadata = {
  title: "Score Simulator FAQs",
  description:
    "What the CIBIL Score Simulator is, how it works, where to find it, and why simulating does not change your CIBIL Score.",
};

export default function V4ScoreSimulatorPage() {
  return <ScoreSimContent />;
}
