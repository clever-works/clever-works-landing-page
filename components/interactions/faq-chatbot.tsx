"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MessageCircle, RotateCcw, X } from "lucide-react";

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
