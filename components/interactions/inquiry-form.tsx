"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Submissions go to Netlify Forms. Netlify registers the form from public/__forms.html at deploy time,
// so the form name and field names here must match that file.
const FORM_NAME = "project-inquiry";

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      const response = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return status === "sent" ? (
    <div className="form-success" role="status"><span className="success-icon">✓</span><h3>Thanks for reaching out.</h3><p>We’ve received your project details and will get back to you soon.</p><button type="button" className="text-link" onClick={() => setStatus("idle")}>Send another inquiry <ArrowRight size={15} /></button></div>
  ) : (
    <form className="inquiry-form" name={FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="form-honeypot" aria-hidden="true"><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required /></label>
      <label>What do you need?<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Website development</option><option>Mobile app development</option><option>UI/UX design</option><option>E-commerce</option><option>Custom web application</option><option>Redesign & maintenance</option><option>Something else</option></select></label>
      <label className="full-field">A little about your project<textarea name="project" rows={3} placeholder="What are you looking to build?" required /></label>
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>{status === "sending" ? "Sending…" : <>Send project inquiry <ArrowUpRight size={16} /></>}</button>
      {status === "error"
        ? <p className="form-note form-error" role="alert">Something went wrong sending your inquiry. Please try again, or email us at <a href="mailto:cleverworksinfo@gmail.com">cleverworksinfo@gmail.com</a>.</p>
        : <p className="form-note">No pressure, just a first conversation.</p>}
    </form>
  );
}
