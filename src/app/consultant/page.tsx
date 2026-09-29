"use client";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TravelChat from "../../components/TravelChat/TravelChat";
import { useLocale } from "../../components/LocaleProvider/LocaleProvider";
import styles from "../PortalPage.module.scss";

export default function ConsultantPage(){const{locale}=useLocale();return <main className={styles.page}><Header/><section className={`${styles.hero} ${styles.consultantHero}`}><div className="container"><span>{locale==="ru"?"КАБИНЕТ КОНСУЛЬТАНТА":"CONSULTANT DESK"}</span><h1>{locale==="ru"?"Все путешественники — в одном спокойном пространстве.":"Every traveler, one calm workspace."}</h1><p>{locale==="ru"?"Отвечайте на обращения, уточняйте детали и ведите поездку до готового маршрута.":"Reply to requests, clarify details and guide each journey toward a finished plan."}</p></div></section><section className={styles.content}><div className="container"><TravelChat consultantView/></div></section><Footer/></main>}
