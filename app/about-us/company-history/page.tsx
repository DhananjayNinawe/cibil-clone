import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyHistoryContent from "@/components/company-history/CompanyHistoryContent";

export const metadata: Metadata = {
  title: "Company History - TransUnion CIBIL",
  description: "The history and key milestones of TransUnion CIBIL from 2000 to today.",
};

export default function CompanyHistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <CompanyHistoryContent />
      </main>
      <Footer variant="corporate" accentTop />
    </div>
  );
}
