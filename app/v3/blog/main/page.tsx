import type { Metadata } from "next";
import BlogMainContent from "@/components/v3/pages/BlogMainContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Credit tips and news you can use — the TransUnion CIBIL blog, and every collection in the Knowledge Center.",
};

export default function Page() {
  return <BlogMainContent />;
}
