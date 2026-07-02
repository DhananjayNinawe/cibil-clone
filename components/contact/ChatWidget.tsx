"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ChatBubbleIcon } from "@/components/icons";

export default function ChatWidget() {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => alert("Chat is not available in this demo.")}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#f5c518] hover:bg-[#e8b800] text-gray-900 text-sm font-bold rounded-full pl-5 pr-4 py-3 shadow-lg transition-colors"
    >
      {t("chatWithCibil")}
      <ChatBubbleIcon />
    </button>
  );
}
