/**
 * Skills, split by evidence.
 * "Professional" = used in a shipped or client project listed on this site
 *   (the `where` field names it, so every entry is checkable).
 * "Familiar" = used in coursework or smaller personal projects; comfortable
 *   reading and extending, but not yet used for client work.
 * Review and trim this list so it only contains things you can explain in an interview.
 */

export type ProSkill = { name: string; where: string };
export type SkillGroup = { title: string; items: ProSkill[] };

export const professionalSkills: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "TypeScript", where: "Web2Print, Pulse" },
      { name: "JavaScript", where: "Randy's, IHES Alumni" },
      { name: "React", where: "IHES Alumni, Web2Print" },
      { name: "Next.js (App Router)", where: "Web2Print, Pulse, this site" },
      { name: "Tailwind CSS", where: "Web2Print, IHES Alumni, Pulse" },
      { name: "HTML & CSS", where: "Randy's" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "PHP 8", where: "Randy's" },
      { name: "Node.js & Express", where: "IHES Alumni" },
      { name: "REST API design", where: "Randy's, IHES Alumni, Web2Print" },
      { name: "Next.js route handlers & server actions", where: "Web2Print, Pulse" },
      { name: "Socket.io", where: "IHES Alumni" },
      { name: "WebRTC signaling", where: "Pulse" },
      { name: "JWT & session auth", where: "IHES Alumni, Randy's" },
      { name: "Jest & Supertest", where: "IHES Alumni" },
    ],
  },
  {
    title: "Data",
    items: [
      { name: "PostgreSQL", where: "IHES Alumni, Web2Print, Pulse" },
      { name: "Row Level Security", where: "IHES Alumni, Web2Print" },
      { name: "MySQL / MariaDB", where: "Randy's" },
      { name: "Supabase", where: "Web2Print, Pulse" },
      { name: "Prisma", where: "Pulse" },
    ],
  },
  {
    title: "APIs & AI",
    items: [
      { name: "Anthropic Claude API", where: "Randy's CRM agent" },
      { name: "OpenAI API (function calling)", where: "IHES Alumni" },
      { name: "Google Gemini API", where: "Randy's chat" },
      { name: "Stripe", where: "Web2Print" },
      { name: "PayMongo", where: "IHES Alumni" },
      { name: "Twilio", where: "Randy's" },
      { name: "Google Calendar API", where: "Randy's" },
      { name: "4over print API", where: "Web2Print" },
      { name: "GoHighLevel webhooks", where: "Web2Print" },
      { name: "Mapbox GL JS", where: "Pulse" },
    ],
  },
  {
    title: "Delivery",
    items: [
      { name: "Git & GitHub", where: "All projects" },
      { name: "Vercel", where: "Web2Print, IHES Alumni, Pulse" },
      { name: "Hostinger & cron jobs", where: "Randy's" },
    ],
  },
];

export const familiarSkills: string[] = [
  "Laravel",
  "Vue",
  "Vite",
  "Python",
  "Django",
  "SQLite",
  "SCSS",
];
