"use client";

import { ArrowRight, Check, Zap, Wrench } from "lucide-react";

const offers = [
  {
    number: "01",
    icon: Zap,
    name: "Automatisation & IA",
    tag: "Efficacite operationnelle",
    description:
      "Automatisation des processus et integration d'intelligence artificielle pour ameliorer l'efficacite des entreprises.",
    includes: [
      "Automatisation de workflows",
      "Integration d'IA (agents, GPT, etc.)",
      "Traitement de donnees et documents",
      "Connexion d'outils (API, SaaS)",
      "Optimisation des processus",
    ],
    results: [
      { value: "Gain de temps", sub: "sur les taches repetitives" },
      { value: "Moins d'erreurs", sub: "grace a l'automatisation" },
      { value: "Productivite", sub: "mesurable des le 1er mois" },
    ],
    cta: "Automatiser mes processus",
    accent: false,
  },
  {
    number: "02",
    icon: Wrench,
    name: "Developpement sur mesure",
    tag: "Outils digitaux metier",
    description:
      "Creation d'outils digitaux sur mesure pour repondre precisement aux besoins metier.",
    includes: [
      "Developpement de sites web",
      "Dashboards interactifs",
      "CRM et outils internes",
      "Infrastructure data",
      "Solutions sur mesure",
    ],
    results: [
      { value: "100% adapte", sub: "a votre metier" },
      { value: "Vision claire", sub: "de vos donnees" },
      { value: "Evolutif", sub: "et maintenu dans le temps" },
    ],
    cta: "Creer mon outil",
    accent: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-5">
            Nos offres
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight text-foreground mb-5">
            Deux expertises,
            <br />
            <span className="text-stroke">un seul objectif.</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-xl">
            Chaque projet demarre par un echange gratuit de 30 minutes.
            Pas de forfait generique — nous concevons une reponse adaptee a votre contexte.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex items-center gap-3 mb-10 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-foreground/10 text-xs sm:text-sm text-muted-foreground rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
            Tous les tarifs sont etablis sur devis, apres un premier echange gratuit.
          </span>
        </div>

        {/* Offer cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.number}
                className={`relative flex flex-col rounded-3xl border p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  offer.accent
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/15 bg-background hover:border-foreground/30"
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        offer.accent
                          ? "border-background/20 bg-background/10"
                          : "border-foreground/10 bg-foreground/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-mono px-3 py-1 rounded-full border ${
                        offer.accent
                          ? "border-background/20 text-background/60"
                          : "border-foreground/10 text-muted-foreground"
                      }`}
                    >
                      {offer.tag}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs ${
                      offer.accent ? "text-background/40" : "text-foreground/30"
                    }`}
                  >
                    {offer.number}
                  </span>
                </div>

                {/* Title & description */}
                <h3 className="font-display text-3xl lg:text-4xl tracking-tight mb-3">
                  {offer.name}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-8 ${
                    offer.accent ? "text-background/60" : "text-muted-foreground"
                  }`}
                >
                  {offer.description}
                </p>

                {/* Includes */}
                <div className="mb-8">
                  <p
                    className={`text-xs font-mono uppercase tracking-widest mb-4 ${
                      offer.accent ? "text-background/40" : "text-muted-foreground"
                    }`}
                  >
                    Inclut
                  </p>
                  <ul className="space-y-3">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            offer.accent ? "text-background/70" : "text-primary"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            offer.accent ? "text-background/80" : "text-foreground"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div
                  className={`rounded-2xl p-4 sm:p-5 mb-8 grid grid-cols-3 gap-2 sm:gap-4 border ${
                    offer.accent
                      ? "bg-background/10 border-background/10"
                      : "bg-foreground/[0.03] border-foreground/8"
                  }`}
                >
                  {offer.results.map((r) => (
                    <div key={r.value} className="text-center">
                      <p
                        className={`font-display text-xs sm:text-base leading-tight mb-1 ${
                          offer.accent ? "text-background" : "text-foreground"
                        }`}
                      >
                        {r.value}
                      </p>
                      <p
                        className={`text-[10px] sm:text-[11px] leading-snug ${
                          offer.accent ? "text-background/50" : "text-muted-foreground"
                        }`}
                      >
                        {r.sub}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <a href="/contact" className="block">
                    <button
                      className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 group ${
                        offer.accent
                          ? "bg-background text-foreground hover:bg-background/90"
                          : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                    >
                      {offer.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Vous avez un projet qui combine les deux ?{" "}
          <a
            href="#contact"
            className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            On en parle.
          </a>
        </p>
      </div>
    </section>
  );
}
