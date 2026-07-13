import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GistRbiSchemeContent from "@/components/suit-filed/GistRbiSchemeContent";

export const metadata: Metadata = {
  title: "Gist of RBI Scheme - TransUnion CIBIL",
  description:
    "A gist of the Reserve Bank of India schemes for collection and dissemination of information on defaulters of ₹ 1 crore and above and wilful defaults of ₹ 25 lakh and above.",
};

export default function GistRbiSchemePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <GistRbiSchemeContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
