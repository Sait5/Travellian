"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal";
import { destinations } from "../../data/destinations";
import { useLocale } from "../../components/LocaleProvider/LocaleProvider";
import styles from "../InnerPages.module.scss";

const regions = ["All", "City", "Coast", "Culture"];
const tags: Record<number, string> = { 1: "Culture", 2: "City", 3: "Culture", 4: "City", 5: "City", 6: "Coast" };

export default function ExplorePage(){
  const { locale } = useLocale();
  const [region,setRegion]=useState("All"); const [query,setQuery]=useState("");
  const filtered=useMemo(()=>destinations.filter((item)=>(region==="All"||tags[item.id]===region)&&`${item.title} ${item.location}`.toLowerCase().includes(query.toLowerCase())),[region,query]);
  return <main className={styles.page}><Header/><section className={styles.hero} style={{backgroundImage:'url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=88")'}}><div className={`container ${styles.heroContent}`}><span className={styles.eyebrow}>{locale==="ru"?"НАЙДИТЕ СВОЁ МЕСТО":"FIND YOUR NEXT PLACE"}</span><h1>{locale==="ru"?"Исследуйте больше очевидного.":"Explore beyond the obvious."}</h1><p>{locale==="ru"?"Города с характером, тихие побережья и путешествия, собранные вокруг ваших интересов.":"Browse characterful cities, quiet coastlines and journeys built around what you actually love."}</p></div></section><section className={styles.content}><div className="container"><div className={styles.headingRow}><h2>{locale==="ru"?"Места с собственной точкой зрения":"Places with a point of view"}</h2><p>{locale==="ru"?"Каждое направление выбрано за яркое ощущение места и дополнено практичными идеями для поездки.":"Every destination is selected for a distinct sense of place, then paired with practical ideas for experiencing it well."}</p></div><label className={styles.search}><Search size={19}/><span className="sr-only">Search destinations</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder={locale==="ru"?"Город или страна…":"Search a city or country…"}/></label><div className={styles.filters}>{regions.map((item)=><button key={item} className={region===item?styles.active:""} onClick={()=>setRegion(item)}>{locale==="ru"?({All:"Все",City:"Города",Coast:"Побережье",Culture:"Культура"} as Record<string,string>)[item]:item}</button>)}</div><div className={styles.cards}>{filtered.map((item)=><Link href={`/destinations/${item.slug}`} key={item.id}><article className={styles.card}><Image src={item.image} alt={item.title} width={900} height={1100}/><div className={styles.cardBody}><span>{tags[item.id]} · {locale==="ru"?"ГОТОВЫЙ МАРШРУТ":"CURATED ROUTE"}</span><h3>{item.city}</h3><p>{item.location}</p></div></article></Link>)}{!filtered.length&&<p className={styles.empty}>{locale==="ru"?"Ничего не найдено. Попробуйте другое название.":"No places match that search yet. Try another name."}</p>}</div></div></section><Footer/><ScrollReveal/></main>
}
