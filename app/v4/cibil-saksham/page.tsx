import type { Metadata } from "next";
import SakshamContent from "@/components/v4/pages/SakshamContent";

export const metadata: Metadata = {
  title: "CIBIL Saksham — Empowering You With Credit Knowledge",
  description:
    "CIBIL Saksham is a credit education platform by TransUnion CIBIL with interactive learning modules.",
};

export default function V4CibilSakshamPage() {
  return <SakshamContent />;
}
