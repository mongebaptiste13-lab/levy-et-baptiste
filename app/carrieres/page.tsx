"use client";

import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Code2, TrendingUp, Upload, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

const positions = [
  {
    id: "tech",
    icon: Code2,
    title: "Profil Tech",
    tag: "Developpement & Data",
    description: "Tu aimes construire des systemes robustes, automatiser des processus et travailler sur des projets data/IA concrets.",
    missions: [
      "Developper des pipelines de donnees et infrastructures data",
      "Integrer des modeles IA et automatisations metier",
      "Creer des dashboards, CRM et applications web sur mesure",
      "Contribuer a l'architecture technique des projets clients",
    ],
    stack: ["Python", "Next.js", "PostgreSQL", "OpenAI", "n8n", "Supabase"],
    contract: "CDI ou freelance",
    location: "Remote / Hybride",
  },
  {
    id: "sales",
    icon: TrendingUp,
    title: "Profil Sales",
    tag: "Business Development",
    description: "Tu comprends les enjeux metier, tu sais ecouter les clients et traduire leurs besoins en opportunites concretes.",
    missions: [
      "Identifier et qualifier de nouveaux prospects",
      "Mener les premiers echanges et comprendre les besoins metier",
      "Presenter nos offres data et IA avec pedagogie",
      "Construire des relations durables avec les clients",
    ],
    stack: ["CRM", "Prospection", "Negociation", "Suivi client", "Reporting"],
    contract: "CDI ou freelance",
    location: "Remote / Hybride",
  },
];

type Step = "list" | "apply" | "done";

export default function CarrieresPage() {
  const [step, setStep] = useState<Step>("list");
  const [selectedPosition, setSelectedPosition] = useState<typeof positions[0] | null>(null);
  const [sending, setSending] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    motivation: "",
  });

  // Cursor spotlight sur fond crème
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const handleApply = (pos: typeof positions[0]) => {
    setSelectedPosition(pos);
    setStep("apply");
  };

  const handleFile = (file: File) => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".pdf") || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      setCvFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/carrieres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          position: selectedPosition?.title ?? "Inconnu",
        }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStep("done");
    } catch {
      alert("Une erreur est survenue. Merci d'envoyer ta candidature directement à " + SITE_CONFIG.email);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col relative"
      onMouseMove={(e) => {
        setCursor({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      }}
    >
      {/* Spotlight fond crème — suit le curseur sur tout le viewport */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-[background] duration-100"
        style={{
          background: `radial-gradient(700px circle at ${cursor.x}% ${cursor.y}%, oklch(0.72 0.13 145 / 0.18), transparent 60%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-foreground/8 px-6 lg:px-12 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>
        <span className="font-semibold tracking-tight text-sm">DataForge <span className="text-muted-foreground font-mono text-xs">IA</span></span>
        <div className="w-20" />
      </header>

      <main className="relative z-10 flex-1 px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto">

          {/* LISTE DES POSTES */}
          {step === "list" && (
            <div className="space-y-10 sm:space-y-16">
              {/* Hero banner */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-foreground/10 bg-foreground px-7 sm:px-10 py-12 sm:py-16 lg:py-24 text-center flex flex-col items-center">
                {/* Grille décorative */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px"
                  }}
                />
                {/* Lueurs fixes */}
                <div className="absolute -top-20 -right-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-44 sm:w-60 h-44 sm:h-60 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4 sm:space-y-5 max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    2 postes ouverts
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-background leading-tight">
                    Rejoins l&apos;equipe.
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-background/60 leading-relaxed">
                    On construit des outils data et IA concrets pour des entreprises variees. Si tu aimes les projets qui ont un impact reel, on veut te rencontrer.
                  </p>
                </div>
              </div>

              {/* Cards postes */}
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                {positions.map((pos) => {
                  const Icon = pos.icon;
                  return (
                    <div
                      key={pos.id}
                      className="flex flex-col gap-5 sm:gap-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-foreground/12 bg-card hover:border-primary/30 transition-all duration-300 group"
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{pos.tag}</p>
                        <h2 className="text-2xl font-semibold tracking-tight">{pos.title}</h2>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{pos.description}</p>
                      </div>

                      {/* Missions */}
                      <ul className="space-y-2">
                        {pos.missions.map((m) => (
                          <li key={m} className="flex items-start gap-2.5 text-sm text-foreground/75">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {m}
                          </li>
                        ))}
                      </ul>

                      {/* Stack */}
                      <div className="flex flex-wrap gap-2">
                        {pos.stack.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full text-xs border border-foreground/10 text-muted-foreground bg-background">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => handleApply(pos)}
                        className="mt-auto w-full py-3.5 rounded-2xl bg-foreground text-background text-sm font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-opacity group"
                      >
                        Postuler pour ce poste
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Note bas */}
              <p className="text-sm text-center text-muted-foreground">
                Profil atypique ou pas exactement dans les cases ?{" "}
                <Link href="/contact" className="underline underline-offset-4 hover:text-foreground transition-colors">
                  Ecris-nous quand meme.
                </Link>
              </p>
            </div>
          )}

          {/* FORMULAIRE CANDIDATURE */}
          {step === "apply" && selectedPosition && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-3">
                <button
                  onClick={() => setStep("list")}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> Retour aux postes
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <selectedPosition.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{selectedPosition.tag}</p>
                    <h1 className="text-2xl font-semibold tracking-tight">Candidature — {selectedPosition.title}</h1>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Nom complet</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-foreground/15 bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jean@email.fr"
                      className="w-full px-4 py-3 rounded-xl border border-foreground/15 bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">LinkedIn <span className="text-muted-foreground font-normal">(optionnel)</span></label>
                  <input
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    placeholder="linkedin.com/in/jean-dupont"
                    className="w-full px-4 py-3 rounded-xl border border-foreground/15 bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>

                {/* CV Upload */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">CV <span className="text-muted-foreground font-normal">(PDF ou Word)</span></label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                      dragOver
                        ? "border-primary bg-primary/5"
                        : cvFile
                        ? "border-primary/40 bg-primary/5"
                        : "border-foreground/15 hover:border-primary/40 hover:bg-foreground/[0.02]"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                    {cvFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{cvFile.name}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                          className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Glisser-deposer ou cliquer</p>
                          <p className="text-xs text-muted-foreground mt-0.5">PDF, DOC ou DOCX — max 5 Mo</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Lettre de motivation</label>
                  <textarea
                    required
                    rows={6}
                    value={form.motivation}
                    onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                    placeholder="Pourquoi ce poste ? Qu'est-ce qui te motive dans la data et l'IA ? Quels projets as-tu realises ?"
                    className="w-full px-4 py-3 rounded-xl border border-foreground/15 bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || !cvFile}
                  className="w-full py-4 rounded-2xl bg-foreground text-background text-sm font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-opacity disabled:opacity-50"
                >
                  {sending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...</>
                  ) : (
                    <>Envoyer ma candidature <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  Nous lisons chaque candidature et repondons sous 48h.
                </p>
              </form>
            </div>
          )}

          {/* CONFIRMATION */}
          {step === "done" && (
            <div className="max-w-md mx-auto text-center space-y-8 py-16">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Check className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight">Candidature envoyee !</h1>
                <p className="text-muted-foreground">
                  Merci pour ton interet. On lit chaque candidature avec attention et on te repond sous 48h.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/15 text-sm hover:bg-foreground/5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Retour au site
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
