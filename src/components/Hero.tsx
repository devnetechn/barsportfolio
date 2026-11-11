import Link from "next/link";
import { profile } from "@/lib/site";
import { stats } from "@/data/projects";

// The real lead flow from the Randy's Painting & Drywall CRM agent.
const pipeline = [
  { title: "Customer books an estimate", detail: "Booking form, PHP + MySQL" },
  { title: "SQL filter flags leads that need attention", detail: "Never contacted, or stale for their stage" },
  { title: "Claude picks one allowed action", detail: "Strict JSON, validated against a fixed list" },
  { title: "The action runs", detail: "Email the customer, text the owner, or sync the calendar" },
  { title: "Decision written to an audit log", detail: "Including no-action and errors" },
];

export default function Hero() {
  return (
    <section id="top" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-page grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-[0.975rem] font-medium text-accent">{profile.headline}</p>
          <h1 className="mt-5 text-[clamp(2.4rem,4.6vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            Business software that books the job, follows up the lead, and takes the payment.
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-graphite">
            I&apos;m {profile.name}, a developer based in the {profile.location}. I build web
            applications for businesses, connect them to the services they already rely on, and add
            AI where it makes a decision that would otherwise be forgotten.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#work" className="btn btn-primary">
              See case studies
            </Link>
            <Link href="#contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 border-t border-rule pt-6">
            <div className="pr-4">
              <dt className="text-sm text-graphite">Projects shown</dt>
              <dd className="font-display text-3xl font-semibold">{stats.projects}</dd>
            </div>
            <div className="border-l border-rule px-4">
              <dt className="text-sm text-graphite">Live deployments</dt>
              <dd className="font-display text-3xl font-semibold">{stats.live}</dd>
            </div>
            <div className="border-l border-rule pl-4">
              <dt className="text-sm text-graphite">APIs integrated</dt>
              <dd className="font-display text-3xl font-semibold">{stats.integrations}</dd>
            </div>
          </dl>
        </div>

        <figure className="rounded-[var(--radius-lg)] border border-rule bg-panel p-6 md:p-8">
          <figcaption className="text-[0.95rem] text-graphite">
            How a new lead moves through the CRM I built for{" "}
            <Link href="/work/randys-painting-drywall" className="text-link">
              Randy&apos;s Painting &amp; Drywall
            </Link>
          </figcaption>
          <ol className="mt-6">
            {pipeline.map((step, i) => (
              <li
                key={step.title}
                className="pipeline-step relative grid grid-cols-[2rem_1fr] gap-4 pb-6 last:pb-0"
                style={{ "--i": i } as React.CSSProperties}
              >
                {i < pipeline.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-8 bottom-0 left-[calc(1rem-0.5px)] w-px bg-rule-strong"
                  />
                )}
                <span
                  aria-hidden="true"
                  className={`relative z-[1] flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    i === 2 ? "bg-accent text-accent-ink" : "border border-rule-strong bg-paper text-ink"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="font-semibold leading-snug">{step.title}</p>
                  <p className="mt-1 text-sm text-graphite">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}
