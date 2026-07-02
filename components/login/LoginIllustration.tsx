"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function Illustration() {
  return (
    <svg viewBox="0 0 320 320" className="w-64 sm:w-80 mx-auto" role="img" aria-label="Person receiving a CIBIL alert notification on their phone">
      <circle cx="160" cy="160" r="150" fill="#dff3fb" />

      {/* legs */}
      <rect x="128" y="220" width="26" height="70" rx="10" fill="#5b4b8a" />
      <rect x="162" y="220" width="26" height="70" rx="10" fill="#5b4b8a" />

      {/* body */}
      <path d="M120 150 q40 -26 80 0 l6 76 q-46 20 -92 0 z" fill="#f0616f" />

      {/* head */}
      <circle cx="160" cy="120" r="30" fill="#3a2e28" />
      <circle cx="160" cy="126" r="24" fill="#2b211d" />

      {/* arm holding phone */}
      <path d="M188 150 q28 6 34 34 l-16 10 q-10 -22 -26 -28 z" fill="#f0616f" />
      <rect x="196" y="176" width="22" height="38" rx="4" fill="#222" transform="rotate(8 196 176)" />

      {/* chat bubbles */}
      <rect x="196" y="70" width="46" height="26" rx="6" fill="#8b7ad1" />
      <rect x="214" y="100" width="34" height="20" rx="6" fill="#a89ae0" />

      {/* notification bell */}
      <circle cx="240" cy="128" r="16" fill="#f5a623" />
      <path
        d="M240 120a7 7 0 00-7 7c0 6-2 8-3 10h20c-1-2-3-4-3-10a7 7 0 00-7-7z"
        fill="#fff"
      />
      <circle cx="240" cy="140" r="2" fill="#fff" />
    </svg>
  );
}

export default function LoginIllustration() {
  const { t } = useLanguage();
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">{t("loginStayTitle")}</h2>
      <p className="mt-2 text-sm text-gray-500">{t("loginStaySubtitle")}</p>

      <div className="mt-8">
        <Illustration />
      </div>

      <div className="flex items-center gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              active === i ? "w-6 bg-[#00b0f0]" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
