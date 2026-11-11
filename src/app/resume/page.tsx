import type { Metadata } from "next";
import { caseStudies } from "@/data/projects";
import { familiarSkills, professionalSkills } from "@/data/skills";
import { profile, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}, ${profile.headline}.`,
  alternates: { canonical: "/resume" },
};

/** Stack + integrations, without repeating a service already named in the stack. */
function techLine(stack: string[], integrations: string[]) {
  const head = stack.slice(0, 5);
  const firstWord = (s: string) => s.split(/[\s(]/)[0].toLowerCase();
  const extra = integrations.filter((i) => !head.some((h) => firstWord(h) === firstWord(i)));
  return [...head, ...extra].join(", ");
}

const siteHost = siteUrl.replace(/^https?:\/\//, "");

export default function ResumePage() {
  return (
    <div className="pt-24 pb-20 md:pt-28 print:p-0 print:text-[9.5pt]">
      <div className="container-page max-w-[880px] print:max-w-none print:px-0">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-rule bg-panel p-4">
          <p className="text-[0.95rem] text-graphite">One-page resume, also available as a PDF.</p>
          <a href={profile.resumePdf} download className="btn btn-primary">
            Download PDF
          </a>
        </div>

        <header className="resume-section border-b border-rule-strong pb-6 print:pb-3">
          <h1 className="text-[clamp(2.2rem,5vw,3rem)] print:text-[24pt]">{profile.name}</h1>
          <p className="mt-2 text-lg font-medium text-accent print:text-[11pt]">{profile.headline}</p>
          <ul className="mt-4 print:mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem] text-graphite print:text-[9.5pt]">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.github}>github.com/{profile.githubHandle}</a>
            </li>
            <li>
              <a href={siteUrl}>{siteHost}</a>
            </li>
            <li>{profile.location}, remote</li>
          </ul>
        </header>

        <section className="resume-section mt-6 print:mt-3" aria-labelledby="r-summary">
          <h2 id="r-summary" className="text-xl print:text-[12pt]">Summary</h2>
          <p className="mt-2 text-graphite">
            Full stack developer building business web applications: booking and lead pipelines,
            e-commerce with supplier and payment integrations, and multi-tenant platforms. Adds AI
            where it makes bounded, auditable decisions, such as a Claude-powered CRM agent and an
            OpenAI assistant that answers from live data. Works in Next.js, React, TypeScript, Node.js,
            and PHP, with PostgreSQL and MySQL.
          </p>
        </section>

        <section className="mt-7 print:mt-3" aria-labelledby="r-projects">
          <h2 id="r-projects" className="text-xl print:text-[12pt]">Selected projects</h2>
          <div className="mt-3 space-y-5 print:space-y-2">
            {caseStudies.map((c) => {
              const live = c.links.find((l) => l.label !== "Source code");
              return (
                <div key={c.slug} className="resume-section">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-sans text-[1.05rem] font-semibold tracking-normal print:text-[10.5pt]">
                      {c.title}
                      <span className="ml-2 text-sm font-normal text-muted print:text-[8.5pt]">{c.engagement}</span>
                    </h3>
                    {live && (
                      <a href={live.href} className="text-sm text-graphite print:text-[8.5pt]">
                        {live.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    )}
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-graphite marker:text-muted">
                    {c.contributions.slice(0, 2).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="mt-1 text-sm text-muted print:text-[8.5pt]">
                    {techLine(c.stack, c.integrations.map((i) => i.name))}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="resume-section mt-7 print:mt-3" aria-labelledby="r-skills">
          <h2 id="r-skills" className="text-xl print:text-[12pt]">Skills</h2>
          <dl className="mt-2 space-y-1.5 print:space-y-0.5">
            {professionalSkills.map((g) => (
              <div key={g.title} className="grid gap-x-4 sm:grid-cols-[110px_1fr]">
                <dt className="font-semibold">{g.title}</dt>
                <dd className="text-graphite">{g.items.map((s) => s.name).join(", ")}</dd>
              </div>
            ))}
            <div className="grid gap-x-4 sm:grid-cols-[110px_1fr]">
              <dt className="font-semibold">Familiar</dt>
              <dd className="text-graphite">{familiarSkills.join(", ")}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
