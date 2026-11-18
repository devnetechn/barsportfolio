"use client";

import { FormEvent, useState } from "react";
import { profile } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function buildMailto(name: string, email: string, company: string, message: string) {
  const subject = `Project inquiry from ${name}${company ? ` (${company})` : ""}`;
  const body = [`Name: ${name}`, `Email: ${email}`, company ? `Company: ${company}` : null, "", message]
    .filter((l) => l !== null)
    .join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * There is no mail backend on this site, so the form validates the message
 * and hands it to the visitor's own email app. It never reports a message as
 * "sent", because the site cannot know whether it was.
 */
export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
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

    const first = Object.keys(next)[0];
    if (first) {
      setStatus("");
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    window.location.href = buildMailto(name, email, company, message);
    setStatus(
      `Your email app should open with the message filled in. Press send there to reach me. If nothing opened, write to ${profile.email}.`,
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

  const field = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    onInput: () => errors[name] && setErrors((e) => ({ ...e, [name]: undefined })),
  });

  const errorText = (name: FieldName) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-2 text-sm text-danger">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section id="contact" className="section relative overflow-hidden border-t border-line" aria-labelledby="contact-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 left-1/2 -z-10 h-[560px] w-[1100px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(92,124,255,0.13), transparent)" }}
      />
      <div className="container-page">
        <h2 id="contact-title" className="display display-lg reveal max-w-[16ch]">
          Have an idea? Let&apos;s build something meaningful.
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
          <div>
            {profile.available && (
              <p className="flex items-center gap-2.5 text-lg">
                <span className="status-dot" data-live="true" aria-hidden="true" />
                {profile.availability}
              </p>
            )}
            <p className="mt-4 measure text-ink-2">
              Tell me what the business does, what isn&apos;t working, and the tools you already use. A
              few sentences is enough to start. I reply by email.
            </p>

            <dl className="mt-12 divide-y divide-line border-y border-line">
              <div className="grid grid-cols-[96px_1fr] gap-4 py-5">
                <dt className="text-ink-3">Email</dt>
                <dd className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a href={`mailto:${profile.email}`} className="link break-all">
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-4 py-5">
                <dt className="text-ink-3">GitHub</dt>
                <dd>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
                    github.com/{profile.githubHandle}
                    <ArrowUpRight />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-4 py-5">
                <dt className="text-ink-3">Location</dt>
                <dd>
                  {profile.location}, {profile.timezone}, working remotely
                </dd>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-4 py-5">
                <dt className="text-ink-3">Resume</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2">
                  <a href={profile.resumePdf} download className="link">
                    Download PDF
                  </a>
                  <a href="/resume" className="link">
                    View online
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form noValidate onSubmit={onSubmit} aria-describedby="contact-form-note">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-sm text-ink-2">
                  Name
                </label>
                <input {...field("name")} type="text" autoComplete="name" required className="field" />
                {errorText("name")}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-ink-2">
                  Email
                </label>
                <input {...field("email")} type="email" autoComplete="email" required className="field" />
                {errorText("email")}
              </div>
            </div>
            <div className="mt-8">
              <label htmlFor="contact-company" className="block text-sm text-ink-2">
                Company <span className="text-ink-3">(optional)</span>
              </label>
              <input id="contact-company" name="company" type="text" autoComplete="organization" className="field" />
            </div>
            <div className="mt-8">
              <label htmlFor="contact-message" className="block text-sm text-ink-2">
                About the project
              </label>
              <textarea
                {...field("message")}
                rows={5}
                required
                placeholder="What do you want to build, and by when?"
                className="field resize-y"
              />
              {errorText("message")}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                Write the email
              </button>
              <p id="contact-form-note" className="text-sm text-ink-3">
                Opens your email app with the message filled in. Nothing is stored on this site.
              </p>
            </div>
            <p role="status" aria-live="polite" className="mt-5 text-[0.95rem] text-accent-hi empty:hidden">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
