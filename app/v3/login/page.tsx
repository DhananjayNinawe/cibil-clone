import type { Metadata } from "next";
import LoginContent from "@/components/v3/pages/LoginContent";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your CIBIL account to view your credit score and report.",
};

export default function V3LoginPage() {
  return <LoginContent />;
}
