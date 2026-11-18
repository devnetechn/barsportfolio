import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/site";

const principles = [
  {
    title: "Start from the problem",
    body: "Before writing code I want to know what isn't working for you today and what a good result looks like. The stack follows from that, not the other way round.",
  },
  {
    title: "Write it down first",
    body: "Larger features get a short design note: the goal, the approach, and what I decided not to build. You can read real ones in my public repositories.",
  },
  {
    title: "Build for the place it runs",
    body: "Next.js on Vercel when that fits, plain PHP and MySQL when the site lives on shared hosting. The right choice is the one you can afford to keep running.",
  },
  {
    title: "Use AI where it earns its place",
    body: "I use AI tools every day and build AI features for clients, always with limits, validation and a log, and I stay accountable for every decision they touch.",
  },
];

export default function About() {
  return (
    <section id="about" className="section border-t border-line" aria-labelledby="about-title">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="about-title" className="display display-lg reveal">
              About
            </h2>
            <figure className="mt-10 max-w-[360px]">
              <div className="media aspect-[4/5]">
                <Image
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(min-width: 1024px) 360px, 70vw"
                  className="object-cover grayscale-[35%]"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-3">
                {profile.fullName}, {profile.location}
              </figcaption>
            </figure>
          </div>

          <div>
            <p className="text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.3] tracking-[-0.01em] text-ink">
              I&apos;m a full-stack developer with 4 years of experience working with Next.js and modern
              web technologies. I build responsive web applications, develop backend systems, integrate
              third-party APIs, and explore AI-powered solutions that help businesses work smarter.
            </p>

            <div className="measure mt-10 space-y-5 text-lg text-ink-2">
              <p>
                Most of what I build sits where a business meets its customers: a booking form that
                becomes a lead, a storefront that pulls prices from a supplier, a platform where
                alumni find their batch. The work is rarely just the page you see. It is the payment
                webhook, the database rule, and the email that goes out at the right time.
              </p>
              <p>
                I work independently from first conversation to deployment, and I&apos;m comfortable
                joining an existing codebase too, whether that means a client&apos;s live site or a
                take-home assessment with bugs to find. I keep clients updated in plain language and
                tell you early when something won&apos;t work the way we planned.
              </p>
            </div>

            <h3 className="mt-16 text-[0.95rem] font-semibold text-ink-2">How I work</h3>
            <dl className="mt-4 grid border-t border-line sm:grid-cols-2">
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className={`border-b border-line py-7 sm:pr-8 ${i % 2 === 1 ? "sm:border-l sm:pl-8 sm:pr-0" : ""}`}
                >
                  <dt className="text-lg font-semibold">{p.title}</dt>
                  <dd className="mt-2 text-ink-2">{p.body}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/resume" className="btn btn-secondary">
                View resume
              </Link>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                GitHub profile
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
