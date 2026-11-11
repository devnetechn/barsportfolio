import Image from "next/image";
import Link from "next/link";
import { caseStudies, otherProjects } from "@/data/projects";
import { profile } from "@/lib/site";

export default function Projects() {
  return (
    <>
      <section id="work" className="section border-t border-rule" aria-labelledby="work-title">
        <div className="container-page">
          <h2 id="work-title" className="section-title">
            Selected work
          </h2>
          <p className="section-intro">
            Four projects in depth: the business problem, what I built, and how the pieces connect.
          </p>

          <ul className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
            {caseStudies.map((c, i) => {
              const live = c.links.find((l) => l.label !== "Source code");
              return (
                <li
                  key={c.slug}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
                >
                  <Link
                    href={`/work/${c.slug}`}
                    className={`group block overflow-hidden rounded-[var(--radius-lg)] border border-rule bg-panel shadow-[var(--shadow)] ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                    aria-label={`${c.title} case study`}
                    tabIndex={-1}
                  >
                    <Image
                      src={c.cover.src}
                      alt={c.cover.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 768px) 540px, 100vw"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={i === 0}
                    />
                  </Link>
                  <div>
                    <p className="text-[0.95rem] text-graphite">{c.engagement}</p>
                    <h3 className="mt-2 text-[clamp(1.75rem,3vw,2.4rem)]">
                      <Link href={`/work/${c.slug}`} className="hover:text-accent">
                        {c.title}
                      </Link>
                    </h3>
                    <p className="mt-4 text-graphite">{c.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Integrations">
                      {c.integrations.map((it) => (
                        <li key={it.name} className="chip">
                          {it.name}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <Link href={`/work/${c.slug}`} className="btn btn-primary">
                        Read the case study
                      </Link>
                      {live && (
                        <a
                          href={live.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                        >
                          {live.label}
                          <span className="sr-only"> for {c.title} (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section border-t border-rule bg-panel" aria-labelledby="more-title">
        <div className="container-page">
          <h2 id="more-title" className="section-title">
            More projects
          </h2>
          <p className="section-intro">
            Smaller builds for schools, local businesses, and coursework. Live links are listed only
            where the site is currently online.
          </p>

          <ul className="mt-12 grid border-t border-rule-strong md:grid-cols-2 md:gap-x-12">
            {otherProjects.map((p) => (
              <li
                key={p.name}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-b border-rule-strong py-6"
              >
                <div>
                  <h3 className="text-lg">{p.name}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-graphite">{p.description}</p>
                  <p className="mt-2 text-sm text-muted">{p.tech.join(", ")}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 pt-1 text-[0.95rem]">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-link">
                      Live
                      <span className="sr-only"> site for {p.name} (opens in a new tab)</span>
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-link">
                      Code
                      <span className="sr-only"> for {p.name} on GitHub (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-10">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link">
              All repositories on GitHub
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
