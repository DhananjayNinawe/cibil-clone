import type { Metadata } from "next";
import BlogMainContent from "@/components/v4/pages/BlogMainContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Credit tips and news you can use — the TransUnion CIBIL blog.",
};

export default function V4BlogMainPage() {
  return <BlogMainContent />;
}
