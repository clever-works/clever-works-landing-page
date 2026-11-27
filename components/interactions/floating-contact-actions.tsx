import { ArrowUp, MessageCircle, Phone } from "lucide-react";

export function FloatingContactActions() {
  return <nav className="floating-actions" aria-label="Quick contact actions">
    <a className="floating-action action-top" href="#home" aria-label="Back to top" title="Back to top"><ArrowUp size={19} /></a>
    <a className="floating-action action-whatsapp" href="https://wa.me/919566072823" target="_blank" rel="noopener noreferrer" aria-label="Message Clever Works on WhatsApp" title="WhatsApp"><MessageCircle size={21} /></a>
    <a className="floating-action action-phone" href="tel:+919566072823" aria-label="Call Clever Works at 9566072823" title="Call us"><Phone size={19} /></a>
  </nav>;
}
