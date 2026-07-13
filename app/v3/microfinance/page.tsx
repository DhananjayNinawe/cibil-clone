import type { Metadata } from "next";
import MicrofinanceContent from "@/components/v3/pages/MicrofinanceContent";

export const metadata: Metadata = {
  title: "CIBIL Microfinance Score & Report",
  description:
    "Get your Free CIBIL Microfinance Score & Report today and stay credit ready for your MFI loan.",
};

export default function V3MicrofinancePage() {
  return <MicrofinanceContent />;
}
