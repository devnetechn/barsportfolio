"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      let current = "#hero";
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= top) {
          current = "#" + section.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-[var(--border-color)] py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="font-[var(--font-mono)] text-xl font-bold text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="text-[var(--accent)]">&lt;</span>
          Bare&apos;S
          <span className="text-[var(--accent)]"> /&gt;</span>
        </a>

        <ul
          className={`md:flex gap-2 ${
            menuOpen
              ? "flex fixed inset-0 bg-[rgba(10,10,15,0.98)] flex-col items-center justify-center gap-2 z-[998]"
              : "hidden"
          }`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  active === link.href
                    ? "text-[var(--accent-light)] bg-[var(--bg-card)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-[5px] bg-none border-none cursor-pointer p-2 z-[999]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>
    </nav>
  );
}
