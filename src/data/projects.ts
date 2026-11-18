/**
 * Curated project data. This file is the single source of truth for the work
 * grid, the case-study pages, the resume, the sitemap and the structured data.
 *
 * Every claim here must trace to the project's public repository
 * (github.com/devnetechn) or its live deployment. Do not add metrics, client
 * names or features that cannot be pointed to.
 *
 * To add a project: append an entry to `projects`. Give it at least one
 * category, a status, a cover image in /public/work (1440×900 works best) and,
 * for the case study page, an overview and a list of contributions.
 */

export const GITHUB_USER = "devnetechn";
export const githubRepo = (repo: string) => `https://github.com/${GITHUB_USER}/${repo}`;

export const categories = [
  "Web Applications",
  "Business Websites",
  "API Integrations",
  "AI & Automation",
] as const;
export type Category = (typeof categories)[number];

/**
 * Live: deployed and publicly running as the real thing (not a demo).
 * Client work: built for a paying client.
 * Prototype: working, deployed early version.
 * Concept: proposal or design direction, not adopted by the subject.
 * Technical assessment: take-home task for a hiring process.
 */
export type Status = "Live" | "Client work" | "Prototype" | "Concept" | "Technical assessment";

export type Shot = { src: string; alt: string; caption?: string };
export type LinkItem = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  status: Status;
  categories: Category[];
  /** How the work came about, kept factual. */
  engagement: string;
  /** One sentence for cards and meta descriptions. */
  oneLiner: string;
  /** Two or three sentences for the featured slot and case-study intro. */
  summary: string;
  cover: Shot;
  shots: Shot[];
  live?: LinkItem;
  links: LinkItem[];
  overview: string[];
  problem: string[];
  contributions: string[];
  implementation: { heading: string; body: string }[];
  stack: string[];
  integrations: { name: string; use: string }[];
  /** Honest caveats shown on the case-study page. */
  notes?: string[];
};

export const projects: Project[] = [
  {
    slug: "randys-painting-drywall",
    title: "Randy's Painting & Drywall",
    status: "Client work",
    categories: ["Business Websites", "API Integrations", "AI & Automation"],
    engagement: "Freelance client project",
    oneLiner:
      "Website, online booking and an AI-assisted lead pipeline for a painting and drywall contractor in Pennsylvania.",
    summary:
      "A marketing site, estimate booking, live chat and an admin CRM where a Claude-powered agent reviews each lead and decides whether to email the customer, text the owner or sync the calendar.",
    cover: { src: "/work/randy-php-home.jpg", alt: "Homepage of the Randy's Painting & Drywall website" },
    shots: [
      { src: "/work/randy-php-home.jpg", alt: "Homepage of the PHP build with services and estimate call to action", caption: "Marketing homepage, PHP build" },
      { src: "/work/randy-php-book.jpg", alt: "Online estimate booking page", caption: "Estimate booking flow" },
      { src: "/work/randy-home.jpg", alt: "Production website at randyspaintdrywall.com", caption: "Production site, randyspaintdrywall.com" },
    ],
    live: { label: "Visit live site", href: "https://www.randyspaintdrywall.com/" },
    links: [
      { label: "PHP build demo", href: "https://midnightblue-rat-608891.hostingersite.com/" },
      { label: "Source code", href: githubRepo("randy_project") },
    ],
    overview: [
      "Randy's Painting & Drywall is a residential and commercial painting and drywall contractor serving the Lehigh Valley and Bucks County, Pennsylvania.",
      "The project grew from a marketing website into the tool the business runs on: customers book estimates and chat online, and the owner manages bookings, leads, job applicants, reviews, gallery photos and reports from one admin dashboard.",
    ],
    problem: [
      "Leads arrive through bookings and chat. Follow-up was automated only by a fixed timer that re-emailed a lead 24 hours after last contact, so nothing judged whether a lead actually needed a nudge, an owner alert, or nothing at all.",
      "The site also had to run on low-cost shared hosting (Hostinger) without a Node runtime or a build step, so the stack had to stay simple to operate.",
    ],
    contributions: [
      "Rewrote the original React + Node app as plain PHP 8, MySQL and vanilla JavaScript so it runs on stock Apache shared hosting with no build step.",
      "Built customer accounts, estimate booking with status tracking, and an admin workflow to confirm, decline, reschedule and complete appointments.",
      "Built a lead pipeline (new, contacted, quoted, won or lost) with stage-change emails and scheduled follow-ups via cron.",
      "Designed and built the CRM agent: a SQL pre-filter selects leads that need attention, then Claude chooses one action from a fixed list, executed through the same functions the admin uses and written to an audit log.",
      "Integrated Twilio SMS owner alerts, Google Calendar sync, Gmail SMTP notifications and a Gemini-powered chat assistant with a rule-based fallback.",
      "Added a blog, a careers page with job applications and resume uploads, location landing pages for local SEO, UTM and ad-click lead attribution, and booking reports with PDF export.",
    ],
    implementation: [
      { heading: "Bounded AI decisions", body: "The agent never writes free text into the system. Claude must return strict JSON with an action from a fixed enum (update stage, send email, alert owner by SMS, sync calendar, or no action). Anything that fails validation is logged and ignored. A kill switch and a per-run cap keep it safe to run unattended." },
      { heading: "Cheap pre-filter, then the model", body: "A deterministic SQL query narrows leads to those never contacted or stale for their stage, so the API is only called when a decision is actually needed. The agent runs on a cron sweep and inline right after a booking or stage change." },
      { heading: "Dependency-free integrations", body: "Twilio, Google Calendar, Gemini and Anthropic are called with cURL. Google Calendar auth signs a service-account JWT with OpenSSL instead of pulling in Google's client library. Every side effect is best-effort and never throws, so a failed SMS or calendar call cannot break a booking." },
      { heading: "Real-time without websockets", body: "Live chat uses short AJAX polling, so it works on shared hosting. Guests talk to the assistant first and can hand off to a human, who replies from the admin chat queue." },
    ],
    stack: ["PHP 8", "MySQL / MariaDB (PDO)", "Vanilla JavaScript", "CSS", "Apache", "Cron", "Hostinger"],
    integrations: [
      { name: "Anthropic Claude API", use: "CRM agent that decides the next action for each lead" },
      { name: "Google Gemini API", use: "Website chat assistant" },
      { name: "Twilio", use: "SMS alerts to the owner for new bookings and cold leads" },
      { name: "Google Calendar API", use: "Appointments synced to the owner's calendar" },
      { name: "Gmail SMTP", use: "Booking, stage-change, follow-up and applicant emails" },
    ],
    notes: [
      "The production domain currently serves a separate React build. The PHP rewrite described here is linked as the PHP build demo, and its source is public.",
    ],
  },
  {
    slug: "web2print",
    title: "Web2Print USA",
    status: "Client work",
    categories: ["API Integrations", "Web Applications"],
    engagement: "Freelance client project",
    oneLiner:
      "A print and custom-apparel storefront connected to a wholesale print supplier, with Stripe checkout and an admin back office.",
    summary:
      "A Next.js storefront that pulls products and pricing from the 4over print API, applies per-category markup, takes payment through Stripe and hands new customers to the client's GoHighLevel CRM.",
    cover: { src: "/work/web2print-home.jpg", alt: "Web2Print storefront homepage" },
    shots: [
      { src: "/work/web2print-home.jpg", alt: "Web2Print storefront homepage", caption: "Storefront homepage" },
      { src: "/work/web2print-print.jpg", alt: "Print product catalog page", caption: "Print catalog driven by 4over data" },
      { src: "/work/web2print-studio.jpg", alt: "Browser-based design studio", caption: "Design studio" },
    ],
    live: { label: "Visit live site", href: "https://web2print-clone-3pnr.vercel.app/" },
    links: [{ label: "Source code", href: githubRepo("web2print-clone") }],
    overview: [
      "Web2Print sells printed products (business cards, flyers, banners, signs, stickers) and custom apparel. Fulfilment is handled by 4over, a wholesale trade printer, so the storefront resells 4over's catalog at retail prices.",
      "The project covers the customer storefront, cart and checkout, a browser design studio, quote requests, and an admin back office for orders, customers, products, coupons and reports.",
    ],
    problem: [
      "4over's catalog is large and its pricing depends on many product options. A hand-maintained product list drifts out of sync with the supplier, and wholesale prices need a consistent markup before they reach customers.",
      "Orders then had to flow back to 4over for production, and new customers needed to reach the client's CRM without manual data entry.",
    ],
    contributions: [
      "Built the 4over integration: API client, catalog and price sync into the database, product option parsing, category mapping, shipping quotes, order submission and status sync.",
      "Implemented per-category markup that turns wholesale prices into retail prices, adjustable from the admin dashboard.",
      "Built Stripe checkout with a signature-verified webhook that marks orders paid and logs status changes.",
      "Built the admin back office: orders (including unpaid, archive, invoices and payment requests), customers, products and product content, coupons, quotes, reports and 4over sync tools.",
      "Wired new-customer signups to the client's GoHighLevel CRM through an inbound webhook.",
      "Wrote the SQL migrations, including the apparel catalog schema, Row Level Security policies and a security-hardening pass.",
    ],
    implementation: [
      { heading: "Supplier catalog as data", body: "Rather than hard-coding products, the app syncs 4over categories, products, options and base prices into Postgres and builds the catalog pages from that data. Admins can re-run the sync and adjust markups without a deploy." },
      { heading: "Payments that can't be spoofed", body: "The Stripe webhook verifies the request signature before trusting it. Because Stripe's server-to-server call carries no user session, the handler uses a server-only admin client for the update and treats the signature as the auth boundary." },
      { heading: "Secrets stay on the server", body: "Supplier keys, the Stripe secret, the Supabase service-role key and the CRM webhook are server-only environment variables. Only publishable keys reach the browser." },
      { heading: "CRM hand-off that never blocks signup", body: "The GoHighLevel call is a best-effort server action: failures are logged and swallowed, so a CRM outage can never stop a customer from creating an account." },
    ],
    stack: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Supabase (Postgres + Auth)", "Zustand", "Zod", "Fabric.js", "Vercel"],
    integrations: [
      { name: "4over API", use: "Catalog, pricing, shipping, order submission and status sync" },
      { name: "Stripe", use: "Checkout and payment webhooks" },
      { name: "Supabase", use: "Database, authentication and Row Level Security" },
      { name: "GoHighLevel", use: "New customers sent to the client's CRM workflow" },
    ],
    notes: [
      "The project started from a v0.app scaffold; the supplier integration, checkout, admin and database work were built on top of it.",
    ],
  },
  {
    slug: "ihesaa",
    title: "IHES Alumni Association",
    status: "Live",
    categories: ["Web Applications"],
    engagement: "Production platform for an alumni association",
    oneLiner:
      "The live home of the IHES Alumni Association: batch pages, an alumni directory, events, announcements and member sign-up.",
    summary:
      "A server-rendered PHP platform where every graduating class has its own page and a private space only that batch can enter, while events, stories and the public directory are shared by everyone.",
    cover: { src: "/work/ihesaa-home.jpg", alt: "Homepage of ihesaa.com" },
    shots: [
      { src: "/work/ihesaa-home.jpg", alt: "IHES Alumni Association homepage", caption: "Public homepage" },
      { src: "/work/ihesaa-batches.jpg", alt: "List of graduating batches", caption: "Batches, one page per graduating class" },
      { src: "/work/ihesaa-events.jpg", alt: "Association events listing", caption: "Events" },
    ],
    live: { label: "Visit ihesaa.com", href: "https://ihesaa.com/" },
    links: [],
    overview: [
      "ihesaa.com is the public platform of the alumni association of Isidro Hulom Elementary School. It brings former students together by graduating class and gives the association one place to publish events, announcements, projects and stories.",
      "The site covers an about page, alumni directory, batch pages, alumni stories, events and news, a shop, a gallery, officers, careers, sponsorship, contact, registration and sign-in.",
    ],
    problem: [
      "An association spanning more than forty graduating classes needs each batch to organise itself, with its own president and members, without losing the shared identity of the whole association.",
      "Membership has to be approved by people who actually know the members, so a public sign-up form alone is not enough.",
    ],
    contributions: [
      "Built the public site and member area on PHP 8.3, with session-based sign-in and CSRF protection on forms.",
      "Built batch pages for every graduating class, with private batch spaces and membership approved by each batch president.",
      "Built the alumni directory, events, announcements, alumni projects, stories, gallery, officers, careers, shop and sponsor pages.",
    ],
    implementation: [
      { heading: "Batches as the unit of trust", body: "Each graduating class is its own space with a president who approves members. Public pages show what the whole association shares; batch spaces stay private to that class." },
      { heading: "Server-rendered and hardened", body: "Pages render on the server in PHP, sessions use secure, HttpOnly, SameSite cookies, and forms carry a CSRF token, which keeps the site fast and simple to host." },
    ],
    stack: ["PHP 8.3", "Server-rendered HTML", "Tailwind CSS", "LiteSpeed"],
    integrations: [],
    notes: [
      "The source for this production build is not public. The stack listed here is what the live site itself shows. An earlier React and Express build of the same platform is described separately.",
    ],
  },
  {
    slug: "wonnalearn",
    title: "WonnaLearn",
    status: "Prototype",
    categories: ["AI & Automation", "Web Applications"],
    engagement: "Independent product",
    oneLiner:
      "An AI study companion for education students preparing for the Licensure Examination for Teachers (LET).",
    summary:
      "Students find legally accessible study resources, save them to a library and study from them with AI summaries, generated quizzes and a tutor that refuses anything outside their course.",
    cover: { src: "/work/wonnalearn-login.jpg", alt: "WonnaLearn sign-in screen" },
    shots: [{ src: "/work/wonnalearn-login.jpg", alt: "WonnaLearn sign-in screen with email and Google sign-in", caption: "Sign-in, email and Google" }],
    live: { label: "Visit wonnalearn.site", href: "https://wonnalearn.site/" },
    links: [{ label: "Source code", href: githubRepo("beed-review") }],
    overview: [
      "WonnaLearn helps BEEd and LET reviewees discover open educational resources, open-access and public-domain material on the web, organise them in a personal library, and study from them.",
      "It is a mobile-first Next.js app with a bottom navigation for Home, Search, Library, Quiz and Tutor, installable as a PWA, built in phases that are each written up as a design spec in the repository.",
    ],
    problem: [
      "Review material for the LET is scattered, and much of what circulates has unclear licensing. Students need material they are allowed to use, and help studying it.",
      "A general chatbot will happily answer anything, which is the wrong tool for exam prep: the tutor has to stay inside the student's course and never be talked out of its rules.",
    ],
    contributions: [
      "Designed the product in five phases (scaffold and auth, AI research, AI study tools, quiz engine, PWA) and wrote a design spec and implementation plan for each.",
      "Built Supabase auth with email and Google sign-in, onboarding by course and major, and a schema with Row Level Security.",
      "Built AI research that finds resources and labels each one by license status, from open license to copyrighted or not recommended.",
      "Built AI summaries, quiz generation from saved resources at easy to extreme difficulty, weak-topic tracking, badges and an extreme quiz mode.",
      "Built a course-scoped tutor and library uploads that extract text from documents for quizzing.",
    ],
    implementation: [
      { heading: "Structured outputs everywhere", body: "Every OpenAI call uses a strict JSON schema, and responses are validated again with Zod before anything is saved, so a quiz always has four choices and one correct answer that matches a choice exactly." },
      { heading: "The app decides what the student sees", body: "The tutor first classifies each message (course-related, trivia, out of course, unsafe, or prompt injection). For every category except course-related, the reply comes from fixed application text, not from the model, so no refused content ever reaches the student or their history." },
      { heading: "Licensing as data", body: "Researched resources carry a license, a license status and the evidence for it, so the library can tell students what they may use instead of hiding the question." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Zod", "PWA"],
    integrations: [
      { name: "OpenAI API", use: "Resource research, summaries, quiz generation and the course tutor" },
      { name: "Supabase", use: "Auth (email and Google), Postgres and Row Level Security" },
    ],
    notes: ["The app requires an account, so the screenshot shows the sign-in screen."],
  },
  {
    slug: "petcoverage-pulse",
    title: "PetCoverage Pulse",
    status: "Technical assessment",
    categories: ["Web Applications", "API Integrations"],
    engagement: "Technical assessment for PetCoverage",
    oneLiner:
      "A take-home assessment: debug, redesign, secure and extend a real-time anonymous chat and video app.",
    summary:
      "Fixed the bugs that stopped two users from connecting, redesigned the interface, closed session-spoofing and signaling holes in the API, and shipped a new feature to Vercel.",
    cover: { src: "/work/pulse-home.jpg", alt: "Pulse entry screen" },
    shots: [{ src: "/work/pulse-home.jpg", alt: "Pulse entry screen after the redesign", caption: "Redesigned entry screen" }],
    live: { label: "Open live app", href: "https://pulse-technical-assessment-livid.vercel.app/" },
    links: [{ label: "Source code", href: githubRepo("pulse-technical-assessment") }],
    overview: [
      "Pulse shows every online user as a dot on a world map. Tapping a dot sends a connection request; once accepted, the two people can text chat and start a video call. There are no accounts and nothing is stored after a session ends.",
      "PetCoverage provided a partly broken codebase and four phases: make it run, make it good, make it secure and make it better. Chat and video run peer-to-peer over WebRTC; only presence and signaling go through the server.",
    ],
    problem: [
      "The app did not work end to end: dots stayed on the map after users left, chat and ICE signaling failed, and connections could get stuck.",
      "The API trusted whatever session ID a client sent, so anyone could impersonate another user or inject signaling into someone else's call.",
    ],
    contributions: [
      "Phase 1: fixed a heartbeat bug that kept every session alive, a chat data-channel type mismatch, and ICE candidates arriving before the remote description. Added atomic connection claiming, timeouts and leave cleanup.",
      "Corrected the privacy offset with a great-circle calculation so dots stay 1 to 3 km from the user at high latitudes and across the date line.",
      "Phase 2: redesigned the entry screen, map, prompts, chat and video UI with accessible labels, visible focus states and reduced-motion support.",
      "Phase 3: replaced client-chosen session IDs with server-generated IDs and one-time tokens stored only as hashes; bounded request sizes; validated SDP and ICE payloads; restricted signaling to the active peer pair.",
      "Phase 4: added optional conversation prompts that stay in the browser and go into the composer for editing before sending.",
      "Deployed to Vercel with Supabase Postgres, switching to the transaction pooler after the direct host proved unreachable from Vercel.",
    ],
    implementation: [
      { heading: "Signaling without websockets", body: "Vercel serverless functions can't hold websockets, so presence and the WebRTC offer, answer and ICE exchange go through Postgres via Prisma and short HTTP polling. Media and chat never touch the server." },
      { heading: "Security priorities", body: "Session spoofing was fixed first because it allowed impersonation and call interference. Input bounds, payload validation and peer-pair checks followed. Remaining dev-only audit findings were documented rather than force-fixed with an incompatible downgrade." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "WebRTC", "Mapbox GL JS", "Tailwind CSS", "Vercel"],
    integrations: [
      { name: "Mapbox GL JS", use: "Live world map of online users" },
      { name: "Supabase", use: "Postgres for transient presence and signaling" },
    ],
    notes: [
      "This was a take-home assessment built on a codebase PetCoverage provided. The original app design and requirements are theirs; the fixes, redesign, security work and new feature are mine, documented in NOTES.md in the repository.",
      "Connections use STUN only (no TURN), as specified, so very restrictive networks may not connect.",
    ],
  },
  {
    slug: "ihes-alumni-association",
    title: "Alumni Platform, React + Express build",
    status: "Prototype",
    categories: ["Web Applications", "API Integrations", "AI & Automation"],
    engagement: "Earlier build of the alumni platform",
    oneLiner:
      "A multi-school alumni platform with events, payments, messaging and an AI assistant that answers from live data.",
    summary:
      "React, Express and PostgreSQL with tenant isolation enforced by Row Level Security, PayMongo registration fees, real-time messaging, QR event check-in and an OpenAI assistant that uses tool calls to read live events and jobs.",
    cover: { src: "/work/ihes-home.jpg", alt: "Alumni platform homepage, React build" },
    shots: [
      { src: "/work/ihes-home.jpg", alt: "Alumni platform public homepage", caption: "Public homepage" },
      { src: "/work/ihes-events.jpg", alt: "Alumni events page", caption: "Events" },
      { src: "/projects/alumni.png", alt: "Alumni portal screen", caption: "Alumni portal" },
    ],
    live: { label: "Open live demo", href: "https://alumni-six-wine.vercel.app/" },
    links: [{ label: "Source code", href: githubRepo("Alumni") }],
    overview: [
      "This build gives former students one place to register, find classmates by batch, RSVP to events, browse job postings, message each other and support the association through its shop and sponsorships.",
      "It is built so more than one school can run on the same deployment, each on its own subdomain with its own data.",
    ],
    problem: [
      "The association needed membership registration with fees, event RSVPs and check-in, job postings and member messaging in one system, with paid status confirmed reliably rather than by hand.",
      "Supporting several schools on one system raised a hard requirement: one school must never see another school's alumni, events or messages.",
    ],
    contributions: [
      "Built the Express REST API (auth, alumni directory, batches, events, registrations, jobs, groups, messages, notifications, shop, sponsors, officers, projects and admin routes) and the React frontend with 50+ pages.",
      "Designed the PostgreSQL schema and multi-tenancy: tenants resolved per request from the subdomain, with Row Level Security policies and a restricted database role so isolation is enforced by the database, not just the app.",
      "Integrated PayMongo for registration and renewal fees, including webhook handling.",
      "Built the AI assistant with OpenAI function calling, scoped to the portal with explicit safety rules, and a fallback reply when no API key is configured.",
      "Added Socket.io real-time chat and notifications, and QR code alumni IDs with camera-based event check-in.",
      "Wrote Jest and Supertest test files covering each route, the payment webhook, tenant isolation and the AI module.",
    ],
    implementation: [
      { heading: "Isolation in the database", body: "Every row belongs to a school. The app connects as a restricted Postgres role rather than a superuser, because superusers bypass Row Level Security. A dedicated test checks that one tenant cannot read another's data." },
      { heading: "An assistant grounded in real data", body: "Instead of guessing, the assistant calls tools such as upcoming events and open jobs, which query the database. Its system prompt limits it to portal questions and tells it never to handle passwords or one-time codes." },
      { heading: "Payments across origins", body: "Checkout redirects are built from a configured frontend URL, so payments work when the frontend and API are hosted separately. Paid status is confirmed by the PayMongo webhook, not the browser redirect." },
    ],
    stack: ["React 19", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Socket.io", "JWT", "Jest", "Supertest", "Vercel"],
    integrations: [
      { name: "OpenAI API", use: "Portal assistant with function calling over live data" },
      { name: "PayMongo", use: "Registration and renewal fees (card, GCash, Maya, QR Ph)" },
    ],
  },
  {
    slug: "sis-e-boto",
    title: "SIS E-BOTO",
    status: "Live",
    categories: ["Web Applications"],
    engagement: "Student election system for Stratford International School",
    oneLiner:
      "A student government voting system with student sign-in, controlled voting sessions and election results.",
    summary:
      "Built first in PHP and MySQL with its own MVC core, then rebuilt in Next.js for the 2025 election with role-protected dashboards and vote receipts.",
    cover: { src: "/work/eboto-dashboard.jpg", alt: "E-BOTO admin dashboard with turnout and results charts" },
    shots: [
      { src: "/work/eboto-dashboard.jpg", alt: "Admin dashboard of the PHP build with turnout and results charts", caption: "Admin dashboard, PHP build (test data)" },
      { src: "/work/eboto-login.jpg", alt: "SIS E-BOTO 2025 sign-in screen with School ID and password", caption: "Student sign-in, 2025 Next.js build" },
    ],
    live: { label: "Open live app", href: "https://voting-five-phi.vercel.app/" },
    links: [
      { label: "PHP source", href: githubRepo("E-boto") },
      { label: "Next.js source", href: githubRepo("voting") },
    ],
    overview: [
      "SIS E-BOTO runs student government elections. Students sign in with their School ID, see the candidates for their level, cast one ballot and get a receipt; administrators manage voters and candidates, open and close voting, and follow the results.",
      "The original version is PHP and MySQL. The 2025 edition is a Next.js front end with middleware-protected admin and student areas.",
    ],
    problem: [
      "A school election needs every student to vote once and only once, only while voting is open, and an administration that can see turnout and results without counting paper.",
    ],
    contributions: [
      "Wrote a small MVC framework in PHP (router, controllers, models, views) on a PDO singleton with prepared statements and real prepared-statement mode.",
      "Built voter and candidate management, bulk voter upload, a voting session switch that opens and closes the ballot, an already-voted guard, live results, reports, a hall of fame and an activity log.",
      "Rebuilt the voting front end in Next.js for 2025: JWT cookie sessions, middleware that redirects unauthenticated users away from admin and student areas, level-specific candidate lists, downloadable vote receipts and admin analytics.",
    ],
    implementation: [
      { heading: "One switch for the ballot", body: "Voting is gated by a single session record that administrators start and end, so the ballot cannot be submitted before or after the window the school sets." },
      { heading: "Tokens stay server-side", body: "In the Next.js build the browser never sends its token to the voting API directly. Route handlers read the HttpOnly cookie and forward the vote with a bearer token, so the API base and credentials stay on the server." },
    ],
    stack: ["PHP 8", "MySQL (PDO)", "Bootstrap", "Next.js", "React", "TypeScript", "Tailwind CSS", "JWT (jose)"],
    integrations: [],
    notes: [
      "The dashboard screenshot is from the PHP build with test data. The voting API used by the 2025 front end is a separate service.",
    ],
  },
  {
    slug: "maasim-tourism",
    title: "Maasim Tourism",
    status: "Concept",
    categories: ["Business Websites"],
    engagement: "Independent concept",
    oneLiner:
      "A tourism website concept for Maasim, Sarangani: destinations, experiences, culture and a practical travel guide.",
    summary:
      "An editorial Next.js site that marks every destination as verified, partly verified or needing confirmation, so visitors know what to check before they travel.",
    cover: { src: "/work/maasim-home.jpg", alt: "Maasim tourism homepage with a hillside view of Sarangani Bay" },
    shots: [
      { src: "/work/maasim-home.jpg", alt: "Homepage hero with a photo of Sarangani Bay", caption: "Homepage" },
      { src: "/work/maasim-destinations.jpg", alt: "Destinations page with search and category filters", caption: "Destination search and filters" },
      { src: "/work/maasim-guide.jpg", alt: "Travel guide page", caption: "Travel guide" },
    ],
    live: { label: "Visit live site", href: "https://tourismv2-omega.vercel.app/" },
    links: [{ label: "Source code", href: githubRepo("tourismv2") }],
    overview: [
      "A proposed creative direction for promoting Maasim, a coastal town on Sarangani Bay in southern Mindanao. It covers destinations with detail pages and galleries, experiences, culture and food, stories, a travel guide with FAQs, and a site-wide search.",
    ],
    problem: [
      "Information about smaller destinations is often out of date or unconfirmed. A tourism site that presents everything with the same confidence sends visitors to places that may not be open.",
    ],
    contributions: [
      "Designed and built the full site in Next.js, TypeScript and Tailwind CSS: homepage, destination search and filters, destination detail pages with a gallery and lightbox, experiences, culture, stories, travel guide, about, privacy and accessibility pages.",
      "Labelled content by how well it is confirmed (verified, partly verified, needs confirmation; reported in Maasim or travel inspiration) and credited every photo.",
      "Added a sitemap, robots file, canonical URLs and Open Graph tags driven by one site URL setting.",
    ],
    implementation: [
      { heading: "Content as typed data", body: "Destinations, stories, culture and categories live in typed data files, and the pages are generated from them, so adding a place is a data change rather than a new page." },
      { heading: "Honest by design", body: "Verification status is a field on each record and is shown in the interface, and the about page publishes the verification checklist and photo credits." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lucide icons"],
    integrations: [],
    notes: [
      "This is an independent concept. It is not an official website of the Municipal Government of Maasim, and its tagline has not been adopted by the municipality.",
    ],
  },
];

export const featuredProject = projects[0];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Distinct third-party services integrated across the projects. */
export const integrationNames = Array.from(
  new Set(projects.flatMap((p) => p.integrations.map((i) => i.name))),
);

/** Counts derived from the data above, so they cannot drift from what is shown. */
export const stats = {
  projects: projects.length,
  live: projects.filter((p) => p.live).length,
  integrations: integrationNames.length,
};
