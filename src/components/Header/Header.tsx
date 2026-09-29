"use client";

import Link from "next/link";
import { Check, ChevronDown, LogOut, Menu, MessageCircle, Settings2, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import AuthModal, { AuthMode } from "../AuthModal/AuthModal";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Locale, useLocale } from "../LocaleProvider/LocaleProvider";
import styles from "./Header.module.scss";

export default function Header() {
  const { locale, setLocale } = useLocale();
  const { traveler, loading: authLoading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navItems = locale === "ru" ? [["Главная", "/"], ["Направления", "/explore"], ["Путешествия", "/travel"], ["Журнал", "/blog"], ["Тарифы", "/pricing"]] : [["Home", "/"], ["Explore", "/explore"], ["Travel", "/travel"], ["Blog", "/blog"], ["Pricing", "/pricing"]];
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => {
    const requireAuth = () => { setAuthMode("signup"); setAuthOpen(true); setOpen(false); };
    window.addEventListener("travellian:auth-required", requireAuth);
    return () => window.removeEventListener("travellian:auth-required", requireAuth);
  }, []);
  const showAuth = (mode: AuthMode) => { setAuthMode(mode); setAuthOpen(true); setOpen(false); };
  const renderAuthControls = () => authLoading ? <span className={styles.authLoading}>•••</span> : traveler ? <div className={styles.profile}><button type="button" className={styles.profileButton} onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen}><UserRound size={18}/><span>{traveler.name.split(" ")[0]}</span><ChevronDown size={15}/></button>{profileOpen && <div className={styles.profileMenu}><strong>{traveler.name}</strong><small>{traveler.email}</small><Link href={traveler.role === "consultant" ? "/consultant" : "/account"} onClick={() => setProfileOpen(false)}><MessageCircle size={16}/> {locale === "ru" ? (traveler.role === "consultant" ? "Кабинет консультанта" : "Чат с консультантом") : (traveler.role === "consultant" ? "Consultant desk" : "Chat with consultant")}</Link><button type="button" onClick={async () => { await signOut(); setProfileOpen(false); }}><LogOut size={16}/> {locale === "ru" ? "Выйти" : "Log out"}</button></div>}</div> : <><button type="button" className={styles.login} onClick={() => showAuth("login")}>{locale === "ru" ? "Войти" : "Log in"}</button><button type="button" className={styles.signup} onClick={() => showAuth("signup")}>{locale === "ru" ? "Регистрация" : "Sign up"}</button></>;
  const chooseLocale = (next: Locale) => { setLocale(next); setSettingsOpen(false); };
  const renderSettings = () => <div className={styles.settings}><button type="button" className={styles.settingsButton} aria-label={locale === "ru" ? "Настройки языка" : "Language settings"} aria-expanded={settingsOpen} onClick={() => setSettingsOpen((value) => !value)}><Settings2 size={19}/><span>{locale.toUpperCase()}</span></button>{settingsOpen && <div className={styles.settingsMenu}><span>{locale === "ru" ? "Язык сайта" : "Site language"}</span><button type="button" onClick={() => chooseLocale("ru")}><span>Русский</span>{locale === "ru" && <Check size={16}/>}</button><button type="button" onClick={() => chooseLocale("en")}><span>English</span>{locale === "en" && <Check size={16}/>}</button></div>}</div>;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.menuOpen : ""}`}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>Travellian<span>.</span></Link>
        <nav className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <div className={styles.mobileSettings}>{renderSettings()}</div><div className={styles.mobileActions}>{renderAuthControls()}</div>
        </nav>
        <div className={styles.actions}>{renderSettings()}{renderAuthControls()}</div>
        <button type="button" className={styles.menuButton} aria-label={open ? (locale === "ru" ? "Закрыть меню" : "Close menu") : (locale === "ru" ? "Открыть меню" : "Open menu")} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X size={26} /> : <Menu size={27} />}</button>
      </div>
      {authOpen && <AuthModal key={authMode} mode={authMode} open onClose={() => setAuthOpen(false)} onSuccess={() => setAuthOpen(false)} />}
    </header>
  );
}
