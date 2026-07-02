"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotificationBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#0a3a52] py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="text-center flex-1 text-xs sm:text-sm text-white">{t("ccrNotificationBanner")}</p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="text-white/70 hover:text-white text-lg leading-none shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
}
