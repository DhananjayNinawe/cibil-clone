import type { Metadata } from "next";
import WatchAndLearnContent from "@/components/v4/pages/WatchAndLearnContent";

export const metadata: Metadata = {
  title: "Watch and Learn",
  description:
    "Watch and learn about credit with TransUnion CIBIL blog articles and videos.",
};

export default function V4WatchAndLearnPage() {
  return <WatchAndLearnContent />;
}
