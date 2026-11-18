/**
 * Technical expertise, grouped the way clients look for it.
 * `seenIn` names a project on this site that uses the skill, so the claim can
 * be checked. Leave it empty rather than inventing one. No proficiency levels.
 */

export type Skill = { name: string; seenIn?: string };
export type SkillGroup = { title: string; summary: string; items: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    summary: "Interfaces that load fast, work on a phone and stay accessible.",
    items: [
      { name: "React", seenIn: "Web2Print, Alumni Platform" },
      { name: "Next.js", seenIn: "Web2Print, WonnaLearn, Pulse" },
      { name: "TypeScript", seenIn: "Web2Print, WonnaLearn" },
      { name: "JavaScript", seenIn: "Randy's, Alumni Platform" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind CSS", seenIn: "Web2Print, Maasim Tourism" },
    ],
  },
  {
    title: "Backend",
    summary: "APIs, auth, webhooks and the business rules behind them.",
    items: [
      { name: "Node.js", seenIn: "Alumni Platform" },
      { name: "Express.js", seenIn: "Alumni Platform" },
      { name: "PHP", seenIn: "Randy's, IHESAA, E-BOTO" },
      { name: "Laravel" },
      { name: "Python" },
    ],
  },
  {
    title: "Database",
    summary: "Schemas, migrations and access rules enforced in the database.",
    items: [
      { name: "PostgreSQL", seenIn: "Alumni Platform, Pulse" },
      { name: "MySQL", seenIn: "Randy's, E-BOTO" },
      { name: "Supabase", seenIn: "Web2Print, WonnaLearn" },
      { name: "SQLite" },
    ],
  },
  {
    title: "AI & Automation",
    summary: "Models that do one job inside a workflow, with limits and a log.",
    items: [
      { name: "Claude Code" },
      { name: "OpenAI API", seenIn: "WonnaLearn, Alumni Platform" },
      { name: "LLM integration", seenIn: "Randy's CRM agent" },
      { name: "Open WebUI" },
      { name: "Puppeteer" },
      { name: "AI automation", seenIn: "Randy's CRM agent" },
    ],
  },
  {
    title: "Tools",
    summary: "From the first sketch to the production deploy.",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel", seenIn: "Web2Print, Pulse" },
      { name: "Figma" },
      { name: "Adobe Photoshop" },
      { name: "Adobe Illustrator" },
    ],
  },
];

export type Service = { title: string; body: string };

export const services: Service[] = [
  {
    title: "Full-stack web development",
    body: "A complete application, from the pages customers use to the dashboard your team works in, delivered and deployed.",
  },
  {
    title: "Custom website development",
    body: "A fast, search-friendly site built for your business instead of a template, with the booking or inquiry flow you actually need.",
  },
  {
    title: "API integration",
    body: "Your system connected to payments, suppliers, calendars, SMS and CRMs, with failures handled so one outage doesn't stop the rest.",
  },
  {
    title: "AI integration & automation",
    body: "AI that takes a specific task off your plate, such as lead follow-up or answering from your own data, with clear limits and a record of every decision.",
  },
  {
    title: "Database design & development",
    body: "Schemas that keep your data correct and private, including access rules enforced by the database itself.",
  },
  {
    title: "Website maintenance & technical support",
    body: "Updates, fixes, hosting moves and performance work for a site you already have, so it keeps running while you run the business.",
  },
];
