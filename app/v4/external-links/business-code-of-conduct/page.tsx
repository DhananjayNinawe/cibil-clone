import type { Metadata } from "next";
import CodeOfConductContent from "@/components/v4/pages/CodeOfConductContent";

export const metadata: Metadata = {
  title: "Code of Business Conduct",
  description:
    "TransUnion Ethics Helpline for reporting violations of the Code of Business Conduct.",
};

export default function V4BusinessCodeOfConductPage() {
  return <CodeOfConductContent />;
}
