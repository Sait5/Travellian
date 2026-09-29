import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import PopularDestinations from "../components/PopularDestinations/PopularDestinations";
import SpecialOffer from "../components/SpecialOffer/SpecialOffer";
import OurBlog from "../components/OurBlog/OurBlog";
import TripPlanners from "../components/TripPlanners/TripPlanners";
import DestinationGallery from "../components/DestinationGallery/DestinationGallery";
import Testimonials from "../components/Testimonials/Testimonials";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <PopularDestinations />
      <SpecialOffer />
      <OurBlog />
      <TripPlanners />
      <DestinationGallery />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ScrollReveal />
    </main>
  );
}
