"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/i18n";

interface Slide {
  src: string;
  title: TranslationKey;
  subtitle: TranslationKey;
}

const SLIDES: Slide[] = [
  { src: "/login/login-banner.svg", title: "loginScoreTitle", subtitle: "loginScoreSubtitle" },
  { src: "/login/login-banner-3.svg", title: "loginStayTitle", subtitle: "loginStaySubtitle" },
  { src: "/login/login-banner-4.svg", title: "loginSimulatorTitle", subtitle: "loginSimulatorSubtitle" },
];

const ROTATE_MS = 5000;

export default function LoginCarousel() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Keyed on `active` so picking a dot restarts the dwell time rather than
  // advancing early on the tail of the previous slide's interval.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [active, paused]);

  return (
    <div
      className="flex flex-col items-center text-center max-w-md mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Grid stack: every slide shares one cell, so the container sizes to the
          tallest slide and crossfades without reflowing the page. */}
      <div className="grid w-full">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 flex flex-col items-center transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800">{t(slide.title)}</h2>
            <p className="mt-2 text-sm text-gray-500">{t(slide.subtitle)}</p>

            <div className="relative mt-8 h-[280px] w-[280px] sm:h-[340px] sm:w-[340px]">
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="(max-width: 640px) 280px, 340px"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-8">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={t(slide.title)}
            aria-current={active === i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              active === i ? "w-6 bg-[#00b0f0]" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
