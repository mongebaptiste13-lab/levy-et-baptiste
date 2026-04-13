import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    id: "mentions-legales",
    number: "01",
    title: "Mentions légales",
    content: [
      {
        subtitle: "Éditeur du site",
        text: `Le site est édité par :

Eliot Levy – Micro-entrepreneur
Baptiste Monge – Micro-entrepreneur

Activité : Conseil et développement de solutions data et intelligence artificielle

Email : contact@dataforge-ia.fr`,
      },
      {
        subtitle: "Hébergement",
        text: `Le site est hébergé par :

Netlify
44 Montgomery Street, Suite 300
San Francisco, CA 94104 – États-Unis
https://www.netlify.com`,
      },
      {
        subtitle: "Propriété intellectuelle",
        text: `L'ensemble du contenu du site (textes, visuels, graphismes, logo, structure) est la propriété de Eliot Levy et Baptiste Monge, sauf mention contraire.

Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation préalable est interdite.`,
      },
      {
        subtitle: "Références clients",
        text: `Les logos et noms d'entreprises présents sur le site sont utilisés à titre de référence commerciale.

Ils restent la propriété exclusive de leurs titulaires respectifs et ne constituent pas un partenariat officiel, sauf mention explicite.`,
      },
    ],
  },
  {
    id: "confidentialite",
    number: "02",
    title: "Politique de confidentialité",
    content: [
      {
        subtitle: "Responsable du traitement",
        text: `Les données personnelles collectées sur ce site sont traitées par :

Eliot Levy et Baptiste Monge`,
      },
      {
        subtitle: "Données collectées",
        text: `Dans le cadre de l'utilisation du site (formulaire de contact notamment), les données suivantes peuvent être collectées :

— Nom et prénom
— Adresse email
— Nom de l'entreprise
— Description du projet

Ces données sont utilisées uniquement pour répondre aux demandes et ne sont en aucun cas revendues ou cédées à des tiers.`,
      },
      {
        subtitle: "Durée de conservation",
        text: `Les données sont conservées pour une durée maximale de 3 ans à compter du dernier contact.`,
      },
      {
        subtitle: "Vos droits",
        text: `Conformément à la réglementation, vous disposez des droits suivants :

— Accès à vos données
— Rectification
— Suppression
— Limitation du traitement

Pour exercer ces droits : contact@dataforge-ia.fr`,
      },
      {
        subtitle: "Cookies",
        text: `Le site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement.

Aucun cookie de tracking ou publicitaire n'est utilisé sans consentement.`,
      },
    ],
  },
  {
    id: "rgpd",
    number: "03",
    title: "Conformité RGPD",
    content: [
      {
        subtitle: "Engagement",
        text: `Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD) et à protéger les données personnelles des utilisateurs.`,
      },
      {
        subtitle: "Base légale",
        text: `Les traitements reposent sur :

— Le consentement (formulaire de contact)
— L'intérêt légitime (échanges commerciaux)`,
      },
      {
        subtitle: "Sécurité",
        text: `Les données sont protégées via des mesures techniques adaptées :

— Connexions sécurisées (HTTPS)
— Accès restreint aux données`,
      },
      {
        subtitle: "Transferts hors UE",
        text: `Certains services (hébergement, outils) peuvent impliquer des transferts hors Union Européenne.

Dans ce cas, des garanties appropriées sont mises en place.`,
      },
      {
        subtitle: "Contact",
        text: `contact@dataforge-ia.fr`,
      },
    ],
  },
];

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/8 px-6 lg:px-16 h-16 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <span className="font-semibold tracking-tight text-sm">
          DataForge <span className="text-muted-foreground font-mono text-xs">IA</span>
        </span>
        <div className="w-20" />
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

        {/* Hero */}
        <div className="mb-20 space-y-4">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Informations légales</p>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Mentions légales<br />&amp; Confidentialité</h1>
          <p className="text-muted-foreground text-sm">Dernière mise à jour : avril 2026</p>
        </div>

        {/* Sommaire */}
        <nav className="mb-20 p-6 rounded-2xl border border-foreground/10 bg-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Sommaire</p>
          <div className="space-y-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-4 py-2 group"
              >
                <span className="font-mono text-xs text-muted-foreground/50 group-hover:text-primary transition-colors">{s.number}</span>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{s.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <div className="space-y-24">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-baseline gap-5 mb-10 pb-5 border-b border-foreground/10">
                <span className="font-mono text-5xl font-light text-foreground/10 select-none leading-none">{section.number}</span>
                <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              </div>

              <div className="space-y-10">
                {section.content.map((block) => (
                  <div key={block.subtitle} className="grid lg:grid-cols-[200px_1fr] gap-4 lg:gap-12">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-0.5">{block.subtitle}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-foreground/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 DataForge IA — Eliot Levy &amp; Baptiste Monge</p>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Retour au site →
          </Link>
        </div>
      </div>
    </div>
  );
}
