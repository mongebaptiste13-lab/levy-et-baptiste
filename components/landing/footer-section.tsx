"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  "Expertises": [
    { name: "Automatisation & IA", href: "#features" },
    { name: "Developpement sur mesure", href: "#features" },
    { name: "Nos offres", href: "#pricing" },
  ],
  "Methode": [
    { name: "Notre methode", href: "#how-it-works" },
    { name: "Nos engagements", href: "#security" },
    { name: "Resultats", href: "#studio" },
  ],
  "Agence": [
    { name: "Prendre contact", href: "/contact" },
    { name: "Reserver une visio", href: "/contact" },
    { name: "On recrute", href: "/carrieres", badge: "Ouvert" },
  ],
  "Infos": [
    { name: "Mentions légales & RGPD", href: "/legal" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-12 lg:py-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2 sm:col-span-3 md:col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display">DataForge</span>
                <span className="text-xs text-muted-foreground font-mono">IA</span>
              </a>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                Agence specialisee en data et intelligence artificielle. Nous simplifions des systemes complexes pour creer des solutions directement exploitables.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 lg:py-8 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            2026 DataForge IA. Tous droits reserves.
          </p>

        </div>
      </div>
    </footer>
  );
}
