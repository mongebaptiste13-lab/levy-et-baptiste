"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const AnimatedSphere = dynamic(
  () => import("./animated-sphere").then((m) => m.AnimatedSphere),
  { ssr: false }
);

const phrases = [
  "avantage strategique",
  "levier de performance",
  "systeme intelligent",
  "outil de decision",
  "croissance maitrisee",
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[800px] lg:h-[800px] opacity-30 lg:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            Agence specialisee en Data &amp; Intelligence Artificielle
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-10 lg:mb-12">
          <h1 
            className={`text-[clamp(2rem,7.2vw,4.6rem)] sm:text-[clamp(2.5rem,6vw,5rem)] font-display leading-[1.05] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Vos donnees,</span>
            <span className="block">
              votre{" "}
              <span className="relative inline-block">
                <span
                  key={phraseIndex}
                  className="inline-flex flex-wrap"
                >
                  {phrases[phraseIndex].split("").map((char, i) => (
                    <span
                      key={`${phraseIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/15" />
              </span>
            </span>
          </h1>
        </div>
        
        {/* Description */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-24 items-start lg:items-end">
          <div
            className={`space-y-3 max-w-lg transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-base sm:text-lg text-foreground/75 leading-relaxed font-light">
              Nous concevons des solutions sur mesure pour{" "}
              <span className="relative inline whitespace-nowrap text-foreground font-normal">
                <span className="absolute inset-x-0 bottom-0.5 h-[0.45em] bg-primary/25 rounded-sm -z-10" />
                structurer, automatiser et exploiter
              </span>{" "}
              vos donnees.
            </p>
          </div>
          
          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-start gap-3 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-foreground hover:bg-foreground/90 text-background px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base rounded-full group"
            >
              Voir nos offres
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <a href="/contact" className="sm:flex-none">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-full border-foreground/20 hover:bg-foreground/5"
              >
                Demander un audit
              </Button>
            </a>
          </div>
        </div>
        
      </div>
      
      
      {/* Scroll indicator */}
      
    </section>
  );
}
