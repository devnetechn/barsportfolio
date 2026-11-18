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
  fullName: "Everesto Cabasag Jr.",
  initials: "EC",
  role: "Full-Stack Developer",
  headline: "Full-Stack Developer, web applications, API integrations and AI automation",
  location: "Philippines",
  timezone: "UTC+8",
  email: "devnetechn@gmail.com",
  github: "https://github.com/devnetechn",
  githubHandle: "devnetechn",
  portrait: "/projects/bares.png",
  resumePdf: "/everesto-cabasag-resume.pdf",
  /** Shown in the navigation and contact section. Set to false to hide. */
  available: true,
  availability: "Available for freelance work",
  description:
    "Everesto Cabasag is a full-stack developer in the Philippines who builds web applications, API integrations and AI-powered automation, from first idea to deployment.",
};
