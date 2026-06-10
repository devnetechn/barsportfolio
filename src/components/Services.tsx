"use client";

import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: "fas fa-laptop-code",
    title: "Web Development",
    desc: "Modern, responsive websites and web apps built with React, Next.js, and clean code — deployed fast on Vercel.",
    features: ["Responsive design", "Vercel deployment", "Performance optimized"],
  },
  {
    icon: "fas fa-plug",
    title: "API Integrations",
    desc: "Connect your tools and platforms together. I set up API connections so your apps and services talk to each other seamlessly.",
    features: ["Third-party APIs", "Webhooks & triggers", "Data sync"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[0.85rem] text-[var(--accent)] block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &lt;services&gt;
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4">
            What I Offer
          </h2>
          <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[500px] mx-auto">
            Services tailored to help businesses build and automate
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 80}>
              <div className="h-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[var(--radius-lg)] p-8 transition-all duration-300 hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-[var(--radius-md)] flex items-center justify-center mb-5 text-2xl text-[var(--accent)] bg-[rgba(108,92,231,0.1)] transition-all duration-300 group-hover:bg-[rgba(108,92,231,0.2)] group-hover:scale-110">
                  <i className={service.icon} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                  {service.desc}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]"
                    >
                      <i className="fas fa-check text-[var(--accent)] text-xs" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
