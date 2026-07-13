import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicyContent from "@/components/privacy/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy - TransUnion CIBIL",
  description:
    "How TransUnion CIBIL Limited collects, uses, discloses, stores and protects your personal information across cibil.com and its other channels.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <PrivacyPolicyContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
