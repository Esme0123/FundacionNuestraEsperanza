import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Programs from "@/components/Programs";
import HowToHelp from "@/components/HowToHelp";
import Testimonials from "@/components/Testimonials";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Subscribe from "@/components/Suscribe";
import Footer from "@/components/Footer";
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutUs />
      <Programs/>
      <HowToHelp/>
      <Testimonials/>
      <News/>
      <Contact/>
      <Subscribe/>
      <Footer />
    </main>
  );
}
