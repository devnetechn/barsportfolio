const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://barsportfolio.vercel.app");

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "");

export const profile = {
  name: "Everesto Cabasag",
  role: "Full Stack Developer",
  specialty: "AI Integration & Business Automation",
  headline: "Full Stack Developer | AI Integration & Business Automation",
  location: "Philippines",
  email: "devnetechn@gmail.com",
  github: "https://github.com/devnetechn",
  githubHandle: "devnetechn",
  portrait: "/projects/bares.png",
  resumePdf: "/everesto-cabasag-resume.pdf",
  description:
    "Everesto Cabasag is a full stack developer in the Philippines who builds business web applications, API integrations, and AI-assisted automation such as booking systems, lead pipelines, payments, and supplier integrations.",
};
