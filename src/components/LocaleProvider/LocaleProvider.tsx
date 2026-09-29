"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "ru";

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue>({ locale: "en", setLocale: () => undefined });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  useEffect(() => {
    const stored = localStorage.getItem("travellian-locale");
    if (stored === "ru" || stored === "en") setLocaleState(stored);
  }, []);
  const value = useMemo(() => ({ locale, setLocale: (next: Locale) => { setLocaleState(next); localStorage.setItem("travellian-locale", next); document.documentElement.lang = next; } }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
