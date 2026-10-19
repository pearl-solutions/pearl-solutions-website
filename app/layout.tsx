import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { services, site } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const defaultTitle = "Pearl Solutions · Custom websites, Discord bots, checkout automation and AI";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: "%s · Pearl Solutions" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legal.owner, url: site.url }],
  creator: site.legal.owner,
  publisher: site.name,
  keywords: [
    "custom software development",
    "website development",
    "Next.js developer",
    "Discord bot development",
    "custom Discord bot",
    "checkout bot development",
    "auto checkout software",
    "AI chatbot development",
    "custom AI solutions",
    "freelance developer France",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: `${site.legal.owner} (${site.legal.tradingName})`,
  url: site.url,
  logo: `${site.url}/brand/pearl-avatar.png`,
  image: `${site.url}/opengraph-image.jpg`,
  description: site.description,
  email: site.email,
  founder: { "@type": "Person", name: site.legal.owner },
  foundingDate: String(site.foundingYear),
  taxID: site.legal.sirenRaw,
  identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: site.legal.sirenRaw },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.legal.address.street,
    postalCode: site.legal.address.postcode,
    addressLocality: site.legal.address.city,
    addressCountry: site.legal.address.countryCode,
  },
  areaServed: "Worldwide",
  knowsLanguage: ["en", "fr"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software development services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
    })),
  },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <JsonLd data={[organization, website]} />
      </body>
    </html>
  );
}
