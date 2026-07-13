import type { Metadata } from "next";
import FrameworkCompensationContent from "@/components/v2/pages/FrameworkCompensationContent";

export const metadata: Metadata = {
  title: "Framework for Compensation",
  description:
    "RBI gives lenders 21 days and CIBIL 9 to resolve a dispute. Miss the 30, and you are entitled to ₹100 for every day of delay. Here is how that framework works.",
};

export default function Page() {
  return <FrameworkCompensationContent />;
}
