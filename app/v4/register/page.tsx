import type { Metadata } from "next";
import RegisterContent from "@/components/v4/pages/RegisterContent";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Open a free CIBIL account to monitor your credit score and report, and stay loan-ready.",
};

export default function V4RegisterPage() {
  return <RegisterContent />;
}
