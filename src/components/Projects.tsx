import WorkGrid from "@/components/WorkGrid";
import { profile } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export default function Projects() {
  return (
    <section id="work" className="section border-t border-line" aria-labelledby="work-title">
      <div className="container-page">
        <div className="section-head">
          <h2 id="work-title" className="display display-lg reveal">
            Selected work
          </h2>
          <p className="lede">
            Client builds, live platforms, prototypes and a technical assessment, each labelled for
            what it is. Every case study covers the problem, what I built and how it works.
          </p>
        </div>

        <WorkGrid />

        <p className="mt-24 text-ink-2 md:mt-32">
          Smaller builds, coursework and experiments are on{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-static inline-flex items-center gap-1">
            GitHub
            <ArrowUpRight />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
    </section>
  );
}
