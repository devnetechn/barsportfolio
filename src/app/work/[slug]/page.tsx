import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { profile, siteUrl } from "@/lib/site";
import { StatusTag } from "@/components/ProjectCard";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} case study`;
  return {
    title,
    description: p.oneLiner,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${p.slug}`,
      title: `${title} | ${profile.name}`,
      description: p.oneLiner,
      images: [{ url: p.cover.src, alt: p.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description: p.oneLiner,
      images: [p.cover.src],
    },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-line pt-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
      <h2 id={id} className="text-[0.95rem] font-semibold text-ink-2">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];
  const gallery = p.shots.filter((s) => s.src !== p.cover.src);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.oneLiner,
    url: `${siteUrl}/work/${p.slug}`,
    image: `${siteUrl}${p.cover.src}`,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    keywords: [...p.stack, ...p.integrations.map((i) => i.name)].join(", "),
  };

  return (
    <article className="pt-[110px] md:pt-[140px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="container-page">
        <nav aria-label="Breadcrumb" className="fade-in">
          <Link href="/#work" className="link inline-flex items-center gap-2 text-[0.95rem] text-ink-2">
            <ArrowLeft />
            All work
          </Link>
        </nav>

        <div className="fade-in mt-10 flex flex-wrap items-center gap-x-3 gap-y-2" style={{ "--d": "80ms" } as React.CSSProperties}>
          <StatusTag status={p.status} />
          <span className="text-[0.95rem] text-ink-2">{p.engagement}</span>
        </div>

        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.4rem,7vw,6rem)]">
          <span className="rise">
            <span>{p.title}</span>
          </span>
        </h1>

        <div className="fade-in mt-10 grid gap-10 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16" style={{ "--d": "300ms" } as React.CSSProperties}>
          <p className="lede">{p.summary}</p>
          <div className="flex flex-col gap-6 lg:items-end">
            <ul className="flex flex-wrap gap-3 lg:justify-end">
              {p.live && (
                <li>
                  <a href={p.live.href} {...external} className="btn btn-primary">
                    {p.live.label}
                    <ArrowUpRight className="arrow" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              {p.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} {...external} className="btn btn-secondary">
                    {l.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-3 lg:text-right">{p.categories.join(", ")}</p>
          </div>
        </div>
      </header>

      <div className="container-page fade-in mt-14 md:mt-20" style={{ "--d": "420ms" } as React.CSSProperties}>
        <div className="media">
          <Image
            src={p.cover.src}
            alt={p.cover.alt}
            width={1440}
            height={900}
            priority
            sizes="(min-width: 1320px) 1240px, 100vw"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      </div>

      <div className="container-page mt-20 flex flex-col gap-16 pb-24 md:mt-28 md:gap-20 md:pb-32">
        <Block id="overview" title="Project overview">
          <div className="measure space-y-4 text-lg text-ink-2">
            {p.overview.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Block>

        <Block id="problem" title="Problem and objective">
          <div className="measure space-y-4 text-lg text-ink-2">
            {p.problem.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Block>

        <Block id="contribution" title="My contribution">
          <ul className="measure divide-y divide-line border-y border-line">
            {p.contributions.map((item) => (
              <li key={item} className="py-4 text-[1.0625rem]">
                {item}
              </li>
            ))}
          </ul>
        </Block>

        <Block id="implementation" title="Technical implementation">
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {p.implementation.map((it) => (
              <div key={it.heading}>
                <h3 className="text-xl font-semibold">{it.heading}</h3>
                <p className="mt-3 text-ink-2">{it.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="technologies" title="Technologies used">
          <ul className="flex flex-wrap gap-2" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s} className="tag text-[0.9rem] text-ink">
                {s}
              </li>
            ))}
          </ul>
          {p.integrations.length > 0 && (
            <dl className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {p.integrations.map((i) => (
                <div key={i.name} className="border-t border-line pt-4">
                  <dt className="font-semibold">{i.name}</dt>
                  <dd className="mt-1 text-ink-2">{i.use}</dd>
                </div>
              ))}
            </dl>
          )}
        </Block>

        {gallery.length > 0 && (
          <Block id="screens" title="Screenshots">
            <div className="grid gap-10">
              {gallery.map((s) => (
                <figure key={s.src}>
                  <div className="media">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1440}
                      height={900}
                      sizes="(min-width: 1320px) 980px, 100vw"
                      className="w-full"
                    />
                  </div>
                  {s.caption && <figcaption className="mt-3 text-sm text-ink-3">{s.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </Block>
        )}

        {p.notes && p.notes.length > 0 && (
          <Block id="notes" title="Notes">
            <ul className="measure space-y-3 text-ink-2">
              {p.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Block>
        )}
      </div>

      <nav aria-label="Next case study" className="border-t border-line">
        <Link href={`/work/${next.slug}`} className="container-page group flex flex-col gap-3 py-16 md:py-24">
          <span className="text-[0.95rem] text-ink-2">Next case study</span>
          <span className="display flex items-center gap-4 text-[clamp(1.9rem,5vw,4rem)] transition-colors duration-300 group-hover:text-accent-hi">
            {next.title}
            <ArrowRight size={36} className="hidden shrink-0 transition-transform duration-500 group-hover:translate-x-2 md:block" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
