import type { Metadata } from "next";
import WatchAndLearnContent from "@/components/v2/pages/WatchAndLearnContent";

export const metadata: Metadata = {
  title: "Watch and Learn",
  description: "Watch and learn about credit with TransUnion CIBIL articles and videos.",
};

export default function WatchAndLearnPage() {
  return <WatchAndLearnContent />;
}
