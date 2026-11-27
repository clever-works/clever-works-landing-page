import { ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Braces, Smartphone } from "lucide-react";
import { ScrollCue } from "@/components/interactions/scroll-cue";

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-noise" aria-hidden="true" /><div className="hero-orb orb-one" aria-hidden="true" /><div className="hero-orb orb-two" aria-hidden="true" />
      <div className="hero-blessing"><p className="bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p><p className="translation">In the name of Allah, the Most Gracious, the Most Merciful</p></div>
      <div className="hero-content">
        <div className="hero-eyebrow"><span className="eyebrow-line" /> A DIGITAL STUDIO FOR WHAT’S NEXT</div>
        <h1>Turning your ideas<br />into <span className="gradient-text">digital<br className="mobile-break" /> excellence.</span></h1>
        <p className="hero-copy">We design and develop thoughtful websites, mobile apps, and digital experiences that help businesses move forward.</p>
        <div className="hero-actions"><a className="button button-primary" href="#contact">Let’s build your project <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#work">Explore our work <ArrowDownRight size={17} /></a></div>
        <p className="hero-motto"><span>CREATIVE THINKING</span><i /> <span>SMART TECHNOLOGY</span><i /> <span>MEASURABLE IMPACT</span></p>
      </div>
      <div className="hero-visual" aria-label="Illustration of a digital product taking shape">
        <div className="visual-grid" />
        <div className="orbit orbit-a" /><div className="orbit orbit-b" />
        <div className="float-chip chip-code"><span className="chip-icon"><Braces size={16} /></span><span><small>BUILT WITH INTENTION</small><b>Ideas into interface</b></span><span className="chip-live" /></div>
        <div className="float-chip chip-speed"><span className="speed-gauge"><span>⚡</span></span><span><small>MADE TO FEEL FAST</small><b>Performance, built in</b></span></div>
        <div className="product-window"><div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span className="window-address">your-next-big-thing.com</span><span className="window-menu">···</span></div><div className="window-body"><div className="mock-nav"><span className="mock-logo"><i /> studio.</span><span className="mock-links">Work &nbsp;&nbsp; About &nbsp;&nbsp; <b>Let’s talk ↗</b></span></div><div className="mock-main"><span className="mock-kicker"><i /> YOUR NEXT CHAPTER</span><div className="mock-title">Make room<br />for <em>what’s next.</em></div><p>Good things happen when a<br />great idea meets a clear plan.</p><span className="mock-button">See what’s possible <ArrowRight size={12} /></span></div><div className="mock-decoration"><span className="deco-core"><Asterisk size={46} strokeWidth={1.3} /></span><span className="deco-ring ring-1" /><span className="deco-ring ring-2" /><span className="deco-star">✳</span></div><div className="mock-footer"><span>STRATEGY&nbsp; · &nbsp;DESIGN&nbsp; · &nbsp;BUILD</span><span>SCROLL TO EXPLORE ↓</span></div></div><div className="window-base" /></div>
        <div className="float-chip chip-mobile"><span className="mobile-symbol"><Smartphone size={16} /></span><span><small>EVERY SCREEN</small><b>Feels like it fits</b></span></div>
        <div className="visual-caption"><span className="caption-dot" /> A LITTLE OF WHAT WE DO</div>
      </div>
      <ScrollCue />
    </section>
  );
}
