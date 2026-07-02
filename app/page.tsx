import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductsServices from "@/components/home/ProductsServices";
import LearnAboutCredit from "@/components/home/LearnAboutCredit";
import StatsBar from "@/components/home/StatsBar";
import SelfService from "@/components/home/SelfService";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <HeroSection />
        <ProductsServices />
        <LearnAboutCredit />
        <StatsBar />
        <SelfService />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
