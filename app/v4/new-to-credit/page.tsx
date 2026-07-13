import type { Metadata } from "next";
import NewToCreditContent from "@/components/v4/pages/NewToCreditContent";

export const metadata: Metadata = {
  title: "New To Credit",
  description:
    "New to credit? Blog articles from TransUnion CIBIL to help you get started.",
};

export default function V4NewToCreditPage() {
  return <NewToCreditContent />;
}
