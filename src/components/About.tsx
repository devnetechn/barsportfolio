"use client";

import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[0.85rem] text-[var(--accent)] block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &lt;about&gt;
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4">
            About Me
          </h2>
          <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[500px] mx-auto">
            Get to know the developer behind the code
          </p>
        </div>

        {/* Grid */}
        <ScrollReveal>
          <div className="grid md:grid-cols-[350px_1fr] gap-20 items-center max-md:grid-cols-1 max-md:gap-12 max-md:text-center">
            {/* Image */}
            <div className="relative w-[300px] h-[300px] mx-auto">
              <Image
                src="https://avatars.githubusercontent.com/u/255499279?v=4"
                alt="Bare'S"
                width={300}
                height={300}
                className="rounded-[var(--radius-lg)] object-cover relative z-[1] w-full h-full"
              />
              <div className="absolute -inset-2 rounded-[calc(var(--radius-lg)+4px)] border-2 border-[var(--accent)] opacity-30" />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.5px] mb-5">
                A passionate developer based in the Philippines
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                I&apos;m a full-stack web developer who loves building web
                applications that solve real-world problems. With experience in
                both frontend and backend technologies, I create seamless digital
                experiences from concept to deployment.
              </p>
              <p className="text-[var(--text-secondary)] mb-4">
                My journey in web development has led me to work on diverse
                projects — from student information systems to e-commerce
                platforms and food ordering applications. I enjoy every step of
                the development process.
              </p>

              <div className="flex flex-wrap gap-6 my-8 max-md:justify-center">
                <div className="flex items-center gap-2.5 text-[var(--text-secondary)] text-sm">
                  <i className="fas fa-map-marker-alt text-[var(--accent)]" />
                  <span>Philippines</span>
                </div>
                <div className="flex items-center gap-2.5 text-[var(--text-secondary)] text-sm">
                  <i className="fas fa-code text-[var(--accent)]" />
                  <span>Full-Stack Developer</span>
                </div>
                <div className="flex items-center gap-2.5 text-[var(--text-secondary)] text-sm">
                  <i className="fas fa-rocket text-[var(--accent)]" />
                  <span>5 Live Projects</span>
                </div>
              </div>

              <a
                href="https://github.com/devnetechn"
                target="_blank"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[var(--radius-xl)] text-[0.95rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)]"
                style={{
                  background: "var(--gradient-1)",
                  boxShadow: "0 4px 20px var(--accent-glow)",
                }}
              >
                <i className="fab fa-github" />
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
