import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/about/HeroSection";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us - TransUnion CIBIL",
  description: "TransUnion CIBIL is India's leading credit information company with one of the largest collections of consumer information.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <AboutContent />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
