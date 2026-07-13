import type { Metadata } from "next";
import FrameworkCompensationContent from "@/components/v3/pages/FrameworkCompensationContent";

export const metadata: Metadata = {
  title: "Framework for Compensation - CIBIL",
  description: "Understand RBI's compensation framework for delayed dispute resolution on your CIBIL report.",
};

export default function FrameworkForCompensationPage() {
  return <FrameworkCompensationContent />;
}
