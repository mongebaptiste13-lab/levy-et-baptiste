/**
 * ─────────────────────────────────────────────
 *  CONFIG CENTRALE — modifier uniquement ici
 * ─────────────────────────────────────────────
 *
 * 1. Copier .env.local.example → .env.local
 * 2. Remplir les variables d'environnement
 * 3. Redémarrer le serveur
 */

export const SITE_CONFIG = {
  /** Email de réception des formulaires (contact + candidatures) */
  email: process.env.CONTACT_EMAIL ?? "contact@dataforge-ia.fr",

  /** URL Calendly complète — ex: https://calendly.com/dataforge-ia/30min */
  calendlyUrl: process.env.CALENDLY_URL ?? "https://calendly.com/votre-lien/30min",

  /** URL publique du site */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dataforge-ia.fr",

  /** Nom de l'agence affiché dans les emails */
  agencyName: "DataForge IA",
} as const;
