import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales, politique de confidentialité et conformité RGPD de DataForge IA — agence data et intelligence artificielle.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: false },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
