import { ArrowUpRight } from "lucide-react";

export function Tech() {
  return (
    <section className="tech-section"><div className="tech-inner section"><div className="tech-copy" data-reveal><p className="section-label"><span>04</span> THE TOOLS ARE ONLY THE START</p><h2>Powered by the<br /><span className="gradient-text">right technology.</span></h2><p>We choose the tools that suit your project, your people, and what you want to accomplish. Good engineering should make the experience feel simple.</p></div><div className="tech-grid" data-reveal>{["React", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Figma", "AWS"].map((tech, i) => <div className="tech-item" key={tech} style={{ "--delay": `${i * 55}ms` } as React.CSSProperties}><span className={`tech-symbol tech-${i}`}>{["◉", "TS", "JS", "≈", "⬡", "◉", "F", "aws"][i]}</span><span>{tech}</span><ArrowUpRight size={13} /></div>)}</div></div></section>
  );
}
