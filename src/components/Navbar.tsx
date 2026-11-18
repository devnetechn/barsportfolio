"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/lib/site";
import { Monogram } from "@/components/Monogram";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "expertise", label: "Expertise" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view (home page only).
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

  // Lock scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  const close = () => setOpen(false);
  const href = (id: string) => (id === "top" ? "/" : `/#${id}`);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      {/* The blur lives on its own layer: backdrop-filter on the header itself
          would become the containing block of the fixed mobile menu. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 -z-10 h-[72px] border-b transition-[background-color,border-color,opacity] duration-300 ${
          scrolled || open
            ? "border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md"
            : "border-transparent"
        }`}
      />
      <nav aria-label="Primary" className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link href="/" onClick={close} className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <Monogram />
          <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <Link
                  href={href(l.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block px-3.5 py-2 text-[0.95rem] transition-colors duration-200 after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-ink after:scale-x-100"
                      : "text-ink-2 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          {profile.available && (
            <p className="hidden items-center gap-2 text-sm text-ink-2 xl:flex">
              <span className="status-dot" data-live="true" aria-hidden="true" />
              {profile.availability}
            </p>
          )}
          <Link href="/#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-bg transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="container-page flex min-h-full flex-col justify-between gap-10 py-8">
          <ul>
            {links.map((l, i) => (
              <li
                key={l.id}
                className={`border-b border-line transition-[opacity,transform] duration-500 ease-[var(--ease-out)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${i * 50 + 60}ms` : "0ms" }}
              >
                <Link
                  href={href(l.id)}
                  onClick={close}
                  className="display block py-4 text-[clamp(2rem,9vw,3rem)] text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-5">
            {profile.available && (
              <p className="flex items-center gap-2 text-ink-2">
                <span className="status-dot" data-live="true" aria-hidden="true" />
                {profile.availability}
              </p>
            )}
            <Link href="/#contact" onClick={close} className="btn btn-primary w-full">
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
