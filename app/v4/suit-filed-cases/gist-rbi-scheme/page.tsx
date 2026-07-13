import type { Metadata } from "next";
import GistRbiSchemeContent from "@/components/v4/pages/GistRbiSchemeContent";

export const metadata: Metadata = {
  title: "Gist of RBI Scheme",
  description:
    "A gist of the Reserve Bank of India schemes for collection and dissemination of information on defaulters of ₹ 1 crore and above and wilful defaults of ₹ 25 lakh and above.",
};

export default function V4GistRbiSchemePage() {
  return <GistRbiSchemeContent />;
}
