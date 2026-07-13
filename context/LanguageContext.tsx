"use client";

import { createContext, useContext, useCallback, useSyncExternalStore, ReactNode } from "react";
import { Language, TranslationKey, translations } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "cibil-language";
const DEFAULT_LANGUAGE: Language = "en";

const isLanguage = (value: string | null): value is Language =>
  value !== null && value in translations;

/**
 * The selected language is persisted in localStorage — without it the choice is lost on
 * every reload, direct URL visit or shared link, dropping the reader back to English.
 *
 * localStorage is an external store, so it is read through useSyncExternalStore rather
 * than mirrored into state: that keeps SSR correct (the server has no localStorage, so it
 * renders `getServerSnapshot`, and React re-renders with the stored value after hydration).
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // Keep other tabs in sync.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): Language {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isLanguage(saved) ? saved : DEFAULT_LANGUAGE;
}

/** The server cannot know the reader's choice, so it always renders the default. */
function getServerSnapshot(): Language {
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    // `storage` only fires in *other* tabs, so notify this one explicitly.
    listeners.forEach((listener) => listener());
  }, []);

  const t = useCallback(
    (key: TranslationKey): string =>
      translations[language][key] ?? translations[DEFAULT_LANGUAGE][key] ?? key,
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
