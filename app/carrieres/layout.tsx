import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "On recrute",
  description: "Rejoignez DataForge IA — agence data et IA en pleine croissance. Postes ouverts : Profil Tech et Profil Sales. Remote / Hybride.",
  alternates: { canonical: "/carrieres" },
  openGraph: {
    title: "On recrute — DataForge IA",
    description: "Profil Tech ou Sales : construisez des outils data et IA concrets pour des entreprises variées.",
    url: "https://dataforge-ia.fr/carrieres",
  },
};

export default function CarrieresLayout({ children }: { children: React.ReactNode }) {
  return children;
}
