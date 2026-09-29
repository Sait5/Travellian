"use client";

import { Check, MapPin } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import { useLocale } from "../../components/LocaleProvider/LocaleProvider";
import { destinations } from "../../data/destinations";
import { updateTripDraft, useTripDraft } from "../../lib/tripDraft";
import styles from "../InnerPages.module.scss";
import extra from "./PricingExtra.module.scss";

const plans = [
  { name: "Essential", nameRu: "Основной", price: 95, tag: "SMART START", tagRu: "УМНЫЙ СТАРТ", items: ["Curated day-by-day route", "Stay recommendations", "Local map and notes"], itemsRu: ["Маршрут по дням", "Проверенные отели", "Карта и местные заметки"] },
  { name: "Comfort", nameRu: "Комфорт", price: 145, tag: "MOST LOVED", tagRu: "ЧАЩЕ ВЫБИРАЮТ", items: ["Everything in Essential", "Restaurant reservations", "Private arrival transfer", "Live trip support"], itemsRu: ["Всё из тарифа «Основной»", "Бронирование ресторанов", "Индивидуальный трансфер", "Поддержка в поездке"] },
  { name: "Signature", nameRu: "Персональный", price: 235, tag: "FULLY PERSONAL", tagRu: "ПОЛНОСТЬЮ ЛИЧНЫЙ", items: ["Everything in Comfort", "Dedicated travel designer", "Priority experiences", "24/7 concierge"], itemsRu: ["Всё из тарифа «Комфорт»", "Личный тревел-дизайнер", "Приоритетные впечатления", "Консьерж 24/7"] },
];
const subscribeToLocation = () => () => undefined;

export default function PricingPage() {
  const { locale } = useLocale();
  const { draft } = useTripDraft();
  const selected = useSyncExternalStore(subscribeToLocation, () => new URLSearchParams(window.location.search).get("destination") ?? "", () => "");
  const destination = destinations.find((item) => item.slug === selected);

  return <main className={styles.page}>
    <Header/>
    <section className={styles.hero} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=88")' }}>
      <div className={`container ${styles.heroContent}`}>
        <span className={styles.eyebrow}>{locale === "ru" ? "ВСЁ ПОНЯТНО С САМОГО НАЧАЛА" : "CLEAR FROM THE START"}</span>
        <h1>{locale === "ru" ? "Планирование, которое действительно помогает." : "Planning that earns its place."}</h1>
        <p>{locale === "ru" ? "Выберите нужный уровень поддержки. Каждый маршрут остаётся личным, полезным и гибким." : "Choose how much support you want. Every level keeps the itinerary personal, useful and easy to change."}</p>
      </div>
    </section>
    <section className={styles.content}>
      <div className="container">
        {destination ? <div className={extra.selectedTrip}>
          <MapPin/>
          <div>
            <small>{locale === "ru" ? "ВЫБРАННЫЙ МАРШРУТ" : "SELECTED JOURNEY"}</small>
            <strong>{destination.city}, {destination.country}</strong>
            {draft?.destinationSlug === destination.slug && draft.hotelName ? <em>{locale === "ru" ? "Отель" : "Hotel"}: {draft.hotelName}</em> : null}
          </div>
          <span>{destination.days} {locale === "ru" ? "дней" : "days"} · {locale === "ru" ? "от" : "from"} €{destination.price}</span>
        </div> : null}
        <div className={styles.headingRow}>
          <h2>{locale === "ru" ? "Выберите свой ритм" : "Choose your pace"}</h2>
          <p>{locale === "ru" ? "Цена указана за путешественника в день. После выбора тарифа консультант уточнит детали поездки." : "Pricing is per traveler, per day. After plan selection, a consultant will confirm the journey details."}</p>
        </div>
        <div className={extra.paymentNotice}>
          <strong>{locale === "ru" ? "Оплата пока не списывается" : "No payment is charged yet"}</strong>
          <span>{locale === "ru" ? "Онлайн-оплата появится позже. Сейчас выбор тарифа сохраняет черновик и открывает защищённый чат с консультантом." : "Online checkout is coming later. For now, choosing a plan saves your draft and opens a secure consultant chat."}</span>
        </div>
        <div className={styles.pricing}>
          {plans.map((plan, index) => <article className={`${styles.plan} ${index === 1 ? styles.featured : ""}`} key={plan.name}>
            <span>{locale === "ru" ? plan.tagRu : plan.tag}</span>
            <h2>{locale === "ru" ? plan.nameRu : plan.name}</h2>
            <div className={styles.price}>€{plan.price}<small> / {locale === "ru" ? "день" : "day"}</small></div>
            <ul>{(locale === "ru" ? plan.itemsRu : plan.items).map((item) => <li key={item}><Check size={18}/>{item}</li>)}</ul>
            <Link
              href={destination ? `/account?destination=${destination.slug}&plan=${plan.name.toLowerCase()}` : "/account"}
              onClick={() => destination && updateTripDraft({ destinationSlug: destination.slug, city: destination.city, country: destination.country, basePrice: destination.price, days: destination.days, plan: locale === "ru" ? plan.nameRu : plan.name, planPrice: plan.price })}
            >
              {locale === "ru" ? "Выбрать и продолжить" : "Choose and continue"}
            </Link>
          </article>)}
        </div>
      </div>
    </section>
    <Footer/>
    <ScrollReveal/>
  </main>;
}
