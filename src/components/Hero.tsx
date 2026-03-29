"use client";

import { useEffect, useRef } from "react";
import CountUp from "@/components/CountUp";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[120px] pb-20 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="grid-overlay" />
        <div className="floating-shapes">
          <div
            className="shape"
            style={{
              width: 400,
              height: 400,
              background: "var(--accent)",
              top: -100,
              right: -100,
            }}
          />
          <div
            className="shape"
            style={{
              width: 300,
              height: 300,
              background: "#00cec9",
              bottom: -50,
              left: -50,
              animationDelay: "-5s",
            }}
          />
          <div
            className="shape"
            style={{
              width: 200,
              height: 200,
              background: "#fd79a8",
              top: "40%",
              left: "20%",
              animationDelay: "-10s",
            }}
          />
          <div
            className="shape"
            style={{
              width: 250,
              height: 250,
              background: "#6c5ce7",
              bottom: "20%",
              right: "20%",
              animationDelay: "-15s",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[1] text-center max-w-[800px]">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-sm font-medium text-[var(--accent-light)] mb-8">
          <span
            className="w-2 h-2 rounded-full bg-[#00b894]"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          Available for Work
        </div>

        {/* Title */}
        <h1 className="mb-6">
          <span className="animate-fade-in-up animate-delay-1 block text-[clamp(1rem,2vw,1.2rem)] font-normal text-[var(--text-secondary)] tracking-[2px] uppercase mb-2">
            Hello, I&apos;m
          </span>
          <span className="animate-fade-in-up animate-delay-2 block text-[clamp(2.5rem,7vw,5rem)] font-black tracking-[-2px] leading-[1.1] text-gradient mb-3">
            Bare'S
          </span>
          <span className="animate-fade-in-up animate-delay-3 block text-[clamp(1.2rem,3vw,1.8rem)] font-semibold text-[var(--text-primary)]">
            Full-Stack Developer
          </span>
        </h1>

        <p className="animate-fade-in-up animate-delay-4 text-[1.05rem] text-[var(--text-secondary)] max-w-[600px] mx-auto mb-10 leading-[1.8]">
          I build modern web applications with clean code and intuitive user
          experiences. Passionate about turning ideas into functional, beautiful
          digital products.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-5 flex gap-4 justify-center flex-wrap mb-16">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[var(--radius-xl)] text-[0.95rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)]"
            style={{
              background: "var(--gradient-1)",
              boxShadow: "0 4px 20px var(--accent-glow)",
            }}
          >
            <span>View Projects</span>
            <i className="fas fa-arrow-right" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-[var(--radius-xl)] text-[0.95rem] font-semibold text-[var(--text-primary)] border border-[var(--border-hover)] bg-transparent transition-all duration-300 hover:bg-[var(--bg-card)] hover:border-[var(--accent)] hover:-translate-y-0.5"
          >
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up animate-delay-6 flex justify-center gap-16 max-sm:flex-col max-sm:gap-5">
          <div className="text-center">
            <CountUp target={9} className="block text-[2.5rem] font-extrabold text-[var(--text-primary)] leading-none" />
            <span className="text-[0.85rem] text-[var(--text-muted)] uppercase tracking-[1px] mt-1">
              Projects
            </span>
          </div>
          <div className="text-center">
            <CountUp target={8} className="block text-[2.5rem] font-extrabold text-[var(--text-primary)] leading-none" />
            <span className="text-[0.85rem] text-[var(--text-muted)] uppercase tracking-[1px] mt-1">
              Live Sites
            </span>
          </div>
          <div className="text-center">
            <CountUp target={16} className="block text-[2.5rem] font-extrabold text-[var(--text-primary)] leading-none" />
            <span className="text-[0.85rem] text-[var(--text-muted)] uppercase tracking-[1px] mt-1">
              Technologies
            </span>
          </div>
        </div>
      </div>
      
    </section>
  );
}
