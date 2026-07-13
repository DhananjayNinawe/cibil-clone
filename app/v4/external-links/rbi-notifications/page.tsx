import type { Metadata } from "next";
import RbiNotificationsContent from "@/components/v4/pages/RbiNotificationsContent";

export const metadata: Metadata = {
  title: "RBI Notifications",
  description: "RBI Circulars pertaining to Credit Information and its Submission.",
};

export default function V4RbiNotificationsPage() {
  return <RbiNotificationsContent />;
}
