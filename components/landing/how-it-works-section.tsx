"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Diagnostiquer l'existant",
    description: "Nous auditons vos processus, vos donnees et vos points de friction pour definir une feuille de route claire.",
    code: `const diagnostic = runAudit({
  process: 'metier',
  dataSources: ['crm', 'erp', 'excel'],
  decisionGoals: true
})`,
  },
  {
    number: "II",
    title: "Concevoir la solution",
    description: "Nous modelisons vos flux cibles et construisons un socle technique simple a maintenir et facile a faire evoluer.",
    code: `const solution = designSystem({
  dataModel: 'unifie',
  automation: ['qualification', 'routage'],
  interfaces: ['dashboard', 'crm']
})`,
  },
  {
    number: "III",
    title: "Deployer et optimiser",
    description: "Nous mettons en production, transferons les bonnes pratiques et mesurons l'impact pour iterer vite.",
    code: `deploy({
  infra: 'cloud',
  monitoring: true,
  training: 'equipes'
})

// Resultat: workflows fiables et actionnables`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-5">
            <span className="w-8 h-px bg-background/30" />
            Methode
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Trois etapes.
            <br />
            <span className="text-background/50">Impact mesurable.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-7 lg:py-8 border-b border-background/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-5">
                  <span className="font-display text-2xl lg:text-3xl text-background/30 shrink-0">{step.number}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-display mb-2 lg:mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm lg:text-base text-background/60 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-3 h-px bg-background/20 overflow-hidden">
                        <div 
                          className="h-full bg-background w-0"
                          style={{ animation: 'progress 5s linear forwards' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-background/10 rounded-xl overflow-hidden">
              {/* Window header */}
              <div className="px-4 sm:px-6 py-3 lg:py-4 border-b border-background/10 flex items-center justify-between">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-background/20" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-background/20" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-background/20" />
                </div>
                <span className="text-xs font-mono text-background/40">solution.ts</span>
              </div>

              {/* Code content */}
              <div className="p-4 sm:p-6 lg:p-8 font-mono text-xs sm:text-sm min-h-[200px] lg:min-h-[280px] overflow-x-auto">
                <pre className="text-background/70">
                  {steps[activeStep].code.split('\n').map((line, lineIndex) => (
                    <div 
                      key={`${activeStep}-${lineIndex}`} 
                      className="leading-loose code-line-reveal whitespace-pre"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="text-background/20 select-none w-6 sm:w-8 inline-block">{lineIndex + 1}</span>
                      <span className="inline-flex">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeStep}-${lineIndex}-${charIndex}`}
                            className="code-char-reveal"
                            style={{ animationDelay: `${lineIndex * 80 + charIndex * 15}ms` }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Status */}
              <div className="px-4 sm:px-6 py-3 lg:py-4 border-t border-background/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-background/40">Pret pour la prod</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .code-line-reveal {
          opacity: 0;
          transform: translateX(-8px);
          animation: lineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes lineReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .code-char-reveal {
          opacity: 0;
          filter: blur(8px);
          animation: charReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes charReveal {
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
