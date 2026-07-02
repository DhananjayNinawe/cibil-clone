import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/blog-grid/BlogGrid";
import { WATCH_LEARN_CARDS } from "@/lib/blogCards";

export const metadata: Metadata = {
  title: "Watch and Learn - CIBIL",
  description: "Watch and learn about credit with TransUnion CIBIL blog articles and videos.",
};

export default function WatchAndLearnPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="site" />
      <main className="flex-1">
        <BlogGrid titleKey="watchLearnTitle" cards={WATCH_LEARN_CARDS} gradient="from-[#7a8a5a] to-[#3a4a2a]" />
      </main>
      <Footer variant="full" accentTop />
    </div>
  );
}
