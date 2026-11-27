import { ArrowUpRight } from "lucide-react";

export function Cta() {
  return (
    <section className="cta-section"><div className="cta-glow" /><div className="cta-inner" data-reveal><p className="section-label"><span>✳</span> SOMETHING GOOD STARTS HERE</p><h2>Your next big idea<br /><span className="gradient-text">starts here.</span></h2><p>Tell us what you have in mind. We’ll help you find a thoughtful way to bring it to life.</p><a className="button button-primary" href="#contact">Start your project <ArrowUpRight size={17} /></a><span className="cta-footnote">A GOOD FIRST CONVERSATION. NO PRESSURE.</span></div><div className="cta-orbit orbit-c" /><div className="cta-orbit orbit-d" /></section>
  );
}
