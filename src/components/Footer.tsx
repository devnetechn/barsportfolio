import Link from "next/link";
import { profile } from "@/lib/site";
import { Monogram } from "@/components/Monogram";

export default function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 text-[0.95rem] text-ink-2 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="group flex items-center gap-3 text-ink" aria-label={`${profile.name}, home`}>
          <Monogram size={32} />
          <span>
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
        </Link>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          <li>
            <a className="link" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="link" href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <Link className="link" href="/resume">
              Resume
            </Link>
          </li>
          <li>
            <a className="link" href="#top">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
