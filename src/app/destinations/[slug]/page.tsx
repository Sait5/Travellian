import { notFound } from "next/navigation";
import DestinationDetail from "../../../components/DestinationDetail/DestinationDetail";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Newsletter from "../../../components/Newsletter/Newsletter";
import ScrollReveal from "../../../components/ScrollReveal/ScrollReveal";
import { destinations } from "../../../data/destinations";

export function generateStaticParams(){ return destinations.map((destination)=>({slug:destination.slug})); }

export default async function DestinationPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const destination=destinations.find((item)=>item.slug===slug);if(!destination)notFound();return <main><Header/><DestinationDetail destination={destination}/><Newsletter/><Footer/><ScrollReveal/></main>}
