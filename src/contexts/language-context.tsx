"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Locale, Translation } from "@/i18n/types";
import { ar } from "@/i18n/ar";
import { en } from "@/i18n/en";

const translations: Record<Locale, Translation> = { ar, en };

type LangContextType = {
  locale: Locale;
  t: Translation;
  setLocale: (l: Locale) => void;
  dir: "rtl" | "ltr";
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("lang") as Locale | null;
    if (saved === "ar" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, mounted]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  return (
    <LangContext.Provider
      value={{
        locale,
        t: translations[locale],
        setLocale,
        dir: locale === "ar" ? "rtl" : "ltr",
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
