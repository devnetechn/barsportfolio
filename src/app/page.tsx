import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { profile, siteUrl } from "@/lib/site";
import { caseStudies } from "@/data/projects";

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
    "API integration",
    "AI-assisted business automation",
    "Backend and database development",
    "Lead generation systems",
  ],
  sameAs: [profile.github],
  subjectOf: caseStudies.map((c) => ({
    "@type": "CreativeWork",
    name: c.title,
    url: `${siteUrl}/work/${c.slug}`,
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
      <Services />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
