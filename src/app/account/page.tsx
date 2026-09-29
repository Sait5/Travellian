"use client";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TravelChat from "../../components/TravelChat/TravelChat";
import { useLocale } from "../../components/LocaleProvider/LocaleProvider";
import styles from "../PortalPage.module.scss";

export default function AccountPage(){const{locale}=useLocale();return <main className={styles.page}><Header/><section className={styles.hero}><div className="container"><span>{locale==="ru"?"ЛИЧНЫЙ КАБИНЕТ":"TRAVELER SPACE"}</span><h1>{locale==="ru"?"Ваше путешествие начинается с разговора.":"A better journey starts with a conversation."}</h1><p>{locale==="ru"?"Обсудите маршрут, отель и детали поездки напрямую с консультантом Travellian.":"Discuss the route, hotel and every journey detail directly with your Travellian consultant."}</p></div></section><section className={styles.content}><div className="container"><TravelChat/></div></section><Footer/></main>}
