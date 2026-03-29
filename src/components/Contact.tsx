"use client";

import { FormEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    const mailtoLink = `mailto:devnetechn@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    form.reset();
  };

  return (
    <section id="contact" className="py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-[0.85rem] text-[var(--accent)] block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &lt;contact&gt;
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-1px] mb-4">
            Get In Touch
          </h2>
          <p className="text-[1.05rem] text-[var(--text-secondary)] max-w-[500px] mx-auto">
            Have a project in mind? Let&apos;s work together
          </p>
        </div>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-10 items-start">
            {/* Info Cards */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5 p-6 rounded-[var(--radius-md)] bg-[var(--bg-card)] border border-[var(--border-color)] transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center bg-[rgba(108,92,231,0.1)] text-[var(--accent)] text-xl shrink-0">
                  <i className="fab fa-github" />
                </div>
                <div>
                  <h4 className="text-[0.85rem] font-semibold mb-1">GitHub</h4>
                  <a
                    href="https://github.com/devnetechn"
                    target="_blank"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-light)]"
                  >
                    github.com/devnetechn
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-[var(--radius-md)] bg-[var(--bg-card)] border border-[var(--border-color)] transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center bg-[rgba(108,92,231,0.1)] text-[var(--accent)] text-xl shrink-0">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <h4 className="text-[0.85rem] font-semibold mb-1">Email</h4>
                  <a
                    href="mailto:devnetechn@gmail.com"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-light)]"
                  >
                    devnetechn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-[var(--radius-md)] bg-[var(--bg-card)] border border-[var(--border-color)] transition-all duration-300 hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]">
                <div className="w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center bg-[rgba(108,92,231,0.1)] text-[var(--accent)] text-xl shrink-0">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <h4 className="text-[0.85rem] font-semibold mb-1">
                    Location
                  </h4>
                  <span className="text-sm text-[var(--text-secondary)]">
                    Philippines
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="form-input w-full px-5 py-4 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[0.95rem] outline-none transition-all duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="form-input w-full px-5 py-4 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[0.95rem] outline-none transition-all duration-300"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="form-input w-full px-5 py-4 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] text-[0.95rem] outline-none transition-all duration-300 resize-y min-h-[140px]"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-[var(--radius-xl)] text-[0.95rem] font-semibold text-white cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)] border-none"
                style={{
                  background: "var(--gradient-1)",
                  boxShadow: "0 4px 20px var(--accent-glow)",
                }}
              >
                <span>Send Message</span>
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
