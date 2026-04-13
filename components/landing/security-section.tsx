"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Solutions fiables avant tout",
    description: "Nous ne livrons pas du code qui fonctionne en demo. Nous livrons des systemes stables, documentés et maintenables.",
  },
  {
    icon: Lock,
    title: "Donnees securisees",
    description: "Vos donnees restent les votres. Confidentialite, souverainete et conformite RGPD sont au coeur de chaque projet.",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    description: "Vous voyez ce que nous faisons, pourquoi, et comment. Pas de boite noire, pas de sur-complexite inutile.",
  },
  {
    icon: FileCheck,
    title: "Transfert de competence",
    description: "Chaque livraison s'accompagne de documentation et d'un accompagnement pour que vos equipes gagnent en autonomie.",
  },
];

const certifications = ["RGPD", "Agile", "Lean Data", "No vendor lock-in", "Open source"];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-5">
              <span className="w-8 h-px bg-foreground/30" />
              Nos engagements
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display tracking-tight mb-6 lg:mb-8">
              La confiance
              <br />
              se construit.
            </h2>
            <p className="text-base lg:text-xl text-muted-foreground leading-relaxed mb-8 lg:mb-12">
              Notre valeur n&apos;est pas dans la complexite de ce que nous faisons, 
              mais dans la clarté et la fiabilite de ce que nous livrons.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-3 lg:px-4 py-1.5 lg:py-2 border border-foreground/10 text-xs sm:text-sm font-mono transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-4 lg:gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-5 lg:p-6 border border-foreground/10 hover:border-foreground/20 rounded-xl transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center border border-foreground/10 rounded-lg group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <feature.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
