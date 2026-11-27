import { ArrowUpRight, MoveUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><span className="footer-eyebrow">CLEVER WORKS · DIGITAL STUDIO</span><p>Building ideas.<br /><span>Creating impact.</span></p></div><nav className="footer-links footer-navigation" aria-label="Explore"><span>EXPLORE</span><a href="#services">Services</a><a href="#about">About</a><a href="#work">Our work</a><a href="#process">Process</a></nav><div className="footer-links footer-contact"><span>LET’S TALK</span><a href="#contact">Start a project <ArrowUpRight size={13} /></a><a href="mailto:cleverworksinfo@gmail.com">cleverworksinfo@gmail.com <ArrowUpRight size={13} /></a><a href="tel:+919566072823">9566072823 <ArrowUpRight size={13} /></a></div></div><div className="footer-bottom"><span>© 2026 CLEVER WORKS. ALL RIGHTS RESERVED.</span><span>BUILDING IDEAS. CREATING IMPACT.</span><a href="#home" className="footer-back-top">BACK TO TOP <MoveUpRight size={12} /></a></div></footer>
  );
}
