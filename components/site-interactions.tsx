"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, MessageCircle, Menu, Moon, Phone, RotateCcw, Sun, X } from "lucide-react";

const links = ["Services", "About", "Process", "Contact"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    // The inline script in layout.tsx has already applied the saved theme before paint;
    // just sync the toggle icon with it.
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const apply = () => { document.documentElement.dataset.theme = nextTheme; };
    // Cross-fade between themes where the browser supports view transitions.
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) doc.startViewTransition(apply);
    else apply();
    window.localStorage.setItem("clever-works-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand-logo" href="#home" aria-label="Clever Works — Building Ideas. Creating Impact."><Image src="/clever-works-logo.png" alt="Clever Works — Building Ideas. Creating Impact." width={1984} height={768} priority /></a>
      <nav className={open ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
        {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
        <a className="mobile-nav-cta" href="#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={16} /></a>
      </nav>
      <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
      <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
      <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  );
}

export function MotionEffects() {
  useEffect(() => {
    document.body.classList.add("reveal-ready");
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const revealTimers: number[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add("revealed");
          // Once the entrance has played, drop the stagger delay so hover feels instant.
          const done = window.setTimeout(() => target.classList.add("reveal-done"), 1400);
          revealTimers.push(done);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach((node) => observer.observe(node));

    const cleanups: Array<() => void> = [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Scroll progress bar + highlight the nav link for the section in view.
    const root = document.documentElement;
    let progressFrame = 0;
    const updateProgress = () => {
      progressFrame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll-progress", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => { if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress); };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(progressFrame); });

    const navLinks = [...document.querySelectorAll<HTMLAnchorElement>(".main-nav > a[href^='#']")];
    const sections = navLinks.map((link) => document.querySelector<HTMLElement>(link.getAttribute("href") || "")).filter((s): s is HTMLElement => Boolean(s));
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((section) => navObserver.observe(section));
    cleanups.push(() => navObserver.disconnect());

    if (!reduceMotion && finePointer) {
      // Soft spotlight that follows the cursor on cards and panels.
      const spotlightSelector = ".service-card, .tech-item, .form-panel, .process-step";
      const onPointerMove = (event: PointerEvent) => {
        const target = (event.target as Element | null)?.closest<HTMLElement>(spotlightSelector);
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        target.style.setProperty("--my", `${event.clientY - rect.top}px`);
      };
      document.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() => document.removeEventListener("pointermove", onPointerMove));

      // Gentle depth parallax in the hero, following the pointer.
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) {
        let frame = 0;
        let px = 0;
        let py = 0;
        const apply = () => { frame = 0; hero.style.setProperty("--px", px.toFixed(3)); hero.style.setProperty("--py", py.toFixed(3)); };
        const onHeroMove = (event: PointerEvent) => {
          const rect = hero.getBoundingClientRect();
          px = (event.clientX - rect.left) / rect.width - 0.5;
          py = (event.clientY - rect.top) / rect.height - 0.5;
          if (!frame) frame = requestAnimationFrame(apply);
        };
        const onHeroLeave = () => { px = 0; py = 0; if (!frame) frame = requestAnimationFrame(apply); };
        hero.addEventListener("pointermove", onHeroMove, { passive: true });
        hero.addEventListener("pointerleave", onHeroLeave);
        cleanups.push(() => { hero.removeEventListener("pointermove", onHeroMove); hero.removeEventListener("pointerleave", onHeroLeave); cancelAnimationFrame(frame); });
      }

      // Slight magnetic pull on the main calls to action.
      const magnets = [...document.querySelectorAll<HTMLElement>(".button-primary, .round-link, .faq-launcher, .floating-action")];
      magnets.forEach((el) => {
        const move = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = (event.clientX - rect.left - rect.width / 2) / rect.width;
          const dy = (event.clientY - rect.top - rect.height / 2) / rect.height;
          el.style.translate = `${(dx * 6).toFixed(2)}px ${(dy * 5).toFixed(2)}px`;
        };
        const leave = () => { el.style.translate = ""; };
        el.addEventListener("pointermove", move, { passive: true });
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); el.style.translate = ""; });
      });
    }

    document.body.classList.add("motion-ready");
    return () => { observer.disconnect(); revealTimers.forEach((t) => window.clearTimeout(t)); cleanups.forEach((fn) => fn()); document.body.classList.remove("reveal-ready", "motion-ready"); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}

export function InquiryForm() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <div className="form-success" role="status"><span className="success-icon">✓</span><h3>Thanks for reaching out.</h3><p>Your email app should open with your project details ready to send.</p><button type="button" className="text-link" onClick={() => setSent(false)}>Send another inquiry <ArrowRight size={15} /></button></div>
  ) : (
    <form className="inquiry-form" action="mailto:cleverworksinfo@gmail.com" method="post" encType="text/plain" onSubmit={() => setSent(true)}>
      <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required /></label>
      <label>What do you need?<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Website development</option><option>Mobile app development</option><option>UI/UX design</option><option>E-commerce</option><option>Custom web application</option><option>Redesign & maintenance</option><option>Something else</option></select></label>
      <label className="full-field">A little about your project<textarea name="project" rows={3} placeholder="What are you looking to build?" required /></label>
      <button className="button button-primary form-submit" type="submit">Send project inquiry <ArrowUpRight size={16} /></button>
      <p className="form-note">No pressure, just a first conversation.</p>
    </form>
  );
}

export function ScrollCue() { return <a href="#services" className="scroll-cue" aria-label="Scroll to services"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>; }

const faqItems = [
  { question: "What services does Clever Works provide?", answer: "We provide website development, mobile app development, UI/UX design, e-commerce development, website redesign, and ongoing maintenance and support." },
  { question: "Can you build a website for my business?", answer: "Yes. We work with startups, small businesses, restaurants, shops, entrepreneurs, and professionals to create a strong online presence. We can take a project from planning and design through development and deployment." },
  { question: "Do you develop mobile applications?", answer: "Yes. We create custom mobile applications with user-friendly interfaces and scalable architecture shaped around your business requirements." },
  { question: "How much does a website or app cost?", answer: "Pricing depends on the features, number of pages, design requirements, integrations, and complexity. Tell us what you need and we’ll provide a suitable quotation." },
  { question: "How long does development take?", answer: "The timeline depends on the project’s size and requirements. A simple business website may take less time, while an e-commerce platform or custom application may require several weeks." },
  { question: "Can you redesign my existing website?", answer: "Yes. We can modernize your website, improve its UI/UX and performance, and make it responsive across phones, tablets, and desktops." },
  { question: "Do you provide maintenance and support?", answer: "Yes. We can provide ongoing maintenance, updates, bug fixes, performance improvements, security updates, and technical support after launch." },
  { question: "How do I start a project with Clever Works?", answer: "Contact us with your idea, business, or requirements. We’ll discuss what you need, recommend a suitable solution, and outline the next steps." },
  { question: "How can I reach you by phone or email?", answer: "You can call or email Clever Works using the contact details below." },
];

export function FAQChatbot() {
  const [open, setOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return <>
    {open && <section className="faq-chat" role="dialog" aria-label="Clever Works frequently asked questions">
      <div className="faq-chat-head"><span className="faq-avatar"><MessageCircle size={17} /></span><div><strong>Clever Works</strong><small><i /> FAQ ASSISTANT</small></div><button type="button" className="faq-close" aria-label="Close FAQ assistant" onClick={() => setOpen(false)}><X size={18} /></button></div>
      <div className="faq-chat-body"><p className="faq-welcome">Hi there! Choose a question below and I’ll point you in the right direction.</p>
        {activeFaq !== null && <div className="faq-answer" aria-live="polite"><span>{faqItems[activeFaq].question}</span><p>{faqItems[activeFaq].answer}</p>{activeFaq === 8 ? <div className="faq-contact-links"><a href="mailto:cleverworksinfo@gmail.com">cleverworksinfo@gmail.com <ArrowUpRight size={13} /></a><a href="tel:+919566072823">9566072823 <ArrowUpRight size={13} /></a></div> : <a href="#contact" onClick={() => setOpen(false)}>Tell us about your project <ArrowUpRight size={13} /></a>}</div>}
        <p className="faq-prompt">{activeFaq === null ? "PICK A QUESTION" : "MORE QUESTIONS"}</p>
        <div className="faq-options">{faqItems.map((item, index) => <button type="button" key={item.question} onClick={() => setActiveFaq(index)}>{item.question}<ArrowUpRight size={13} /></button>)}</div>
        {activeFaq !== null && <button className="faq-reset" type="button" onClick={() => setActiveFaq(null)}><RotateCcw size={12} /> Back to welcome</button>}
      </div>
      <div className="faq-chat-foot">Choose from the FAQs to get started.</div>
    </section>}
    <button className={`faq-launcher ${open ? "faq-launcher-open" : ""}`} type="button" aria-expanded={open} aria-label={open ? "Close FAQ assistant" : "Open FAQ assistant"} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <><MessageCircle size={19} /><span>Ask a question</span></>}</button>
  </>;
}

export function FloatingContactActions() {
  return <nav className="floating-actions" aria-label="Quick contact actions">
    <a className="floating-action action-top" href="#home" aria-label="Back to top" title="Back to top"><ArrowUp size={19} /></a>
    <a className="floating-action action-whatsapp" href="https://wa.me/919566072823" target="_blank" rel="noopener noreferrer" aria-label="Message Clever Works on WhatsApp" title="WhatsApp"><MessageCircle size={21} /></a>
    <a className="floating-action action-phone" href="tel:+919566072823" aria-label="Call Clever Works at 9566072823" title="Call us"><Phone size={19} /></a>
  </nav>;
}
