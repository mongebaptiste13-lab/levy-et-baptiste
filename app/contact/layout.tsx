import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: "Prenez contact avec DataForge IA : réservez une visio gratuite de 30 minutes ou décrivez votre projet par écrit. Réponse personnelle sous 24h.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Nous contacter — DataForge IA",
    description: "Réservez une visio gratuite de 30 min ou décrivez votre projet. Réponse sous 24h.",
    url: "https://dataforge-ia.fr/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
