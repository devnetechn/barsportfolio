import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Everesto Cabasag | Full-Stack Developer",
    template: "%s | Everesto Cabasag",
  },
  description:
    "Everesto Cabasag is a full-stack web developer in the Philippines who builds modern web applications, responsive websites, and API integrations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/",
    siteName: "Everesto Cabasag",
    title: "Everesto Cabasag | Full-Stack Developer",
    description:
      "Explore the portfolio, web development projects, and services of Everesto Cabasag, a full-stack developer based in the Philippines.",
  },
  twitter: {
    card: "summary",
    title: "Everesto Cabasag | Full-Stack Developer",
    description:
      "Full-stack web developer in the Philippines building modern websites, web applications, and API integrations.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <CursorGlow />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
