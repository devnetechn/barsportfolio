import Link from "next/link";

type Service = {
  id: string;
  title: string;
  body: string;
  includes: string[];
  proof: { label: string; href: string }[];
};

const services: Service[] = [
  {
    id: "full-stack",
    title: "Full-stack web development",
    body: "Complete web applications, from the public site customers see to the dashboard the team works in. Built with Next.js and React, or plain PHP when the hosting calls for it.",
    includes: ["Marketing sites and storefronts", "Customer accounts and admin dashboards", "Responsive, accessible interfaces"],
    proof: [
      { label: "Web2Print", href: "/work/web2print" },
      { label: "IHES Alumni", href: "/work/ihes-alumni-association" },
    ],
  },
  {
    id: "integrations",
    title: "API and third-party integrations",
    body: "Connecting your system to the services it depends on: payments, suppliers, calendars, messaging, and CRMs, with failures handled so one outage doesn't take down the rest.",
    includes: ["Stripe and PayMongo payments with webhooks", "Supplier APIs for catalog, pricing, and orders", "Twilio, Google Calendar, and CRM webhooks"],
    proof: [
      { label: "Web2Print", href: "/work/web2print" },
      { label: "Randy's", href: "/work/randys-painting-drywall" },
    ],
  },
  {
    id: "ai-automation",
    title: "AI-assisted business automation",
    body: "AI that does a specific job inside your workflow, with clear limits. The model chooses from a fixed set of actions, its output is validated, and every decision is logged.",
    includes: ["Lead follow-up agents with Claude", "Assistants that answer from your live data", "Fallbacks when the AI service is unavailable"],
    proof: [
      { label: "Randy's CRM agent", href: "/work/randys-painting-drywall" },
      { label: "IHES assistant", href: "/work/ihes-alumni-association" },
    ],
  },
  {
    id: "backend",
    title: "Backend and database development",
    body: "REST APIs, schemas, and the rules that keep data correct and private, including multi-tenant isolation enforced in the database itself.",
    includes: ["PostgreSQL and MySQL schema design", "Row Level Security and role-based access", "Automated API tests with Jest and Supertest"],
    proof: [
      { label: "IHES Alumni", href: "/work/ihes-alumni-association" },
      { label: "PetCoverage Pulse", href: "/work/petcoverage-pulse" },
    ],
  },
  {
    id: "lead-gen",
    title: "Lead generation and business systems",
    body: "The parts of a website that bring in and track business: booking forms, lead stages, follow-up, ad attribution, local landing pages, and reports the owner can download.",
    includes: ["Online booking and lead pipelines", "UTM and ad-click attribution", "Location pages and booking reports"],
    proof: [{ label: "Randy's Painting & Drywall", href: "/work/randys-painting-drywall" }],
  },
];

export default function Services() {
  return (
    <section id="services" className="section border-t border-rule" aria-labelledby="services-title">
      <div className="container-page">
        <h2 id="services-title" className="section-title">
          What I can build for you
        </h2>
        <p className="section-intro">
          Five kinds of work I take on, each backed by a project you can inspect.
        </p>

        <div className="mt-14 border-t border-rule-strong">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="grid gap-5 border-b border-rule-strong py-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12"
            >
              <h3 className="text-[clamp(1.4rem,2.4vw,1.85rem)]">{s.title}</h3>
              <div>
                <p className="prose-measure text-graphite">{s.body}</p>
                <ul className="mt-5 grid gap-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.95rem] text-graphite">
                  See it in{" "}
                  {s.proof.map((p, i) => (
                    <span key={p.href + p.label}>
                      {i > 0 && " and "}
                      <Link href={p.href} className="text-link">
                        {p.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
