import type { Metadata } from "next";
import FcsContent from "@/components/v2/pages/FcsContent";

export const metadata: Metadata = {
  title: "Free CIBIL Score & Report",
  description: "Get your Free CIBIL Score & Report instantly, once every calendar year.",
};

export default function V2FreeCibilScorePage() {
  return <FcsContent />;
}
