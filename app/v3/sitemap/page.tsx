import type { Metadata } from "next";
import SitemapContent from "@/components/v3/pages/SitemapContent";

export const metadata: Metadata = {
  title: "Site Map",
  description:
    "Browse every section of the TransUnion CIBIL site: personal and business credit products, help centre, dispute resolution and more.",
};

export default function V3SitemapPage() {
  return <SitemapContent />;
}
