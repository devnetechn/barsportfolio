"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/site";

const links = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open ? "border-b border-rule bg-paper/95 backdrop-blur" : "bg-paper/0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between gap-6"
      >
        <Link
          href="/"
          onClick={close}
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {profile.name}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={`/#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`rounded-md px-3 py-2 text-[0.95rem] transition-colors ${
                  active === l.id ? "text-ink" : "text-graphite hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <Link href="/resume" className="btn btn-secondary !min-h-10 !py-2">
              Resume
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule bg-paper md:hidden"
      >
        <ul className="container-page flex flex-col py-4">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={`/#${l.id}`}
                onClick={close}
                className="block border-b border-rule py-4 font-display text-2xl text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Link href="/resume" onClick={close} className="btn btn-primary w-full">
              View resume
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
