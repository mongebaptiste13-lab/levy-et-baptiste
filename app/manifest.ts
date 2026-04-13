import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DataForge IA — Agence Data & Intelligence Artificielle",
    short_name: "DataForge IA",
    description: "Solutions data et IA sur mesure pour les entreprises",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2eb",
    theme_color: "#1a2e1a",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  };
}
