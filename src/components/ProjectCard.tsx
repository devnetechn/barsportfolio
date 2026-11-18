import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export function StatusTag({ status }: { status: Project["status"] }) {
  const live = status === "Live" || status === "Client work";
  return (
    <span className="tag">
      <span className="status-dot" data-live={live} aria-hidden="true" />
      {status}
    </span>
  );
}

type Props = { project: Project; featured?: boolean; priority?: boolean };

/**
 * One project. The image and title both lead to the case study; the live
 * link is a separate, explicit action so it is never opened by accident.
 */
export default function ProjectCard({ project: p, featured = false, priority = false }: Props) {
  const caseHref = `/work/${p.slug}`;

  return (
    <article
      className={`group relative ${
        featured ? "grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-end lg:gap-12" : "flex flex-col"
      }`}
      aria-labelledby={`p-${p.slug}`}
    >
      <Link href={caseHref} tabIndex={-1} aria-hidden="true" className="media block">
        <Image
          src={p.cover.src}
          alt=""
          width={1440}
          height={900}
          priority={priority}
          sizes={featured ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 768px) 620px, 100vw"}
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </Link>

      <div className={featured ? "" : "mt-6"}>
        <div className="flex flex-wrap items-center gap-2">
          <StatusTag status={p.status} />
          {p.categories.slice(0, featured ? 3 : 2).map((c) => (
            <span key={c} className="text-sm text-ink-3 [&:not(:last-child)]:after:content-[',']">
              {c}
            </span>
          ))}
        </div>

        <h3
          id={`p-${p.slug}`}
          className={`mt-4 font-semibold tracking-[-0.02em] [font-stretch:112%] ${
            featured ? "text-[clamp(1.9rem,3.6vw,3rem)]" : "text-[clamp(1.45rem,2.2vw,1.85rem)]"
          }`}
        >
          <Link href={caseHref} className="transition-colors duration-200 hover:text-accent-hi">
            {p.title}
          </Link>
        </h3>

        <p className={`mt-3 text-ink-2 ${featured ? "text-lg" : ""} measure`}>
          {featured ? p.summary : p.oneLiner}
        </p>

        <p className="mt-4 text-sm text-ink-3">
          <span className="sr-only">Built with </span>
          {p.stack.slice(0, featured ? 6 : 4).join(", ")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={caseHref} className={`btn ${featured ? "btn-primary" : "btn-secondary btn-sm"}`}>
            View case study
            <ArrowRight className="arrow" />
            <span className="sr-only">: {p.title}</span>
          </Link>
          {p.live && (
            <a
              href={p.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1.5 text-[0.95rem]"
            >
              {p.live.label}
              <ArrowUpRight />
              <span className="sr-only"> for {p.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
