"use client";

import type { ElementType, ReactNode } from "react";
import { useSpotlight } from "@/lib/v2/motion";

interface CardProps {
  children: ReactNode;
  as?: ElementType;
  /** Cursor-tracked specular highlight. */
  spotlight?: boolean;
  /** Lifts on hover. Use for cards that are themselves a link or a target. */
  interactive?: boolean;
  /** Gradient rim that catches light from the top-left. */
  rim?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const PADDING: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-5",
  md: "p-7",
  lg: "p-8 sm:p-10",
};

/**
 * The V2 surface. Glass + rim + optional spotlight; depth comes from the layered rim and
 * shadow rather than from a border colour, which is what stops it reading as a Bootstrap card.
 */
export default function Card({
  children,
  as,
  spotlight = false,
  interactive = false,
  rim = true,
  padding = "md",
  className = "",
}: CardProps) {
  const Tag: ElementType = as ?? "div";
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <Tag
      ref={spotlight ? ref : undefined}
      onPointerMove={spotlight ? onPointerMove : undefined}
      className={[
        "relative overflow-hidden rounded-[var(--v2-r-lg)] v2-glass",
        rim ? "v2-rim" : "",
        spotlight ? "v2-spotlight" : "",
        interactive
          ? "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--v2-ease)] hover:-translate-y-1.5 hover:shadow-[var(--v2-shadow-3)] focus-within:-translate-y-1.5"
          : "",
        PADDING[padding],
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
