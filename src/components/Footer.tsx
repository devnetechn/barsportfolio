import Link from "next/link";
import { profile } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="no-print border-t border-rule">
      <div className="container-page flex flex-col gap-6 py-10 text-[0.95rem] text-graphite md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="hover:text-ink" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="hover:text-ink" href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <Link className="hover:text-ink" href="/resume">
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
