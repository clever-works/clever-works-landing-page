import { ArrowUpRight } from "lucide-react";

export function AboutBand() {
  return (
    <section className="about-band"><div className="about-inner" data-reveal><span className="about-asterisk">✳</span><div><p className="section-label">A NOTE FROM CLEVER WORKS</p><h2>Creativity meets<br /><span className="gradient-text">technology.</span></h2><p>We believe every great business deserves a digital presence that feels like it belongs to them. Clever Works brings creative thinking, modern engineering, and a people-first perspective together to make that happen.</p></div><a href="#contact" className="round-link" aria-label="Let's create something great"><ArrowUpRight /></a></div></section>
  );
}
