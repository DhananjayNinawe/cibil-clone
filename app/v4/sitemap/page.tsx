import type { Metadata } from "next";
import SitemapContent from "@/components/v4/pages/SitemapContent";

export const metadata: Metadata = {
  title: "Site Map",
  description: "Every page on the TransUnion CIBIL site, in one place.",
};

export default function V4SitemapPage() {
  return <SitemapContent />;
}
