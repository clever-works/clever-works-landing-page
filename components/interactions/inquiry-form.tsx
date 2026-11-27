"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
