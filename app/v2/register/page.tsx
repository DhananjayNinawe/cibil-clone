import type { Metadata } from "next";
import RegisterContent from "@/components/v2/pages/RegisterContent";

export const metadata: Metadata = {
  title: "Create your CIBIL Account",
  description: "Register for a free CIBIL account to monitor your credit score and report.",
};

export default function V2RegisterPage() {
  return <RegisterContent />;
}
