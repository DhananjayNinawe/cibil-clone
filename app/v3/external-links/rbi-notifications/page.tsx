import type { Metadata } from "next";
import RbiNotificationsContent from "@/components/v3/pages/suit-filed/RbiNotificationsContent";

export const metadata: Metadata = {
  title: "RBI Notifications",
  description: "RBI Circulars pertaining to Credit Information and its Submission.",
};

export default function RbiNotificationsPage() {
  return <RbiNotificationsContent />;
}
