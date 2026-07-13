import type { Metadata } from "next";
import LoginContent from "@/components/v4/pages/LoginContent";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your CIBIL account to see your credit score and report.",
};

export default function V4LoginPage() {
  return <LoginContent />;
}
