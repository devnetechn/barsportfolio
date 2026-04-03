"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  updated_at: string;
}

const langIcons: Record<string, string> = {
  JavaScript: "fab fa-js-square",
  TypeScript: "fab fa-js-square",
  PHP: "fab fa-php",
  HTML: "fab fa-html5",
  CSS: "fab fa-css3-alt",
  SCSS: "fab fa-sass",
  Vue: "fab fa-vuejs",
  Python: "fab fa-python",
  Laravel: "fab fa-laravel",
};

const defaultIcon = "fas fa-code";

// Custom live links for repos that don't have homepage set on GitHub
const customHomepages: Record<string, string> = {
  "job-finder": "https://jeanegroup.sisgensan.com/",
  "barsMusic": "https://gospel-outlets-vienna-circulation.trycloudflare.com",
  "sis": "https://stratfordgensan.vercel.app/",
  "NewsLetter": "https://isidro-hulom.vercel.app/#/",
  "socsargen": "https://sublime-istanbul-allan-connect.trycloudflare.com",
};

// Project screenshots (stored in public/projects/)
const projectScreenshots: Record<string, string> = {
  "barsMusic": "/projects/barsMusic.png",
  "sis": "/projects/sis.png",
  "E-boto": "/projects/E-boto.png",
  "Archive": "/projects/Archive.png",
  "BarangayHealthCenter": "/projects/bhs.png",
  "NewsLetter": "/projects/NewsLetter.png",
  "Bigc": "/projects/Bigc.png",
  "cheljor-foodstation": "/projects/cheljor-foodstation.png",
  "job-finder": "/projects/job-finder.png",
  "snilscents": "/projects/snilscents.png",
  "socsargen": "/projects/socsargen.png",
};

// Repos to exclude from display (this portfolio itself)
const excludeRepos = ["barsportfolio"];

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetch("https://api.github.com/users/devnetechn/repos?sort=updated&per_page=100")
      .then((res) => res.json())
      .then((data: Repo[]) => {
        const processed = data
          .filter((r: Repo) => !excludeRepos.includes(r.name))
          .map((r: Repo) => ({
            ...r,
            homepage: r.homepage || customHomepages[r.name] || null,
            language: r.language === "Blade" ? "Laravel" : r.language,
          }));
        setRepos(processed);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get unique languages for filter buttons
  const languages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  ) as string[];

  const filters = [
    { label: "All", value: "all" },
    ...languages.map((lang) => ({ label: lang, value: lang.toLowerCase() })),
  ];

  const filtered =
    activeFilter === "all"
      ? repos
      : repos.filter(
          (r) => r.language && r.language.toLowerCase() === activeFilter
        );

  return (
    <section id="projects" className="py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[0.85rem] text-[var(--accent)] block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &lt;projects&gt;
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4">
            My Projects
          </h2>
          <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[500px] mx-auto">
            All repositories from my GitHub
          </p>
        </div>

        {/* Filters */}
        {!loading && (
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-6 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-300 ${
                  activeFilter === f.value
                    ? "text-white border-transparent"
                    : "border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
                }`}
                style={
                  activeFilter === f.value
                    ? { background: "var(--gradient-1)" }
                    : {}
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-3 border-[var(--border-color)] border-t-[var(--accent)] rounded-full animate-spin" />
            <p className="text-[var(--text-muted)] mt-4">Loading repositories...</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6 max-md:grid-cols-1">
          {filtered.map((repo, i) => (
            <ScrollReveal key={repo.id} delay={i * 60}>
              <div className="project-card group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {/* Image Area */}
                <div className="relative h-[200px] overflow-hidden">
                  {projectScreenshots[repo.name] ? (
                    <Image
                      src={projectScreenshots[repo.name]}
                      alt={repo.name}
                      width={680}
                      height={400}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-5xl text-[var(--accent-light)]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,206,201,0.1))",
                      }}
                    >
                      <i
                        className={
                          repo.language
                            ? langIcons[repo.language] || defaultIcon
                            : defaultIcon
                        }
                      />
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="flex gap-4">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          className="project-link-btn w-12 h-12 rounded-full bg-[var(--bg-card)] border border-[var(--border-hover)] flex items-center justify-center text-lg text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)]"
                          title="Live Demo"
                        >
                          <i className="fas fa-external-link-alt" />
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="project-link-btn w-12 h-12 rounded-full bg-[var(--bg-card)] border border-[var(--border-hover)] flex items-center justify-center text-lg text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)]"
                        title="Source Code"
                      >
                        <i className="fab fa-github" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-[1.15rem] font-bold mb-2 capitalize">
                    {repo.name.replace(/-/g, " ")}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2">
                    {repo.description || "A project built with passion and clean code."}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {repo.language && (
                      <span className="px-3 py-1 rounded-full bg-[rgba(108,92,231,0.1)] text-[var(--accent-light)] text-xs font-medium">
                        {repo.language}
                      </span>
                    )}
                    {repo.homepage && (
                      <span className="px-3 py-1 rounded-full bg-[rgba(0,206,201,0.1)] text-[#00cec9] text-xs font-medium">
                        Live
                      </span>
                    )}
                    {repo.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full bg-[rgba(108,92,231,0.06)] text-[var(--text-muted)] text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/devnetechn?tab=repositories"
            target="_blank"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[var(--radius-xl)] text-[0.95rem] font-semibold text-[var(--text-primary)] border border-[var(--border-hover)] bg-transparent transition-all duration-300 hover:bg-[var(--bg-card)] hover:border-[var(--accent)] hover:-translate-y-0.5"
          >
            <i className="fab fa-github" />
            <span>View All on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
