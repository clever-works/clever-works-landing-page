import { FAQChatbot } from "@/components/interactions/faq-chatbot";
import { FloatingContactActions } from "@/components/interactions/floating-contact-actions";
import { Header } from "@/components/interactions/header";
import { AboutBand } from "@/components/sections/about-band";
import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { IntroStrip } from "@/components/sections/intro-strip";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Tech } from "@/components/sections/tech";
import { Why } from "@/components/sections/why";
import { Work } from "@/components/sections/work";

export default function Home() {
  return <>
    <Header />
    <main>
      <Hero />
      <IntroStrip />
      <Services />
      <Why />
      <Work />
      <Tech />
      <Process />
      <AboutBand />
      <Cta />
      <Contact />
    </main>
    <Footer />
    <FAQChatbot />
    <FloatingContactActions />
  </>;
}
