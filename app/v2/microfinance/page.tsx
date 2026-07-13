import type { Metadata } from "next";
import MicrofinanceContent from "@/components/v2/pages/MicrofinanceContent";

export const metadata: Metadata = {
  title: "CIBIL Microfinance Score & Report",
  description:
    "Get your free CIBIL Microfinance Score & Report and stay credit-ready for your MFI loan.",
};

export default function MicrofinancePage() {
  return <MicrofinanceContent />;
}
