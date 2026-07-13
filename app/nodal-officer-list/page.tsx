import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NodalOfficerSearch from "@/components/nodal-officer/NodalOfficerSearch";

export const metadata: Metadata = {
  title: "Nodal Officer List - CIBIL",
  description: "Find Nodal Officer contact details for banks and financial institutions.",
};

export default function NodalOfficerListPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <NodalOfficerSearch />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
