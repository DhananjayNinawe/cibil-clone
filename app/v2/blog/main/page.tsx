import type { Metadata } from "next";
import BlogMainContent from "@/components/v2/pages/BlogMainContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Credit tips and news you can use — the TransUnion CIBIL blog.",
};

export default function BlogMainPage() {
  return <BlogMainContent />;
}
