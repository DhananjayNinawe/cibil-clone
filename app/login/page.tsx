import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import LoginCarousel from "@/components/login/LoginCarousel";

export const metadata: Metadata = {
  title: "Login - CIBIL",
  description: "Login to your CIBIL account to view your credit score and report.",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#eaf7fc]">
      <Header variant="auth" />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <LoginCarousel />
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
