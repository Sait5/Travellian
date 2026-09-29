"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { featuredHotels } from "../../data/destinations";
import { useLocale } from "../LocaleProvider/LocaleProvider";
import baseStyles from "./TripPlanners.module.scss";
import extraStyles from "./TripPlannersExtra.module.scss";

const styles = { ...baseStyles, ...extraStyles };

export default function TripPlanners() {
  const { locale } = useLocale();
  return <section className={styles.section} id="travel"><div className={`container ${styles.layout}`}>
    <div className={`${styles.intro} ${styles.introFit}`}><span>{locale === "ru" ? "Отели с характером" : "Stays with a sense of place"}</span><h2>{locale === "ru" ? "Отели для путешествия" : "Hotels for the journey"}</h2><i/><p>{locale === "ru" ? "Выбранные отели продолжают впечатление от города — расположением, архитектурой и сервисом." : "Selected stays continue the feeling of each destination through location, design and thoughtful service."}</p><Link href="/travel">{locale === "ru" ? "Посмотреть все отели" : "Explore all hotels"}</Link></div>
    <div className={styles.cards}>{featuredHotels.map((hotel,index)=><Link href={`/destinations/${hotel.slug}#hotels`} className={`${styles.card} ${styles.cardLift} ${index === 1 ? styles.active : ""}`} key={hotel.id}><div className={`${styles.image} ${styles.imageSheen}`}><Image src={hotel.image} alt={`${hotel.name}, ${hotel.city}`} fill sizes="(max-width:700px) 82vw,260px"/><div className={styles.imageOverlay}/><span className={styles.view}>{locale === "ru" ? "Открыть" : "View"}<ArrowUpRight/></span></div><div className={styles.meta}><span><MapPin size={13}/>{hotel.city}</span><span>{locale === "ru" ? "от" : "from"} €{hotel.price}</span></div><h3>{hotel.name}</h3><div className={styles.bottom}><p>{hotel.country}</p><span><Star size={15} fill="currentColor"/>{hotel.rating.toFixed(1)}</span></div></Link>)}</div>
  </div></section>;
}
