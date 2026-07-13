import type { Metadata } from "next";
import CompanyHistoryContent from "@/components/v2/pages/CompanyHistoryContent";

export const metadata: Metadata = {
  title: "Company History",
  description: "The history and key milestones of TransUnion CIBIL from 2000 to today.",
};

export default function V2CompanyHistoryPage() {
  return <CompanyHistoryContent />;
}
