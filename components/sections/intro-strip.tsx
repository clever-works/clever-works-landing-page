import { ArrowDownRight } from "lucide-react";

export function IntroStrip() {
  return (
    <section className="intro-strip" aria-label="What we do"><p>Good work starts with <span>a good question.</span></p><div className="intro-side"><span>IDEAS, MEET EXECUTION.</span><ArrowDownRight size={19} /></div></section>
  );
}
