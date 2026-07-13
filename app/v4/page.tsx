import type { Metadata } from "next";
import Hero from "@/components/v4/home/Hero";
import Products from "@/components/v4/home/Products";
import Learn from "@/components/v4/home/Learn";
import Figures from "@/components/v4/home/Figures";
import SelfService from "@/components/v4/home/SelfService";
import Enrol from "@/components/v4/home/Enrol";

export const metadata: Metadata = {
  title: "Your CIBIL Score, in your hands",
  description:
    "Check your CIBIL Score and Report, understand what moves it, and stay loan-ready. Checking your own score never lowers it.",
};

/**
 * The front page.
 *
 * Six movements, and no two of them are laid out the same way — an instrument beside a headline, an
 * asymmetric pair of product planes, an editorial spread with a lead story, a night band of figures,
 * a list of things you can do yourself, and a single sentence in open space.
 *
 * The tones alternate all the way down (day · tint · day · night · tint · day). That rhythm is V4's
 * structure, not its decoration: it is what gives a long page a pulse without a single divider.
 */
export default function V4Home() {
  return (
    <>
      <Hero />
      <Products />
      <Learn />
      <Figures />
      <SelfService />
      <Enrol />
    </>
  );
}
