import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Contact from "@/components/Contact";
import { profile, siteUrl } from "@/lib/site";
import { projects } from "@/data/projects";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  description: profile.description,
  email: `mailto:${profile.email}`,
  image: `${siteUrl}${profile.portrait}`,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  knowsAbout: [
    "Full-stack web development",
    "Next.js",
    "React",
    "PHP",
    "API integration",
    "AI integration and automation",
    "Database design",
  ],
  sameAs: [profile.github],
  subjectOf: projects.map((p) => ({
    "@type": "CreativeWork",
    name: p.title,
    url: `${siteUrl}/work/${p.slug}`,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Projects />
      <About />
      <Expertise />
      <Contact />
    </>
  );
}
