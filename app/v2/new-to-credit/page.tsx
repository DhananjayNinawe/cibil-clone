import type { Metadata } from "next";
import NewToCreditContent from "@/components/v2/pages/NewToCreditContent";

export const metadata: Metadata = {
  title: "New To Credit",
  description:
    "New to credit? Start here — how a CIBIL Score is built, and how to keep it healthy from day one.",
};

export default function NewToCreditPage() {
  return <NewToCreditContent />;
}
