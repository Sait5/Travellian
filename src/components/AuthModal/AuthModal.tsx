"use client";

import { ArrowLeft, Check, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocale } from "../LocaleProvider/LocaleProvider";
import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./AuthModal.module.scss";

export type AuthMode = "login" | "signup";
type Props = {
  mode: AuthMode;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AuthModal({ mode, open, onClose, onSuccess }: Props) {
  const { locale } = useLocale();
  const { signIn, signUp } = useAuth();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("input")?.focus());
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const name = String(data.get("name") || email.split("@")[0] || "Traveler").trim();
    const confirmation = String(data.get("confirmation") || "");
    if (password.length < 8) return setError(locale === "ru" ? "Пароль должен содержать не менее 8 символов." : "Use at least 8 characters for your password.");
    if (activeMode === "signup" && password !== confirmation) return setError(locale === "ru" ? "Пароли пока не совпадают." : "The passwords do not match yet.");
    setSubmitting(true);
    const result = activeMode === "signup" ? await signUp(name, email, password) : await signIn(email, password);
    setSubmitting(false);
    if (result.error) return setError(locale === "ru" ? "Не удалось войти. Проверьте email и пароль." : "Could not sign in. Check your email and password.");
    setError("");
    if (result.needsConfirmation) {
      setNotice(locale === "ru" ? "Проверьте почту и подтвердите регистрацию, затем войдите." : "Check your email to confirm registration, then sign in.");
      return;
    }
    setNotice("");
    onSuccess();
    form.reset();
  }

  return (
    <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className={styles.visual}>
          <span>{locale === "ru" ? "ПУТЕШЕСТВУЙТЕ ПО-СВОЕМУ" : "TRAVEL, YOUR WAY"}</span>
          <h2>{locale === "ru" ? <>Один профиль.<br/>Мир планов.</> : <>One profile.<br />A world of plans.</>}</h2>
          <ul><li><Check size={17} /> {locale === "ru" ? "Сохраняйте любимые места" : "Save favorite places"}</li><li><Check size={17} /> {locale === "ru" ? "Храните маршруты вместе" : "Keep every itinerary together"}</li><li><Check size={17} /> {locale === "ru" ? "Получайте личные идеи" : "Get personal travel ideas"}</li></ul>
        </div>
        <div className={styles.formSide}>
          <button className={styles.close} type="button" onClick={onClose} aria-label={locale === "ru" ? "Вернуться на сайт" : "Back to site"}><ArrowLeft /><span>{locale === "ru" ? "Вернуться" : "Back"}</span></button>
          <div className={styles.tabs}>
            <button type="button" className={activeMode === "login" ? styles.active : ""} onClick={() => { setActiveMode("login"); setError(""); }}>{locale === "ru" ? "Вход" : "Log in"}</button>
            <button type="button" className={activeMode === "signup" ? styles.active : ""} onClick={() => { setActiveMode("signup"); setError(""); }}>{locale === "ru" ? "Регистрация" : "Sign up"}</button>
          </div>
          <p className={styles.kicker}>{locale === "ru" ? "ДОБРО ПОЖАЛОВАТЬ В TRAVELLIAN" : "WELCOME TO TRAVELLIAN"}</p>
          <h2 id="auth-title">{activeMode === "signup" ? (locale === "ru" ? "Создайте профиль путешественника" : "Create your traveler profile") : (locale === "ru" ? "С возвращением" : "Welcome back")}</h2>
          <p className={styles.intro}>{activeMode === "signup" ? (locale === "ru" ? "Сохраняйте идеи и собирайте следующее путешествие." : "Start saving ideas and shaping your next journey.") : (locale === "ru" ? "Откройте сохранённые планы и продолжайте исследовать." : "Open your saved plans and continue exploring.")}</p>
          <form onSubmit={submit}>
            {activeMode === "signup" && <label><span><User size={16} /> {locale === "ru" ? "Имя и фамилия" : "Full name"}</span><input name="name" autoComplete="name" placeholder={locale === "ru" ? "Алексей Морозов" : "Alex Morgan"} required /></label>}
            <label><span><Mail size={16} /> Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <label><span><LockKeyhole size={16} /> {locale === "ru" ? "Пароль" : "Password"}</span><div className={styles.password}><input name="password" type={showPassword ? "text" : "password"} autoComplete={activeMode === "signup" ? "new-password" : "current-password"} placeholder={locale === "ru" ? "Не менее 8 символов" : "8+ characters"} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
            {activeMode === "signup" && <label><span><LockKeyhole size={16} /> {locale === "ru" ? "Повторите пароль" : "Confirm password"}</span><input name="confirmation" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder={locale === "ru" ? "Повторите пароль" : "Repeat password"} required /></label>}
            {error && <p className={styles.error} role="alert">{error}</p>}
            {notice && <p className={styles.intro} role="status">{notice}</p>}
            <button className={styles.submit} type="submit" disabled={submitting}>{submitting ? (locale === "ru" ? "Подключаем…" : "Connecting…") : activeMode === "signup" ? (locale === "ru" ? "Создать профиль" : "Create profile") : (locale === "ru" ? "Войти" : "Log in")}</button>
          </form>
          <small>{locale === "ru" ? "Защищённая авторизация Supabase. Пароль не хранится на сайте." : "Secure Supabase authentication. Your password is never stored by the site."}</small>
        </div>
      </div>
    </div>
  );
}
