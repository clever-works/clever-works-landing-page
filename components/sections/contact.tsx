import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { InquiryForm } from "@/components/interactions/inquiry-form";

export function Contact() {
  return (
    <section className="contact-section section" id="contact"><div className="contact-copy" data-reveal><p className="section-label"><span>06</span> LET’S TALK</p><h2>Let’s build<br />something <span className="gradient-text">exceptional.</span></h2><p>Have an idea, a project to launch, or a website ready for a fresh start? We’d love to hear about it.</p><a className="contact-email contact-detail" href="mailto:cleverworksinfo@gmail.com">cleverworksinfo@gmail.com <ArrowUpRight size={16} /></a><a className="contact-email contact-detail" href="tel:+919566072823">9566072823 <ArrowUpRight size={16} /></a><div className="contact-aside"><span className="status-dot" /> TAKING ON SELECT PROJECTS</div></div><div className="form-panel" data-reveal><div className="form-panel-heading"><div><h3>Tell us a little about it.</h3><p>We’ll take it from there.</p></div><span className="form-mark"><ArrowDownRight size={19} /></span></div><InquiryForm /></div></section>
  );
}
