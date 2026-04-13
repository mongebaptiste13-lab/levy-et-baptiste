import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ClientsSection } from "@/components/landing/clients-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que DataForge IA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DataForge IA est une agence spécialisée en data et intelligence artificielle. Nous concevons des solutions sur mesure pour automatiser les processus, structurer les données et développer des outils digitaux adaptés aux entreprises.",
      },
    },
    {
      "@type": "Question",
      "name": "Quelles sont les offres de DataForge IA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DataForge IA propose deux offres principales : Automatisation & IA (automatisation des workflows, intégration d'agents IA, traitement de données) et Développement sur mesure (sites web, dashboards, CRM, infrastructure data).",
      },
    },
    {
      "@type": "Question",
      "name": "Comment contacter DataForge IA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vous pouvez nous contacter via notre formulaire en ligne sur dataforge-ia.fr/contact ou réserver directement une visioconférence gratuite de 30 minutes. Nous répondons personnellement sous 24h ouvrées.",
      },
    },
    {
      "@type": "Question",
      "name": "DataForge IA travaille-t-il avec des grandes entreprises ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, DataForge IA a collaboré avec des entreprises comme CMA CGM, Capgemini, Pernod Ricard, LVMH, Eramet, et d'autres structures issues de secteurs variés (industrie, finance, médias, défense).",
      },
    },
    {
      "@type": "Question",
      "name": "DataForge IA recrute-t-il ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, DataForge IA est en recherche active de profils Tech (data engineering, IA, développement web) et de profils Sales (business development). Les postes sont en remote ou hybride. Postulez sur dataforge-ia.fr/carrieres.",
      },
    },
  ],
};

// Chargement différé des sections below-the-fold
const FeaturesSection   = dynamic(() => import("@/components/landing/features-section").then(m => m.FeaturesSection));
const HowItWorksSection = dynamic(() => import("@/components/landing/how-it-works-section").then(m => m.HowItWorksSection));
const MetricsSection    = dynamic(() => import("@/components/landing/metrics-section").then(m => m.MetricsSection));
const SecuritySection   = dynamic(() => import("@/components/landing/security-section").then(m => m.SecuritySection));
const PricingSection    = dynamic(() => import("@/components/landing/pricing-section").then(m => m.PricingSection));
const CtaSection        = dynamic(() => import("@/components/landing/cta-section").then(m => m.CtaSection));
const FooterSection     = dynamic(() => import("@/components/landing/footer-section").then(m => m.FooterSection));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation />
      <HeroSection />
      <ClientsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MetricsSection />
      <SecuritySection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
