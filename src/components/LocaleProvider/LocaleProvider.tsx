"use client";

import { createContext, ReactNode, useContext, useMemo, useSyncExternalStore } from "react";

export type Locale = "en" | "ru";

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue>({ locale: "en", setLocale: () => undefined });
const localeEvent = "travellian:locale-changed";
const subscribe = (callback: () => void) => {
  window.addEventListener(localeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(localeEvent, callback);
    window.removeEventListener("storage", callback);
  };
};
const getLocale = (): Locale => localStorage.getItem("travellian-locale") === "ru" ? "ru" : "en";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribe, getLocale, (): Locale => "en");
  const value = useMemo(() => ({ locale, setLocale: (next: Locale) => { localStorage.setItem("travellian-locale", next); document.documentElement.lang = next; window.dispatchEvent(new Event(localeEvent)); } }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
