"use client";

import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { FormEvent, useState } from "react";
import HeroWater from "./HeroWater";
import { useLocale } from "../LocaleProvider/LocaleProvider";
import styles from "./Hero.module.scss";

export default function Hero() {
  const { locale } = useLocale();
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const destination = String(form.get("destination") || "your destination"); setMessage(`Great choice — we’ll find the best stays for ${destination}.`); }
  return (
    <section className={styles.hero} id="home">
      <HeroWater />
      <div className={`container ${styles.container}`}>
        <div className={`${styles.content} ${locale === "ru" ? styles.contentRu : ""}`}><span className={styles.eyebrow}>{locale === "ru" ? "Путешествия, продуманные до деталей" : "Journeys, thoughtfully made"}</span><h1>{locale === "ru" ? "Начните незабываемое путешествие с нами." : "Start your unforgettable journey with us."}</h1><p>{locale === "ru" ? "Отобранные маршруты, удивительные места и всё необходимое для лёгкой поездки." : "Curated escapes, remarkable places, and everything you need to get there."}</p><div className={styles.liveNote}><span /> {locale === "ru" ? "Живой океан · проведите курсором по воде" : "Live ocean · Move across the water"}</div></div>
        <form className={`${styles.search} ${locale === "ru" ? styles.searchRu : ""}`} onSubmit={submit}>
          <div className={styles.field}><label htmlFor="destination"><MapPin size={16} /> {locale === "ru" ? "Куда" : "Destination"}</label><input id="destination" name="destination" type="text" placeholder={locale === "ru" ? "Куда хотите поехать?" : "Where do you want to go?"} required /></div>
          <div className={styles.field}><label htmlFor="person"><Users size={16} /> {locale === "ru" ? "Гости" : "Travelers"}</label><select id="person" name="person" defaultValue="2"><option value="1">{locale === "ru" ? "1 гость" : "1 traveler"}</option><option value="2">{locale === "ru" ? "2 гостя" : "2 travelers"}</option><option value="3">{locale === "ru" ? "3 гостя" : "3 travelers"}</option><option value="4">{locale === "ru" ? "4 гостя" : "4 travelers"}</option></select></div>
          <div className={styles.field}><label htmlFor="checkin"><CalendarDays size={16} /> {locale === "ru" ? "Заезд" : "Check in"}</label><input id="checkin" name="checkin" type="date" required /></div>
          <div className={styles.field}><label htmlFor="checkout"><CalendarDays size={16} /> {locale === "ru" ? "Выезд" : "Check out"}</label><input id="checkout" name="checkout" type="date" required /></div>
          <button type="submit" className={styles.explore}><Search size={19} /> {locale === "ru" ? "Найти" : "Book now"}</button>
          <p className={styles.message} aria-live="polite">{message}</p>
        </form>
      </div>
      <div className={styles.scrollCue} aria-hidden="true"><span /> Discover more</div>
      <a className={styles.credit} href="https://www.pexels.com/video/aerial-drone-view-of-ocean-waves-on-beach-29847475/" target="_blank" rel="noreferrer">Ocean film by Heitor Azevedo / Pexels</a>
    </section>
  );
}
