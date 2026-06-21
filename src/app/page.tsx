import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Statistics from "@/components/home/Statistics";
import CTASection from "@/components/home/CTASection";
import Testimonials from "@/components/home/Testimonials";


export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <CTASection />
    </>
  );
}
