"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

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
      <a className="brand-logo" href="#home" aria-label="Clever Works — Building Ideas. Creating Impact."><Image src="/clever-works-icon.png" alt="Clever Works — Building Ideas. Creating Impact." width={1020} height={1020} sizes="64px" priority /></a>
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
