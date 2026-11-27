"use client";

import { useEffect } from "react";

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
