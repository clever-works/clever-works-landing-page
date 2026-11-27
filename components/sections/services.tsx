import { ArrowRight, ArrowUpRight, Code2, Layers3, Palette, ScanLine, Smartphone, Workflow } from "lucide-react";

const services = [
  { n: "01", icon: Code2, title: "Website development", text: "Fast, thoughtful websites that make a strong first impression—and turn the right visitors into customers.", tags: "NEXT.JS · REACT · TYPESCRIPT" },
  { n: "02", icon: Smartphone, title: "Mobile app development", text: "Useful, intuitive mobile experiences that help your business stay close to its customers.", tags: "ANDROID · MOBILE EXPERIENCES" },
  { n: "03", icon: Palette, title: "UI/UX design", text: "Clear, considered interfaces that feel natural to use and bring your product’s best ideas forward.", tags: "RESEARCH · PROTOTYPING · DESIGN" },
  { n: "04", icon: Layers3, title: "E-commerce development", text: "A smoother path from discovery to checkout, built to support the way your business sells.", tags: "STOREFRONTS · CHECKOUT · GROWTH" },
  { n: "05", icon: Workflow, title: "Custom web applications", text: "Purpose-built tools that bring your workflows together and solve the problems off-the-shelf software can’t.", tags: "PRODUCT · PLATFORM · INTEGRATION" },
  { n: "06", icon: ScanLine, title: "Redesign & maintenance", text: "Make an existing website faster, clearer, easier to use, and ready for what comes next.", tags: "OPTIMIZATION · SUPPORT · CARE" },
];

export function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading" data-reveal><div><p className="section-label"><span>01</span> WHAT WE DO</p><h2>Everything you need<br />to build your <span className="gradient-text">digital future.</span></h2></div><p className="section-intro">From a first sketch to a fully launched product, we bring the right mix of design and technology to your next big idea.</p></div>
      <div className="services-grid">{services.map(({ n, icon: Icon, title, text, tags }, index) => <article className="service-card" data-reveal key={n} style={{ "--delay": `${index * 75}ms` } as React.CSSProperties}><div className="service-top"><span className="service-icon"><Icon size={19} strokeWidth={1.5} /></span><span className="service-number">{n}</span></div><h3>{title}</h3><p>{text}</p><div className="service-bottom"><span>{tags}</span><ArrowUpRight size={16} /></div></article>)}</div>
      <a className="inline-cta" href="#contact">Have a project in mind? <span>Let’s discuss <ArrowRight size={15} /></span></a>
    </section>
  );
}
