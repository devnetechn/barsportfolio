import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { siteUrl } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Everesto Cabasag",
            url: siteUrl,
            jobTitle: "Full-Stack Web Developer",
            description:
              "Full-stack web developer in the Philippines building modern web applications, responsive websites, and API integrations.",
            email: "devnetechn@gmail.com",
            image: `${siteUrl}/projects/bares.png`,
            address: {
              "@type": "PostalAddress",
              addressCountry: "PH",
            },
            knowsAbout: [
              "Full-stack web development",
              "Frontend development",
              "Backend development",
              "Responsive web design",
              "API integration",
            ],
            sameAs: ["https://github.com/devnetechn"],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
