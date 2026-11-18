import { services, skillGroups } from "@/data/skills";

export default function Expertise() {
  return (
    <section id="expertise" className="section border-t border-line" aria-labelledby="expertise-title">
      <div className="container-page">
        <div className="section-head">
          <h2 id="expertise-title" className="display display-lg reveal">
            Expertise
          </h2>
          <p className="lede">
            What I can take on for you, and the tools I use to do it. Where a skill appears in a
            project on this site, the project is named so you can check the work.
          </p>
        </div>

        <h3 className="mt-20 text-[0.95rem] font-semibold text-ink-2" id="services">
          Services
        </h3>
        {/* gap-px over a line-coloured ground draws the grid rules. */}
        <ul className="mt-4 grid gap-px border-y border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="group relative bg-bg py-8 md:p-8">
              <span
                aria-hidden="true"
                className="absolute top-[-1px] left-0 h-px w-0 bg-accent transition-[width] duration-500 ease-[var(--ease-out)] group-hover:w-full"
              />
              <h4 className="text-xl font-semibold tracking-[-0.01em]">{s.title}</h4>
              <p className="mt-3 text-ink-2">{s.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-24 text-[0.95rem] font-semibold text-ink-2">Technical stack</h3>
        <div className="mt-4 grid gap-x-10 gap-y-12 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h4 className="text-lg font-semibold">{g.title}</h4>
              <p className="mt-1.5 text-sm text-ink-3">{g.summary}</p>
              <ul className="mt-5 space-y-3">
                {g.items.map((s) => (
                  <li key={s.name}>
                    <span className="block">{s.name}</span>
                    {s.seenIn && <span className="block text-sm text-ink-3">{s.seenIn}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
