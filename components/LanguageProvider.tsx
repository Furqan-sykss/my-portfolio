"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "id" | "en";

type LanguageContextValue = {
  lang: Language;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "id";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "id" ? stored : "id";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "id" ? "id" : "en";
  }, [lang]);

  const toggleLang = () => setLang((current) => (current === "id" ? "en" : "id"));

  return <LanguageContext.Provider value={{ lang, toggleLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
