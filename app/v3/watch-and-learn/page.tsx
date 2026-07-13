import type { Metadata } from "next";
import WatchAndLearnContent from "@/components/v3/pages/WatchAndLearnContent";

export const metadata: Metadata = {
  title: "Watch and Learn",
  description:
    "Watch and learn about credit — short films from TransUnion CIBIL on your Score, your Report and the habits behind both.",
};

export default function Page() {
  return <WatchAndLearnContent />;
}
