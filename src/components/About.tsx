import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="section border-t border-rule" aria-labelledby="about-title">
      <div className="container-page grid gap-12 md:grid-cols-[280px_1fr] md:gap-16 lg:grid-cols-[320px_1fr]">
        <div>
          <Image
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            width={640}
            height={640}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 240px"
            className="aspect-square w-60 rounded-[var(--radius-lg)] object-cover md:w-full"
          />
        </div>
        <div>
          <h2 id="about-title" className="section-title">
            About me
          </h2>
          <div className="prose-measure mt-6 space-y-5 text-lg text-graphite">
            <p>
              I&apos;m {profile.name}, a full stack developer in the {profile.location}. Most of my work
              is for small businesses and organizations that need their website to do more than look
              good: take bookings, collect payments, sync with suppliers, and keep leads from going
              cold.
            </p>
            <p>
              I work across both JavaScript and PHP stacks and pick based on where the project will
              run. Web2Print and Pulse are Next.js on Vercel. Randy&apos;s runs on plain PHP and MySQL
              because it lives on shared hosting.
            </p>
            <p>
              Before building a larger feature I write a short design note covering the goal, the
              approach, and what I decided not to build. You can read them in the{" "}
              <a
                href="https://github.com/devnetechn/randy_project/tree/main/docs/superpowers/specs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Randy&apos;s repository
              </a>
              . I use AI coding tools in my workflow, and I stay accountable for every decision they
              touch.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/resume" className="btn btn-primary">
              View resume
            </Link>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              GitHub profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
