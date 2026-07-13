"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SearchIcon, CloseIcon } from "@/components/icons";

interface SearchSectionProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function SearchSection({ query, onQueryChange }: SearchSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900">{t("nodalListHeading")}</h1>
        <p className="text-gray-600 mt-3">{t("nodalListSubtitle")}</p>

        <div className="relative mt-8">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label={t("nodalListSearchPlaceholder")}
            placeholder={t("nodalListSearchPlaceholder")}
            autoComplete="off"
            className="w-full border border-gray-300 rounded px-11 py-3 text-sm bg-white focus:outline-none focus:border-[#00b0f0] focus:ring-1 focus:ring-[#00b0f0]"
          />
          {query && (
            <button
              type="button"
              aria-label={t("searchClear")}
              onClick={() => onQueryChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
