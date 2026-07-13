import type { Metadata } from "next";
import SitemapContent from "@/components/v2/pages/SitemapContent";

export const metadata: Metadata = {
  title: "Site Map",
  description:
    "Browse every section of the TransUnion CIBIL site: personal and business credit products, help centre, dispute resolution and more.",
};

export default function SitemapPage() {
  return <SitemapContent />;
}
