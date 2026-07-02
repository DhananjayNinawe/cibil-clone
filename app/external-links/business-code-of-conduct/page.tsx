import type { Metadata } from "next";
import CodeOfConductContent from "@/components/code-of-conduct/CodeOfConductContent";

export const metadata: Metadata = {
  title: "Code of Business Conduct - CIBIL Ethics Helpline",
  description: "TransUnion Ethics Helpline for reporting violations of the Code of Business Conduct.",
};

export default function BusinessCodeOfConductPage() {
  return <CodeOfConductContent />;
}
