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
  "web2print-clone": "https://web2print-clone-3pnr.vercel.app/",
  "job-finder": "https://jeanegroup.sisgensan.com/",
  "barsMusic": "https://gospel-outlets-vienna-circulation.trycloudflare.com",
  "sis": "https://stratfordgensan.vercel.app",
  "NewsLetter": "https://isidro-hulom.vercel.app/#/",
  "beed-review": "https://wonnalearn.site",
  "socsargen-system": "https://dev.randyspaintdrywall.com/",
  "randy_project": "https://midnightblue-rat-608891.hostingersite.com/",
  "ofw-socsargen": "https://ofw.socsargencountyhospital.com/",
};

// Project screenshots (stored in public/projects/)
const projectScreenshots: Record<string, string> = {
  "APEX": "/projects/apex.png",
  "Alumni": "/projects/alumni.png",
  "beed-review": "/projects/wonnalearn.png",
  "gm-apartelle": "/projects/gm-apartelle.png",
  "web2print-clone": "/projects/clone.png",
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
  "socsargen-system": "/projects/socsargen.png",
  "randy_project": "/projects/randy_project.png",
  "ofw-socsargen": "/projects/ofw-socsargen.png",
  "pharmacy": "/projects/pharmacy.png",
};

const projectTitles: Record<string, string> = {
  "beed-review": "WonnaLearn",
  "gm-apartelle": "GM Apartelle",
};

const projectDescriptions: Record<string, string> = {
  "Alumni":
    "The IHES Alumni Association website helps former students reconnect, share stories, and stay involved in their school community.",
  "APEX":
    "An online storefront for APEX, a General Santos City hat brand, showcasing its cap collections and latest releases.",
  "Archive":
    "A searchable capstone archive for exploring approved student projects by title, department, program, academic year, and semester.",
  "BarangayHealthCenter":
    "A digital health-center system for managing patient records, appointments with SMS reminders, immunizations, and health analytics.",
  "BarangayInformation":
    "A barangay management system for resident records, community announcements, and online requests for local certificates and documents.",
  "barsMusic":
    "A music library for discovering and playing trending songs, with tools for uploading and managing music.",
  "beed-review":
    "An online learning platform where students can sign in to continue studying and access learning materials.",
  "Bigc":
    "A BIG-C Foodhouse website showcasing its menu and local food offerings.",
  "cheljor-foodstation":
    "An online food-ordering storefront featuring Cheljor Foodstation's menu, food categories, and shopping cart.",
  "E-boto":
    "An election management dashboard for registering voters and candidates, monitoring votes, and viewing election results.",
  "gm-apartelle":
    "A booking website for GM Apartelle in Maasim, Sarangani, with room information and availability search.",
  "Inventory-system":
    "An inventory and sales management system for tracking products, categories, daily sales, users, and repair records.",
  "NewsLetter":
    "The IHES Journal publishes school articles, student accomplishments, events, announcements, and gallery updates.",
  "ofw-socsargen":
    "A clinic website for Overseas Filipino Workers in SOCCSKSARGEN, with medical services, packages, doctors, and appointment booking.",
  "pharmacy":
    "A pharmacy management application for maintaining medicine stock, recording transactions, and reviewing reports.",
  "randy_project":
    "A business website for Randy's Painting & Drywall Services, featuring home-improvement services, project photos, and estimate booking.",
  "sis":
    "The Stratford International School website presents its academics, admissions, school news, faculty, and student and parent portals.",
  "snilscents":
    "An online perfume storefront for S'NILS Scents, featuring handcrafted fragrances and a shop collection.",
  "voting":
    "The SIS E-BOTO 2025 portal provides voter sign-in for the school's online election.",
  "web2print-clone":
    "An online storefront for Web2Print Solutions, featuring custom apparel, printing products, and business services.",
  "zhub":
    "The Z Pickle Hub website lets customers browse court availability and book pickleball playing slots.",
};

// Repos to exclude from display (this portfolio itself + incomplete/test repos)
const excludeRepos = [
  "barsportfolio",
  "socsar",
  "que",
  "socsargen-system-1",
];

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
            homepage: customHomepages[r.name] || r.homepage || null,
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
                    {projectTitles[repo.name] || repo.name.replace(/-/g, " ")}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2">
                    {projectDescriptions[repo.name] ||
                      repo.description ||
                      "More details about this project will be added soon."}
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
