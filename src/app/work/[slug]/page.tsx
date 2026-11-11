import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/projects";
import { profile, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  const title = `${c.title} case study`;
  return {
    title,
    description: c.oneLiner,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${c.slug}`,
      title: `${title} | ${profile.name}`,
      description: c.oneLiner,
      images: [{ url: c.cover.src, width: 1440, height: 900, alt: c.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description: c.oneLiner,
      images: [c.cover.src],
    },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-rule pt-10">
      <h2 id={id} className="text-[clamp(1.5rem,2.6vw,2rem)]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const index = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    description: c.oneLiner,
    url: `${siteUrl}/work/${c.slug}`,
    image: `${siteUrl}${c.cover.src}`,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    keywords: [...c.stack, ...c.integrations.map((i) => i.name)].join(", "),
  };

  return (
    <article className="pt-28 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="container-page">
        <nav aria-label="Breadcrumb">
          <Link href="/#work" className="text-link text-[0.95rem]">
            All work
          </Link>
        </nav>
        <p className="mt-10 text-[0.975rem] font-medium text-accent">{c.engagement}</p>
        <h1 className="mt-3 max-w-[18ch] text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] tracking-[-0.035em]">
          {c.title}
        </h1>
        <p className="mt-6 max-w-[60ch] text-xl text-graphite">{c.oneLiner}</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {c.links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
              >
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div className="container-page mt-12 md:mt-16">
        <Image
          src={c.cover.src}
          alt={c.cover.alt}
          width={1440}
          height={900}
          priority
          sizes="(min-width: 1120px) 1056px, 100vw"
          className="w-full rounded-[var(--radius-lg)] border border-rule shadow-[var(--shadow)]"
        />
      </div>

      <div className="container-page mt-16 grid gap-12 pb-24 lg:grid-cols-[1fr_300px] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-14">
          <Block id="overview" title="Overview">
            <div className="prose-measure space-y-4 text-lg text-graphite">
              {c.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>

          <Block id="problem" title="The business problem">
            <div className="prose-measure space-y-4 text-lg text-graphite">
              {c.problem.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>

          <Block id="contributions" title="What I built">
            <ul className="prose-measure grid gap-4">
              {c.contributions.map((item) => (
                <li key={item} className="flex gap-3 text-[1.0625rem]">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="implementation" title="How it works">
            <div className="grid gap-8 md:grid-cols-2">
              {c.implementation.map((it) => (
                <div key={it.heading}>
                  <h3 className="text-lg">{it.heading}</h3>
                  <p className="mt-2 text-graphite">{it.body}</p>
                </div>
              ))}
            </div>
          </Block>

          {c.shots.length > 1 && (
            <Block id="screens" title="Screens">
              <div className="grid gap-8">
                {c.shots.slice(1).map((s) => (
                  <figure key={s.src}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="w-full rounded-[var(--radius)] border border-rule"
                    />
                    {s.caption && (
                      <figcaption className="mt-2.5 text-sm text-graphite">{s.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Block>
          )}

          {c.notes && c.notes.length > 0 && (
            <Block id="notes" title="Notes">
              <ul className="prose-measure space-y-3 text-graphite">
                {c.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Block>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Project facts">
          <div className="rounded-[var(--radius-lg)] border border-rule bg-panel p-6">
            <h2 className="font-sans text-[0.95rem] font-semibold tracking-normal text-graphite">
              Integrations
            </h2>
            <dl className="mt-3 space-y-3">
              {c.integrations.map((i) => (
                <div key={i.name}>
                  <dt className="font-semibold">{i.name}</dt>
                  <dd className="text-sm text-graphite">{i.use}</dd>
                </div>
              ))}
            </dl>
            <h2 className="mt-7 font-sans text-[0.95rem] font-semibold tracking-normal text-graphite">
              Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.stack.map((s) => (
                <li key={s} className="rounded-md border border-rule-strong bg-paper px-2.5 py-1 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <nav aria-label="Next case study" className="border-t border-rule">
        <Link
          href={`/work/${next.slug}`}
          className="container-page group flex flex-col gap-2 py-14 md:py-20"
        >
          <span className="text-[0.95rem] text-graphite">Next case study</span>
          <span className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.03em] group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      </nav>
    </article>
  );
}
