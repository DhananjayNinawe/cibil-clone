import type { Metadata } from "next";
import NewToCreditContent from "@/components/v3/pages/NewToCreditContent";

export const metadata: Metadata = {
  title: "New To Credit",
  description:
    "New to credit? Start here — what a CIBIL Score is, how to establish credit, and how to keep it healthy from the first account onwards.",
};

export default function Page() {
  return <NewToCreditContent />;
}
