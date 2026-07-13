import type { Metadata } from "next";
import Header from "@/components/Header";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create your CIBIL Account",
  description: "Register for a free CIBIL account to monitor your credit score and report.",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="full" />
      <main className="flex-1">
        <RegistrationForm />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
