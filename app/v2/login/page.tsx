import type { Metadata } from "next";
import LoginContent from "@/components/v2/pages/LoginContent";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your CIBIL account to view your credit score and report.",
};

export default function V2LoginPage() {
  return <LoginContent />;
}
