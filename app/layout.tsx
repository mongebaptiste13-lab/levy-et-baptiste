import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
});

const BASE_URL = "https://dataforge-ia.fr";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f5f2eb",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DataForge IA",
    template: "%s — DataForge IA",
  },
  description: "Agence spécialisée en data et intelligence artificielle. Nous concevons des solutions sur mesure pour automatiser vos processus, structurer vos données et développer vos outils digitaux.",
  keywords: [
    "agence data", "intelligence artificielle", "automatisation IA",
    "dashboard", "développement web sur mesure", "infrastructure data",
    "CRM sur mesure", "pipeline data", "agence IA France",
    "DataForge", "data engineering", "solutions data entreprise",
  ],
  authors: [{ name: "Eliot Levy" }, { name: "Baptiste Monge" }],
  creator: "DataForge IA",
  publisher: "DataForge IA",
  category: "Technology",
  alternates: {
    canonical: "/",
    languages: { "fr-FR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "DataForge IA",
    title: "DataForge IA — Agence Data & Intelligence Artificielle",
    description: "Automatisation IA, développement sur mesure, dashboards et infrastructure data. Réponse sous 24h.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DataForge IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataForge IA — Agence Data & IA",
    description: "Solutions data et IA sur mesure pour les entreprises.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "VOTRE_CODE_GOOGLE_SEARCH_CONSOLE",  // À ajouter après vérification GSC
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "DataForge IA",
        "url": BASE_URL,
        "email": process.env.CONTACT_EMAIL ?? "contact@dataforge-ia.fr",
        "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.svg` },
        "description": "Agence spécialisée en data et intelligence artificielle. Solutions sur mesure pour automatiser, structurer et exploiter vos données.",
        "foundingDate": "2024",
        "founders": [
          { "@type": "Person", "name": "Eliot Levy" },
          { "@type": "Person", "name": "Baptiste Monge" }
        ],
        "areaServed": { "@type": "Country", "name": "France" },
        "serviceType": ["Data Engineering", "Intelligence Artificielle", "Automatisation", "Développement web", "Dashboard"],
        "sameAs": ["https://www.linkedin.com/company/dataforge-ia"],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "DataForge IA",
        "description": "Agence spécialisée en data et intelligence artificielle",
        "publisher": { "@id": `${BASE_URL}/#organization` },
        "inLanguage": "fr-FR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        "url": BASE_URL,
        "name": "DataForge IA — Agence Data & Intelligence Artificielle",
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "about": { "@id": `${BASE_URL}/#organization` },
        "inLanguage": "fr-FR",
        "potentialAction": [
          { "@type": "ViewAction", "name": "Nos expertises", "target": `${BASE_URL}/#features` },
          { "@type": "ViewAction", "name": "Nos offres", "target": `${BASE_URL}/#pricing` },
          { "@type": "ViewAction", "name": "Nous contacter", "target": `${BASE_URL}/contact` },
          { "@type": "ViewAction", "name": "On recrute", "target": `${BASE_URL}/carrieres` },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#service`,
        "name": "DataForge IA",
        "provider": { "@id": `${BASE_URL}/#organization` },
        "serviceType": "Conseil en data et intelligence artificielle",
        "areaServed": "France",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Offres DataForge IA",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": "Automatisation & IA", "description": "Automatisation des processus et intégration d'intelligence artificielle" },
            },
            {
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": "Développement sur mesure", "description": "Création d'outils digitaux sur mesure : sites web, dashboards, CRM, infrastructure data" },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
