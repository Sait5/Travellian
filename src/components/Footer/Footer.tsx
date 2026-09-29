"use client";

import Link from "next/link";
import { Camera, Globe2, Mail, MapPin, Phone, Users } from "lucide-react";
import { useLocale } from "../LocaleProvider/LocaleProvider";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { locale } = useLocale();
  const menu = locale === "ru"
    ? [["Главная", "/"], ["Направления", "/explore"], ["Путешествия", "/travel"], ["Журнал", "/blog"], ["Тарифы", "/pricing"]]
    : [["Home", "/"], ["Explore", "/explore"], ["Travel", "/travel"], ["Blog", "/blog"], ["Pricing", "/pricing"]];

  return <footer className={styles.footer}>
    <div className={`container ${styles.grid}`}>
      <div className={styles.brand}>
        <Link href="/">Travellian<span>.</span></Link>
        <p>{locale === "ru" ? "Личные путешествия и места, которые остаются с вами." : "Journeys that feel personal, places that stay with you."}</p>
        <small>© 2026 Travellian.</small>
      </div>
      <div><h3>{locale === "ru" ? "Меню" : "Menu"}</h3>{menu.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div>
        <h3>{locale === "ru" ? "Информация" : "Information"}</h3>
        <Link href="/explore">{locale === "ru" ? "Направления" : "Destinations"}</Link>
        <Link href="/travel">{locale === "ru" ? "Планы поездок" : "Travel plans"}</Link>
        <Link href="/pricing">{locale === "ru" ? "Условия" : "Terms & conditions"}</Link>
        <Link href="/pricing">{locale === "ru" ? "Конфиденциальность" : "Privacy"}</Link>
      </div>
      <div className={styles.contact}>
        <h3>{locale === "ru" ? "Контакты" : "Contact"}</h3>
        <a href="tel:+442012345678"><Phone size={16}/>+44 20 1234 5678</a>
        <a href="mailto:hello@travellian.com"><Mail size={16}/>hello@travellian.com</a>
        <p><MapPin size={16}/>14 Wander Street, London</p>
        <div className={styles.social}>
          <Link href="/blog" aria-label="Photo journal"><Camera/></Link>
          <Link href="/explore" aria-label="Travel community"><Users/></Link>
          <Link href="/travel" aria-label="Travellian worldwide"><Globe2/></Link>
        </div>
      </div>
    </div>
  </footer>;
}
