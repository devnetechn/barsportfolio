import Link from "next/link";
import { profile } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

const lines = ["I build digital", "products that", "solve real", "problems."];

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-[112px] pb-16 md:pt-[136px] md:pb-24">
      {/* A single, low glow behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[620px] w-[1100px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(92,124,255,0.16), transparent)" }}
      />

      <div className="container-page">
        <div className="fade-in flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-ink-2" style={{ "--d": "0ms" } as React.CSSProperties}>
          {profile.available && (
            <p className="flex items-center gap-2">
              <span className="status-dot" data-live="true" aria-hidden="true" />
              {profile.availability}
            </p>
          )}
          <p>
            {profile.role}, based in the {profile.location}
          </p>
        </div>

        <h1 id="hero-title" className="display display-xl mt-7 md:mt-8">
          {lines.map((line, i) => (
            <span key={line} className="rise">
              <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <p className="lede fade-in" style={{ "--d": "650ms" } as React.CSSProperties}>
            I&apos;m {profile.name}, a full-stack developer specializing in modern web applications, API
            integrations and AI-powered solutions. I turn ideas into functional, scalable digital
            products, from the first sketch to the production deploy.
          </p>

          <div className="fade-in flex flex-col gap-6 lg:items-end" style={{ "--d": "780ms" } as React.CSSProperties}>
            <div className="flex flex-wrap gap-3">
              <Link href="#work" className="btn btn-primary">
                View selected work
                <ArrowRight className="arrow" />
              </Link>
              <Link href="#contact" className="btn btn-secondary">
                Let&apos;s work together
              </Link>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link inline-flex items-center gap-1.5 text-[0.95rem] text-ink-2"
            >
              github.com/{profile.githubHandle}
              <ArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
