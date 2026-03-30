"use client";

import ScrollReveal from "@/components/ScrollReveal";

const categories = [
  {
    title: "Frontend",
    icon: "fas fa-palette",
    color: "#61dafb",
    skills: [
      { icon: "fas fa-bolt", name: "Vite.js", desc: "Lightning-fast build tool & dev server" },
      { icon: "fab fa-react", name: "React", desc: "Component-based UI library" },
      { icon: "fab fa-vuejs", name: "Vue", desc: "Progressive JavaScript framework" },
      { icon: "fab fa-html5", name: "HTML5", desc: "Semantic & accessible markup" },
      { icon: "fab fa-css3-alt", name: "CSS3", desc: "Styling & responsive layouts" },
      { icon: "fab fa-js-square", name: "JavaScript", desc: "Dynamic & interactive web apps" },
    ],
  },
  {
    title: "Backend",
    icon: "fas fa-server",
    color: "#68a063",
    skills: [
      { icon: "fab fa-laravel", name: "Laravel", desc: "PHP web application framework" },
      { icon: "fab fa-python", name: "Django", desc: "High-level Python web framework" },
      { icon: "fab fa-php", name: "PHP", desc: "Server-side scripting language" },
      { icon: "fab fa-node-js", name: "Node.js", desc: "JavaScript runtime for server-side" },
      { icon: "fab fa-python", name: "Python", desc: "General-purpose programming language" },
    ],
  },
  {
    title: "Database",
    icon: "fas fa-database",
    color: "#f39c12",
    skills: [
      { icon: "fas fa-database", name: "PostgreSQL", desc: "Advanced relational database" },
      { icon: "fas fa-database", name: "MySQL", desc: "Popular relational database system" },
      { icon: "fas fa-feather", name: "SQLite", desc: "Lightweight embedded database" },
    ],
  },
  {
    title: "Tools",
    icon: "fas fa-wrench",
    color: "#a29bfe",
    skills: [
      { icon: "fab fa-git-alt", name: "Git", desc: "Version control & collaboration" },
      { icon: "fab fa-github", name: "GitHub", desc: "Code hosting & collaboration" },
      { icon: "fas fa-triangle-exclamation", name: "Vercel", desc: "Deployment & hosting platform", isVercel: true },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[0.85rem] text-[var(--accent)] block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &lt;skills&gt;
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4">
            Tech Stack
          </h2>
          <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[500px] mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-16">
          {categories.map((cat, catIdx) => (
            <ScrollReveal key={cat.title} delay={catIdx * 100}>
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: `${cat.color}15`,
                      color: cat.color,
                    }}
                  >
                    <i className={cat.icon} />
                  </div>
                  <h3 className="text-xl font-bold">{cat.title}</h3>
                  <div className="flex-1 h-px bg-[var(--border-color)]" />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                  {cat.skills.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[var(--radius-md)] p-6 px-5 text-center transition-all duration-300 hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 group"
                    >
                      <div className="w-[52px] h-[52px] rounded-[var(--radius-md)] flex items-center justify-center mx-auto mb-3 text-2xl text-[var(--accent)] bg-[rgba(108,92,231,0.1)] transition-all duration-300 group-hover:bg-[rgba(108,92,231,0.2)] group-hover:scale-110">
                        {"isVercel" in skill ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 22.525H0l12-21.05 12 21.05z" />
                          </svg>
                        ) : (
                          <i className={skill.icon} />
                        )}
                      </div>
                      <h4 className="text-sm font-semibold mb-1">{skill.name}</h4>
                      <p className="text-[0.7rem] text-[var(--text-muted)] leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
