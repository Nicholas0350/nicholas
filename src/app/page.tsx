import Hero from "@/components/landing/Hero";
import Proof from "@/components/landing/Proof";
import ProblemAgitation from "@/components/landing/ProblemAgitation";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import OfferStack from "@/components/landing/OfferStack";
import Pricing from "@/components/landing/Pricing";
import Guarantee from "@/components/landing/Guarantee";
import Urgency from "@/components/landing/Urgency";
import CaseStudy from "@/components/landing/CaseStudy";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Partners from "@/components/landing/Partners";
import Testimonials from "@/components/landing/Testimonials";
import LovedBy from "@/components/landing/LovedBy";
import BigCTA from "@/components/landing/BigCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <Proof />
      <ProblemAgitation />
      <Benefits />
      <HowItWorks />
      <OfferStack />
      <Pricing />
      <Guarantee />
      <Testimonials />
      <LovedBy />
      <BigCTA />
      <Urgency />
      <CaseStudy />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
