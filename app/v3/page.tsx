import type { Metadata } from "next";
import Hero from "@/components/v3/home/Hero";
import Products from "@/components/v3/home/Products";
import Library from "@/components/v3/home/Library";
import Figures from "@/components/v3/home/Figures";
import SelfService from "@/components/v3/home/SelfService";
import Enrol from "@/components/v3/home/Enrol";

export const metadata: Metadata = {
  title: "Your CIBIL Score, in your hands",
  description:
    "Check your CIBIL Score and Report, understand what moves it, and stay loan-ready. Checking your own score never lowers it.",
};

/**
 * The front page.
 *
 * Five movements, each with a different rhythm on purpose: a ruled editorial spread, a ledger of
 * numbered entries, a newspaper library with a lead story, an ink band of figures, a list of
 * clauses, and a closing line in open space. No two sections are laid out the same way, and none
 * of them is a grid of equal cards.
 */
export default function V3Home() {
  return (
    <>
      <Hero />
      <Products />
      <Library />
      <Figures />
      <SelfService />
      <Enrol />
    </>
  );
}
