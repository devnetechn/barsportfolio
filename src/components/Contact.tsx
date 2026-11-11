"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { profile } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function buildMailto(name: string, email: string, company: string, message: string) {
  const subject = `Project inquiry from ${name}${company ? ` (${company})` : ""}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter an email address like name@company.com.";
    if (message.length < 10) next.message = "Describe your project in at least 10 characters.";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      setStatus("");
      const first = Object.keys(next)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    window.location.href = buildMailto(name, email, company, message);
    setStatus(
      `Your email app should now open with the message filled in. If nothing opened, email ${profile.email} directly.`,
    );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus(`Copying isn't available in this browser. The address is ${profile.email}.`);
    }
  };

  const fieldProps = (name: keyof Errors) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorText = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-[#b42318] dark:text-[#ff8a80]">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section id="contact" className="section border-t border-rule bg-panel" aria-labelledby="contact-title">
      <div className="container-page grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <h2 id="contact-title" className="section-title">
            Tell me what you need built
          </h2>
          <p className="section-intro">
            A short description is enough to start: what the business does, what isn&apos;t working,
            and any tools you already use. I reply by email.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm text-graphite">Email</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a href={`mailto:${profile.email}`} className="text-link text-lg">
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-md border border-rule-strong px-2.5 py-1 text-sm text-graphite hover:border-ink hover:text-ink"
                >
                  {copied ? "Copied" : "Copy address"}
                </button>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">GitHub</dt>
              <dd className="mt-1">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link text-lg">
                  github.com/{profile.githubHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">Resume</dt>
              <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-2 text-lg">
                <a href={profile.resumePdf} download className="text-link">
                  Download PDF
                </a>
                <Link href="/resume" className="text-link">
                  View online
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-graphite">Based in</dt>
              <dd className="mt-1 text-lg">{profile.location}, working remotely</dd>
            </div>
          </dl>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className="rounded-[var(--radius-lg)] border border-rule bg-paper p-6 shadow-[var(--shadow)] md:p-8"
          aria-describedby="contact-form-note"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block font-medium">
                Name
              </label>
              <input {...fieldProps("name")} type="text" autoComplete="name" required className="field" />
              {errorText("name")}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block font-medium">
                Email
              </label>
              <input {...fieldProps("email")} type="email" autoComplete="email" required className="field" />
              {errorText("email")}
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="contact-company" className="mb-1.5 block font-medium">
              Company <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" className="field" />
          </div>
          <div className="mt-5">
            <label htmlFor="contact-message" className="mb-1.5 block font-medium">
              Project details
            </label>
            <textarea {...fieldProps("message")} rows={6} required className="field resize-y" />
            {errorText("message")}
          </div>

          <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
            Open email to send
          </button>
          <p id="contact-form-note" className="mt-3 text-sm text-muted">
            This form opens your email app with your message filled in. Nothing is stored on this site.
          </p>
          <p role="status" aria-live="polite" className="mt-3 text-[0.95rem] text-accent empty:hidden">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
