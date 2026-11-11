import { familiarSkills, professionalSkills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-rule bg-panel" aria-labelledby="skills-title">
      <div className="container-page">
        <h2 id="skills-title" className="section-title">
          Skills, with where I used them
        </h2>
        <p className="section-intro">
          The first list is technology I&apos;ve used in shipped projects on this page. The second is
          technology I know and have used in smaller work, but not yet in client projects.
        </p>

        <h3 className="mt-14 text-xl">Used in shipped projects</h3>
        <div className="mt-6 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {professionalSkills.map((group) => (
            <div key={group.title}>
              <h4 className="border-b border-rule-strong pb-2 font-sans text-[0.95rem] font-semibold tracking-normal text-graphite">
                {group.title}
              </h4>
              <dl className="mt-1">
                {group.items.map((s) => (
                  <div key={s.name} className="border-b border-rule py-2.5">
                    <dt className="font-medium">{s.name}</dt>
                    <dd className="text-sm text-muted">{s.where}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <h3 className="mt-16 text-xl">Familiar with</h3>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Familiar technologies">
          {familiarSkills.map((s) => (
            <li key={s} className="rounded-md border border-rule-strong bg-paper px-3 py-1.5 text-[0.95rem] text-graphite">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
