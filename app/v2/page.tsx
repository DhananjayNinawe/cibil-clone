import type { Metadata } from "next";
import Hero from "@/components/v2/home/Hero";
import TrustStrip from "@/components/v2/home/TrustStrip";
import Products from "@/components/v2/home/Products";
import Learn from "@/components/v2/home/Learn";
import Stats from "@/components/v2/home/Stats";
import SelfService from "@/components/v2/home/SelfService";

export const metadata: Metadata = {
  title: "Your CIBIL Score, in your hands",
  description:
    "Check your CIBIL Score and Report, understand what moves it, and stay loan-ready. Checking your own score never lowers it.",
};

export default function V2Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Products />
      <Learn />
      <Stats />
      <SelfService />
    </>
  );
}
