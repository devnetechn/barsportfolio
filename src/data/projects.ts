/**
 * Curated project data — the single source of truth for the project list,
 * case-study pages, resume, and portfolio statistics.
 *
 * Every claim here is traceable to the project's public repository
 * (github.com/devnetechn) or its live deployment. Do not add metrics,
 * clients, or features that cannot be pointed to in code.
 */

export const GITHUB_USER = "devnetechn";
export const githubRepo = (repo: string) =>
  `https://github.com/${GITHUB_USER}/${repo}`;

export type Shot = { src: string; alt: string; caption?: string };

export type LinkItem = { label: string; href: string };

export type CaseStudy = {
  slug: string;
  title: string;
  /** How the work came about — kept factual. */
  engagement: string;
  oneLiner: string;
  /** Short summary shown on the homepage row. */
  summary: string;
  cover: Shot;
  shots: Shot[];
  links: LinkItem[];
  overview: string[];
  problem: string[];
  contributions: string[];
  implementation: { heading: string; body: string }[];
  stack: string[];
  integrations: { name: string; use: string }[];
  /** Honest caveats shown on the case study page. */
  notes?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "randys-painting-drywall",
    title: "Randy's Painting & Drywall",
    engagement: "Freelance client project",
    oneLiner:
      "Website, booking system, and AI-assisted lead pipeline for a painting and drywall contractor in Pennsylvania.",
    summary:
      "A marketing site, online booking, live chat, and an admin CRM where a Claude-powered agent reviews leads and decides whether to email the customer, text the owner, or sync the calendar.",
    cover: {
      src: "/work/randy-php-home.jpg",
      alt: "Homepage of Randy's Painting & Drywall website",
    },
    shots: [
      {
        src: "/work/randy-php-home.jpg",
        alt: "Homepage of the PHP build with services and estimate call to action",
        caption: "Marketing homepage (PHP build)",
      },
      {
        src: "/work/randy-php-book.jpg",
        alt: "Online estimate booking page",
        caption: "Estimate booking flow",
      },
      {
        src: "/work/randy-home.jpg",
        alt: "Production website at randyspaintdrywall.com",
        caption: "Production site, randyspaintdrywall.com",
      },
    ],
    links: [
      { label: "Production site", href: "https://www.randyspaintdrywall.com/" },
      {
        label: "PHP build demo",
        href: "https://midnightblue-rat-608891.hostingersite.com/",
      },
      { label: "Source code", href: githubRepo("randy_project") },
    ],
    overview: [
      "Randy's Painting & Drywall is a residential and commercial painting and drywall contractor serving the Lehigh Valley and Bucks County, Pennsylvania.",
      "The project grew from a marketing website into the business's operating system: customers book estimates and chat online, and the owner manages bookings, leads, job applicants, reviews, gallery photos, and reports from one admin dashboard.",
    ],
    problem: [
      "Leads arrive through bookings and chat. Follow-up was automated only by a fixed timer that re-emailed a lead 24 hours after last contact, so no judgment was applied to whether a lead actually needed a nudge, an owner alert, or nothing at all.",
      "The site also had to run on low-cost shared hosting (Hostinger) without a Node runtime or a build step, so the stack had to stay simple to operate.",
    ],
    contributions: [
      "Rewrote the original React + Node app as plain PHP 8, MySQL and vanilla JavaScript so it runs on stock Apache shared hosting with no build step.",
      "Built customer accounts, estimate booking with status tracking, and an admin workflow to confirm, decline, reschedule, and complete appointments.",
      "Built a lead pipeline (new → contacted → quoted → won/lost) with stage-change emails and scheduled follow-ups via cron.",
      "Designed and built the CRM agent: a SQL pre-filter selects leads that need attention, then Claude chooses one action from a fixed list, executed through the same functions the admin uses, and written to an audit log.",
      "Integrated Twilio SMS owner alerts, Google Calendar sync, Gmail SMTP notifications, and a Gemini-powered chat assistant with a rule-based fallback.",
      "Added a blog, careers page with job applications and resume uploads, location landing pages for local SEO, UTM/ad-click lead attribution, and booking reports with PDF export.",
    ],
    implementation: [
      {
        heading: "Bounded AI decisions",
        body: "The agent never writes free text into the system. Claude must return strict JSON with an action from a fixed enum (update stage, send email, alert owner by SMS, sync calendar, or no action). Anything that fails validation is logged and ignored. A kill switch and a per-run cap keep it safe to operate unattended.",
      },
      {
        heading: "Cheap pre-filter, then the model",
        body: "A deterministic SQL query narrows leads to those never contacted or stale for their stage, so the API is only called when a decision is actually needed. The agent runs on a cron sweep and inline right after a booking or stage change.",
      },
      {
        heading: "Dependency-free integrations",
        body: "Twilio, Google Calendar, Gemini, and Anthropic are called with cURL. Google Calendar auth signs a service-account JWT with OpenSSL instead of pulling in Google's client library. Every side effect is best-effort and never throws, so a failed SMS or calendar call cannot break a booking.",
      },
      {
        heading: "Real-time without websockets",
        body: "Live chat uses short AJAX polling, so it works on shared hosting. Guests talk to the assistant first and can hand off to a human, who replies from the admin chat queue.",
      },
    ],
    stack: ["PHP 8", "MySQL / MariaDB (PDO)", "Vanilla JavaScript", "CSS", "Apache", "Cron", "Hostinger"],
    integrations: [
      { name: "Anthropic Claude API", use: "CRM agent that decides the next action for each lead" },
      { name: "Google Gemini API", use: "Website chat assistant" },
      { name: "Twilio", use: "SMS alerts to the owner for new bookings and cold leads" },
      { name: "Google Calendar API", use: "Appointments synced to the owner's calendar" },
      { name: "Gmail SMTP", use: "Booking, stage-change, follow-up, and applicant emails" },
    ],
    notes: [
      "The production domain currently serves a separate React build; the PHP rewrite described here is linked as the PHP build demo, and its source is public.",
    ],
  },
  {
    slug: "web2print",
    title: "Web2Print",
    engagement: "Freelance client project",
    oneLiner:
      "A print and custom-apparel storefront connected to a wholesale print supplier, with Stripe checkout and an admin back office.",
    summary:
      "Next.js storefront that pulls products and pricing from the 4over print API, applies per-category markup, takes payment through Stripe, and hands new customers to the client's GoHighLevel CRM.",
    cover: {
      src: "/work/web2print-home.jpg",
      alt: "Web2Print storefront homepage",
    },
    shots: [
      {
        src: "/work/web2print-home.jpg",
        alt: "Web2Print storefront homepage",
        caption: "Storefront homepage",
      },
      {
        src: "/work/web2print-print.jpg",
        alt: "Print product catalog page",
        caption: "Print catalog driven by 4over data",
      },
      {
        src: "/work/web2print-studio.jpg",
        alt: "Browser-based design studio",
        caption: "Design studio",
      },
    ],
    links: [
      { label: "Live site", href: "https://web2print-clone.vercel.app/" },
      { label: "Source code", href: githubRepo("web2print-clone") },
    ],
    overview: [
      "Web2Print sells printed products (business cards, flyers, banners, signs, stickers) and custom apparel. Fulfilment is handled by 4over, a wholesale trade printer, so the storefront resells 4over's catalog at retail prices.",
      "The project covers the customer storefront, cart and checkout, a browser design studio, quote requests, and an admin back office for orders, customers, products, coupons, and reports.",
    ],
    problem: [
      "4over's catalog is large and its pricing depends on many product options. Keeping a hand-maintained product list in sync with the supplier is error-prone, and wholesale prices need a consistent markup before they reach customers.",
      "Orders then had to flow back to 4over for production, and new customers needed to reach the client's CRM without manual data entry.",
    ],
    contributions: [
      "Built the 4over integration: API client, catalog and price sync into the database, product option parsing, category mapping, shipping quotes, order submission, and status sync.",
      "Implemented per-category markup that turns wholesale prices into retail prices, adjustable from the admin dashboard.",
      "Built Stripe checkout with a signature-verified webhook that marks orders paid and logs status changes.",
      "Built the admin back office: orders (including unpaid, archive, invoices, and payment requests), customers, products and product content, coupons, quotes, reports, and 4over sync tools.",
      "Wired new-customer signups to the client's GoHighLevel CRM through an inbound webhook.",
      "Wrote the SQL migrations, including Row Level Security policies and a security-hardening pass.",
    ],
    implementation: [
      {
        heading: "Supplier catalog as data",
        body: "Rather than hard-coding products, the app syncs 4over categories, products, options, and base prices into Postgres and builds the catalog pages from that data. Admins can re-run the sync and adjust markups without a deploy.",
      },
      {
        heading: "Payments that can't be spoofed",
        body: "The Stripe webhook verifies the request signature before trusting it. Because Stripe's server-to-server call carries no user session, the handler uses a server-only admin client for the update and treats the signature as the auth boundary.",
      },
      {
        heading: "Secrets stay on the server",
        body: "Supplier keys, the Stripe secret, the Supabase service-role key, and the CRM webhook are server-only environment variables. Only publishable keys are exposed to the browser.",
      },
      {
        heading: "CRM hand-off that never blocks signup",
        body: "The GoHighLevel call is a best-effort server action: failures are logged and swallowed so a CRM outage can never stop a customer from creating an account.",
      },
    ],
    stack: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Supabase (Postgres + Auth)", "Zustand", "Zod", "Fabric.js", "Vercel"],
    integrations: [
      { name: "4over API", use: "Catalog, pricing, shipping, order submission, and status sync" },
      { name: "Stripe", use: "Checkout and payment webhooks" },
      { name: "Supabase", use: "Database, authentication, and Row Level Security" },
      { name: "GoHighLevel", use: "New customers sent to the client's CRM workflow" },
    ],
    notes: [
      "The project started from a v0.app scaffold; the supplier integration, checkout, admin, and database work were built on top of it.",
    ],
  },
  {
    slug: "ihes-alumni-association",
    title: "IHES Alumni Association",
    engagement: "Alumni association platform",
    oneLiner:
      "A multi-school alumni platform with events, payments, messaging, and an AI assistant that answers from live data.",
    summary:
      "React + Express + PostgreSQL platform with tenant isolation enforced by Row Level Security, PayMongo registration fees, real-time messaging, QR event check-in, and an OpenAI assistant that uses tool calls to read live events and jobs.",
    cover: {
      src: "/work/ihes-home.jpg",
      alt: "IHES Alumni Association homepage",
    },
    shots: [
      {
        src: "/work/ihes-home.jpg",
        alt: "IHES Alumni Association public homepage",
        caption: "Public homepage",
      },
      {
        src: "/work/ihes-events.jpg",
        alt: "Alumni events page",
        caption: "Events",
      },
      {
        src: "/projects/alumni.png",
        alt: "Alumni portal screen",
        caption: "Alumni portal",
      },
    ],
    links: [
      { label: "Live site", href: "https://alumni-six-wine.vercel.app/" },
      { label: "Source code", href: githubRepo("Alumni") },
    ],
    overview: [
      "The IHES Alumni Association platform gives former students one place to register, find classmates by batch, RSVP to events, browse job postings, message each other, and support the association through its shop and sponsorships.",
      "It is built so more than one school can run on the same deployment, each on its own subdomain with its own data.",
    ],
    problem: [
      "The association needed membership registration with fees, event RSVPs and check-in, job postings, and member messaging in one system, with paid status confirmed reliably rather than by hand.",
      "Supporting multiple schools on one system raised a hard requirement: one school must never see another school's alumni, events, or messages.",
    ],
    contributions: [
      "Built the Express REST API (auth, alumni directory, batches, events, registrations, jobs, groups, messages, notifications, shop, sponsors, officers, projects, and admin routes) and the React frontend with 50+ pages.",
      "Designed the PostgreSQL schema and multi-tenancy: tenants resolved per request from the subdomain, with Row Level Security policies and a restricted database role so isolation is enforced by the database, not just the app.",
      "Integrated PayMongo for registration and renewal fees, including webhook handling.",
      "Built the AI assistant with OpenAI function calling, scoped to the portal with explicit safety rules, and a fallback reply when no API key is configured.",
      "Added Socket.io real-time chat and notifications, and QR code alumni IDs with camera-based event check-in.",
      "Wrote Jest + Supertest test files covering each route, the payment webhook, tenant isolation, and the AI module.",
    ],
    implementation: [
      {
        heading: "Isolation in the database",
        body: "Every row belongs to a school. The app connects as a restricted Postgres role rather than a superuser, because superusers bypass Row Level Security. A dedicated test checks that one tenant cannot read another's data.",
      },
      {
        heading: "An assistant grounded in real data",
        body: "Instead of guessing, the assistant calls tools such as upcoming events and open jobs, which query the database. Its system prompt limits it to portal questions and tells it never to handle passwords or one-time codes.",
      },
      {
        heading: "Payments across origins",
        body: "Checkout redirects are built from a configured frontend URL, so payments work when the frontend and API are hosted separately. Paid status is confirmed by the PayMongo webhook, not the browser redirect.",
      },
    ],
    stack: ["React 19", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Socket.io", "JWT", "Jest", "Supertest", "Vercel"],
    integrations: [
      { name: "OpenAI API", use: "Portal assistant with function calling over live data" },
      { name: "PayMongo", use: "Registration and renewal fees (card, GCash, Maya, QR Ph)" },
    ],
  },
  {
    slug: "petcoverage-pulse",
    title: "PetCoverage Pulse",
    engagement: "Technical assessment for PetCoverage",
    oneLiner:
      "A take-home assessment: debug, redesign, secure, and extend a real-time anonymous chat and video app.",
    summary:
      "Fixed the bugs that stopped two users from connecting, redesigned the interface, closed session-spoofing and signaling holes in the API, and shipped a new feature to Vercel.",
    cover: {
      src: "/work/pulse-home.jpg",
      alt: "Pulse entry screen",
    },
    shots: [
      {
        src: "/work/pulse-home.jpg",
        alt: "Pulse entry screen after the redesign",
        caption: "Redesigned entry screen",
      },
    ],
    links: [
      { label: "Live app", href: "https://pulse-technical-assessment-livid.vercel.app/" },
      { label: "Source code", href: githubRepo("pulse-technical-assessment") },
    ],
    overview: [
      "Pulse shows every online user as a dot on a world map. Tapping a dot sends a connection request; once accepted, the two people can text chat and start a video call. There are no accounts and nothing is stored after a session ends.",
      "PetCoverage provided a partly broken codebase and four phases: make it run, make it good, make it secure, and make it better. Chat and video run peer-to-peer over WebRTC; only presence and signaling go through the server.",
    ],
    problem: [
      "The app did not work end to end: dots stayed on the map after users left, chat and ICE signaling failed, and connections could get stuck.",
      "The API trusted whatever session ID a client sent, so anyone could impersonate another user or inject signaling into someone else's call.",
    ],
    contributions: [
      "Phase 1: fixed a heartbeat bug that kept every session alive, a chat data-channel type mismatch, and ICE candidates arriving before the remote description. Added atomic connection claiming, timeouts, and leave cleanup.",
      "Corrected the privacy offset with a great-circle calculation so dots stay 1–3 km from the user at high latitudes and across the date line.",
      "Phase 2: redesigned the entry screen, map, prompts, chat, and video UI with accessible labels, visible focus states, and reduced-motion support.",
      "Phase 3: replaced client-chosen session IDs with server-generated IDs and one-time tokens stored only as hashes; bounded request sizes; validated SDP/ICE payloads; restricted signaling to the active peer pair.",
      "Phase 4: added optional conversation prompts that stay in the browser and go into the composer for editing before sending.",
      "Deployed to Vercel with Supabase Postgres, switching to the transaction pooler after the direct host proved unreachable from Vercel.",
    ],
    implementation: [
      {
        heading: "Signaling without websockets",
        body: "Vercel serverless functions can't hold websockets, so presence and the WebRTC offer/answer/ICE exchange go through Postgres via Prisma and short HTTP polling. Media and chat never touch the server.",
      },
      {
        heading: "Security priorities",
        body: "Session spoofing was fixed first because it allowed impersonation and call interference. Input bounds, payload validation, and peer-pair checks followed. Remaining dev-only audit findings were documented rather than force-fixed with an incompatible downgrade.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "WebRTC", "Mapbox GL JS", "Tailwind CSS", "Vercel"],
    integrations: [
      { name: "Mapbox GL JS", use: "Live world map of online users" },
      { name: "Supabase", use: "Postgres for transient presence and signaling" },
    ],
    notes: [
      "This was a take-home assessment built on a codebase PetCoverage provided. The original app design and requirements are theirs; the fixes, redesign, security work, and new feature are mine, documented in NOTES.md in the repository.",
      "Connections use STUN only (no TURN), as specified, so very restrictive networks may not connect.",
    ],
  },
];

export type ProjectSummary = {
  name: string;
  description: string;
  tech: string[];
  image?: string;
  live?: string;
  repo?: string;
};

/** Smaller projects. Live links were checked and only working ones are listed. */
export const otherProjects: ProjectSummary[] = [
  {
    name: "WonnaLearn",
    description: "A review platform where education students sign in to study and track learning materials.",
    tech: ["TypeScript"],
    image: "/projects/wonnalearn.png",
    live: "https://wonnalearn.site",
    repo: githubRepo("beed-review"),
  },
  {
    name: "Stratford International School",
    description: "School website covering academics, admissions, news, faculty, and student and parent portals.",
    tech: ["JavaScript"],
    image: "/projects/sis.png",
    live: "https://stratfordgensan.vercel.app",
    repo: githubRepo("sis"),
  },
  {
    name: "IHES Journal",
    description: "A school publication site for articles, student accomplishments, events, and announcements.",
    tech: ["JavaScript"],
    image: "/projects/NewsLetter.png",
    live: "https://isidro-hulom.vercel.app/",
    repo: githubRepo("NewsLetter"),
  },
  {
    name: "APEX",
    description: "An online storefront for a General Santos City hat brand and its cap collections.",
    tech: ["TypeScript"],
    image: "/projects/apex.png",
    live: "https://apex-iota-lac.vercel.app",
    repo: githubRepo("APEX"),
  },
  {
    name: "SIS E-BOTO 2025",
    description: "Voter sign-in portal for a school's online student election.",
    tech: ["TypeScript"],
    live: "https://voting-five-phi.vercel.app",
    repo: githubRepo("voting"),
  },
  {
    name: "Cheljor Foodstation",
    description: "Food-ordering storefront with menu categories and a shopping cart.",
    tech: ["JavaScript"],
    image: "/projects/cheljor-foodstation.png",
    live: "https://cheljor-foodstation.vercel.app",
    repo: githubRepo("cheljor-foodstation"),
  },
  {
    name: "S'NILS Scents",
    description: "Storefront for a handcrafted perfume brand.",
    tech: ["SCSS", "JavaScript"],
    image: "/projects/snilscents.png",
    live: "https://snilscents.vercel.app",
    repo: githubRepo("snilscents"),
  },
  {
    name: "BIG-C Foodhouse",
    description: "Restaurant website presenting the menu and local food offerings.",
    tech: ["JavaScript"],
    image: "/projects/Bigc.png",
    live: "https://bigc-seven.vercel.app",
    repo: githubRepo("Bigc"),
  },
  {
    name: "GM Apartelle",
    description: "Booking website for an apartelle in Maasim, Sarangani, with rooms and availability search.",
    tech: ["TypeScript"],
    image: "/projects/gm-apartelle.png",
    repo: githubRepo("gm-apartelle"),
  },
  {
    name: "OFW Clinic SOCSARGEN",
    description: "Clinic website for overseas workers with services, packages, doctors, and appointment booking.",
    tech: ["JavaScript"],
    image: "/projects/ofw-socsargen.png",
    repo: githubRepo("ofw-socsargen"),
  },
  {
    name: "Barangay Health Center",
    description: "Patient records, appointments with SMS reminders, immunizations, and health analytics.",
    tech: ["Laravel", "PHP"],
    image: "/projects/bhs.png",
    repo: githubRepo("BarangayHealthCenter"),
  },
  {
    name: "Pharmacy Management",
    description: "Medicine stock, transactions, and reporting for a pharmacy.",
    tech: ["PHP", "MySQL"],
    repo: githubRepo("pharmacy"),
  },
  {
    name: "Inventory & Sales System",
    description: "Products, categories, daily sales, users, and repair records.",
    tech: ["PHP", "MySQL"],
    repo: githubRepo("Inventory-system"),
  },
  {
    name: "Capstone Archive",
    description: "Searchable archive of approved capstone projects by department, program, and term.",
    tech: ["PHP"],
    image: "/projects/Archive.png",
    repo: githubRepo("Archive"),
  },
  {
    name: "E-Boto",
    description: "Election dashboard for registering voters and candidates and tallying results.",
    tech: ["PHP"],
    image: "/projects/E-boto.png",
    repo: githubRepo("E-boto"),
  },
  {
    name: "Z Pickle Hub",
    description: "Pickleball court availability and slot booking.",
    tech: ["PHP"],
    repo: githubRepo("zhub"),
  },
];

/** Distinct third-party services integrated across the case studies. */
export const integrationNames = Array.from(
  new Set(caseStudies.flatMap((c) => c.integrations.map((i) => i.name))),
);

/**
 * Portfolio statistics, derived from the data above so they can never drift
 * out of sync with what is actually shown on the page.
 */
export const stats = {
  projects: caseStudies.length + otherProjects.length,
  live:
    caseStudies.filter((c) => c.links.some((l) => l.label !== "Source code")).length +
    otherProjects.filter((p) => p.live).length,
  integrations: integrationNames.length,
};

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
