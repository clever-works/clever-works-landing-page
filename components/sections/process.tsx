import { ArrowUpRight } from "lucide-react";

const steps = [
  { n: "01", title: "Discover", text: "We listen first. Together, we get clear on your business, audience, goals, and the right problem to solve." },
  { n: "02", title: "Design", text: "We turn your goals into an intuitive experience, then share a direction you can see, shape, and feel good about." },
  { n: "03", title: "Develop", text: "We build with care, keep you in the loop, and refine the details that make the product feel right." },
  { n: "04", title: "Launch & support", text: "We test, launch, and help you move forward with ongoing support when you need it." },
];

export function Process() {
  return (
    <section className="section process-section" id="process"><div className="section-heading" data-reveal><div><p className="section-label"><span>05</span> OUR PROCESS</p><h2>From your vision<br />to <span className="gradient-text">reality.</span></h2></div><p className="section-intro">No mystery, no disappearing act. A thoughtful process keeps us moving in the same direction—from our first conversation through launch.</p></div><div className="process-list">{steps.map((step, i) => <article className="process-step" data-reveal key={step.n} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}><span className="process-number">{step.n}</span><span className="process-marker"><i /></span><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowUpRight size={17} className="step-arrow" /></article>)}</div></section>
  );
}
