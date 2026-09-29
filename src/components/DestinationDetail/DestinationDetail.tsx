"use client";

import { ArrowLeft, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Coffee, MapPin, Plane, ShieldCheck, Star, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { destinationHotels, destinationPlaces, destinations } from "../../data/destinations";
import { useLocale } from "../LocaleProvider/LocaleProvider";
import baseStyles from "./DestinationDetail.module.scss";
import extraStyles from "./DestinationDetailExtra.module.scss";

const styles = { ...baseStyles, ...extraStyles };

type Destination = (typeof destinations)[number];
type Detail = { kind: "hotel" | "place"; title: string; image: string; subtitle: string; description: string; facts: string[]; price?: number };

export default function DestinationDetail({ destination }: { destination: Destination }) {
  const { locale } = useLocale();
  const router = useRouter();
  const [booked, setBooked] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [month, setMonth] = useState(() => new Date(2026, 9, 1));
  const [date, setDate] = useState<Date | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [authNotice, setAuthNotice] = useState(false);
  const places = destinationPlaces[destination.slug];
  const hotels = destinationHotels[destination.slug];
  const days = useMemo(() => Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() }, (_, i) => i + 1), [month]);
  const offset = (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7;

  useEffect(() => {
    document.body.style.overflow = detail ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detail]);

  const requireTraveler = () => {
    if (localStorage.getItem("travellian-user")) return true;
    setAuthNotice(true);
    window.dispatchEvent(new Event("travellian:auth-required"));
    return false;
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!requireTraveler()) return; setAuthNotice(false); setBooked(true); };
  const addToRoute = () => { if (!requireTraveler()) return; router.push(`/pricing?destination=${destination.slug}`); };
  const formatDate = (value: Date) => new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(value);
  const openPlace = (index: number) => { const place = places[index]; setDetail({ kind: "place", title: locale === "ru" ? place.nameRu : place.name, image: place.image, subtitle: locale === "ru" ? place.categoryRu : place.category, description: locale === "ru" ? place.descriptionRu : place.description, facts: locale === "ru" ? ["Реальное место и подлинная фотография", "Часы посещения уточняются перед поездкой", "Билеты можно включить в маршрут", "Консультант подберёт спокойное время"] : ["A real place with an authentic photo", "Opening hours checked before travel", "Tickets can be added to the route", "Your consultant selects a quieter time"] }); };
  const openHotel = (index: number) => { const hotel = hotels[index]; setDetail({ kind: "hotel", title: hotel.name, image: hotel.image, subtitle: locale === "ru" ? hotel.typeRu : hotel.type, description: locale === "ru" ? hotel.descriptionRu : hotel.description, facts: locale === "ru" ? ["Реальный отель и фотография объекта", "Условия завтрака зависят от тарифа", "Отмена и время заезда уточняются при бронировании", "Трансфер можно добавить отдельно"] : ["A real hotel with a property photo", "Breakfast depends on the selected rate", "Cancellation and check-in terms confirmed at booking", "Airport transfer can be added separately"], price: hotel.price }); };

  return <>
    <section className={styles.hero} style={{ "--accent": destination.accent } as React.CSSProperties}>
      <Image src={destination.image} alt={destination.location} fill priority sizes="100vw"/><div className={styles.shade}/>
      <div className={`container ${styles.heroInner}`}><Link href="/explore" className={`${styles.back} ${styles.backRaised}`}><ArrowLeft/>{locale === "ru" ? "Все направления" : "All destinations"}</Link><div className={styles.heroCopy}><span>{destination.country} · {destination.days} {locale === "ru" ? "дней" : "days"}</span><h1>{destination.city}</h1><p>{locale === "ru" ? destination.descriptionRu : destination.description}</p><div className={styles.quick}><span><Star fill="currentColor"/>{destination.rating}</span><span><MapPin/>{destination.location}</span><span><Clock3/>{locale === "ru" ? "Лучшее время: апрель — октябрь" : "Best time: April — October"}</span></div></div></div>
    </section>
    <section className={styles.intro}><div className={`container ${styles.introGrid}`}><div><span className={styles.kicker}>{locale === "ru" ? "ГОРОД В ВАШЕМ РИТМЕ" : "THE CITY, AT YOUR PACE"}</span><h2>{locale === "ru" ? "Не список мест. Цельное путешествие." : "Not a checklist. A complete journey."}</h2><p>{locale === "ru" ? `Мы собрали ${destination.city} так, чтобы важные места сочетались с неторопливыми открытиями, хорошей едой и временем без планов.` : `We shape ${destination.city} so essential places sit naturally beside slow discoveries, good food and room for the unplanned.`}</p><div className={styles.perks}><span><Plane/>{locale === "ru" ? "Перелёт включён" : "Flights included"}</span><span><ShieldCheck/>{locale === "ru" ? "Поддержка 24/7" : "24/7 support"}</span><span><Coffee/>{locale === "ru" ? "Местные рекомендации" : "Local recommendations"}</span></div></div>
      <form className={styles.booking} onSubmit={submit}><span>{locale === "ru" ? "ПАКЕТ НА ЧЕЛОВЕКА" : "PACKAGE PER TRAVELER"}</span><div className={styles.price}><strong>€{destination.price}</strong><small>{locale === "ru" ? "перелёт + отель + маршрут" : "flight + hotel + route"}</small></div><label><span><CalendarDays/> {locale === "ru" ? "Дата поездки" : "Travel date"}</span><button className={styles.dateButton} type="button" onClick={() => setCalendarOpen(!calendarOpen)}>{date ? formatDate(date) : locale === "ru" ? "Выберите дату" : "Choose a date"}</button></label>{calendarOpen && <div className={styles.calendar}><div className={styles.calendarHead}><button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft/></button><strong>{new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", { month: "long", year: "numeric" }).format(month)}</strong><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight/></button></div><div className={styles.weekdays}>{(locale === "ru" ? ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"] : ["Mo","Tu","We","Th","Fr","Sa","Su"]).map(day => <span key={day}>{day}</span>)}</div><div className={styles.days}>{Array.from({ length: offset }, (_, i) => <i key={`blank-${i}`}/>)}{days.map(day => <button type="button" className={date?.getDate() === day && date.getMonth() === month.getMonth() ? styles.selected : ""} key={day} onClick={() => { setDate(new Date(month.getFullYear(), month.getMonth(), day)); setCalendarOpen(false); }}>{day}</button>)}</div></div>}<label><span><Users/> {locale === "ru" ? "Путешественники" : "Travelers"}</span><select className={styles.roundSelect} defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></label><button type="submit">{locale === "ru" ? "Запросить поездку" : "Request this journey"}</button>{authNotice && <p className={styles.authNotice}>{locale === "ru" ? "Сначала зарегистрируйтесь — так консультант сможет связаться с вами." : "Please sign up first so a consultant can contact you."}</p>}{booked && <p className={styles.success}><Check/>{locale === "ru" ? "Запрос сохранён. Мы подготовим детали." : "Request saved. We’ll prepare the details."}</p>}</form>
    </div></section>
    <section className={styles.places} id="attractions"><div className="container"><div className={styles.sectionHead}><span className={styles.kicker}>{locale === "ru" ? "НЕ ПРОПУСТИТЕ" : "DON’T MISS"}</span><h2>{locale === "ru" ? "Места с историей" : "Places with a story"}</h2></div><div className={styles.placeGrid}>{places.map((place,index) => { const name = locale === "ru" ? place.nameRu : place.name; return <article key={place.name} role="button" tabIndex={0} onClick={() => openPlace(index)} onKeyDown={event => event.key === "Enter" && openPlace(index)}><div className={styles.placeImage}><Image src={place.image} alt={name} fill sizes="(max-width:700px) 100vw,33vw"/></div><div><small>{locale === "ru" ? place.categoryRu : place.category}</small><h3 className={styles.longTitle}>{name}</h3><p>{locale === "ru" ? "Открыть историю, советы и детали маршрута." : "Open its story, tips and route details."}</p></div></article>; })}</div></div></section>
    <section className={styles.hotels} id="hotels"><div className="container"><div className={styles.sectionHead}><span className={styles.kicker}>{locale === "ru" ? "ГДЕ ОСТАНОВИТЬСЯ" : "WHERE TO STAY"}</span><h2>{locale === "ru" ? `Отели в ${destination.city}` : `Hotels in ${destination.city}`}</h2></div><div className={styles.hotelGrid}>{hotels.map((hotel,index)=><article key={hotel.name} role="button" tabIndex={0} onClick={() => openHotel(index)} onKeyDown={event => event.key === "Enter" && openHotel(index)}><div className={styles.hotelImage}><Image src={hotel.image} alt={hotel.name} fill sizes="(max-width:700px) 100vw,33vw"/><span><Star fill="currentColor"/> {hotel.rating.toFixed(1)}</span></div><div className={styles.hotelInfo}><div><small>{locale === "ru" ? hotel.typeRu : hotel.type}</small><h3>{hotel.name}</h3></div><strong>€{hotel.price}<small> / {locale === "ru" ? "ночь" : "night"}</small></strong></div></article>)}</div></div></section>
    {detail && <div className={styles.detailBackdrop} onMouseDown={() => setDetail(null)}><article className={styles.detailModal} onMouseDown={event => event.stopPropagation()}><button className={styles.detailClose} onClick={() => setDetail(null)} aria-label={locale === "ru" ? "Закрыть" : "Close"}><X/></button><div className={styles.detailVisual}><Image src={detail.image} alt={detail.title} fill sizes="(max-width:800px) 100vw,48vw"/></div><div className={styles.detailCopy}><small>{detail.subtitle}</small><h2>{detail.title}</h2><p>{detail.description}</p><ul>{detail.facts.map(fact => <li key={fact}><Check/>{fact}</li>)}</ul>{detail.price && <div className={styles.detailPrice}><strong>€{detail.price}</strong><span>/ {locale === "ru" ? "ночь, завтрак включён" : "night, breakfast included"}</span></div>}<button onClick={addToRoute}>{locale === "ru" ? "Выбрать тариф и добавить" : "Choose a plan and add"}</button></div></article></div>}
  </>;
}
