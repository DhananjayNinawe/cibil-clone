import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/v4/pages/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TransUnion CIBIL Limited collects, uses, discloses, stores and protects your personal information across cibil.com and its other channels.",
};

export default function V4PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
