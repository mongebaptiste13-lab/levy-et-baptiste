"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, Video, Mail, Check,
  Loader2, Calendar, MessageSquare, Clock,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SITE_CONFIG } from "@/lib/config";
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false, loading: () => <div className="w-52 h-52" /> }
);

const projectTypes = [
  "Automatisation & IA",
  "Développement sur mesure",
  "Dashboard / Reporting",
  "Infrastructure data",
  "Autre",
];


function SuccessIcon() {
  return (
    <div className="w-52 h-52 flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />
        <div className="relative w-24 h-24 rounded-3xl bg-primary/12 border border-primary/25 flex items-center justify-center">
          <Check className="w-10 h-10 text-primary" />
        </div>
      </div>
    </div>
  );
}

type Step = "type" | "form" | "booking" | "done";

export default function ContactPage() {
  const [step, setStep] = useState<Step>("type");
  const [expanded, setExpanded] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [sending, setSending] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [form, setForm] = useState({ name: "", company: "", email: "", description: "" });

  const goTo = (s: Step) => { setExpanded(true); setStep(s); };
  const goBack = () => { setExpanded(false); setStep("type"); };

  // Écoute la confirmation Calendly
  useEffect(() => {
    const handleCalendly = (e: MessageEvent) => {
      if (e.data?.event === "calendly.event_scheduled") {
        setStep("done");
      }
    };
    window.addEventListener("message", handleCalendly);
    return () => window.removeEventListener("message", handleCalendly);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, projectType: selectedType }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStep("done");
    } catch {
      alert("Une erreur est survenue. Merci de réessayer ou d'écrire directement à " + SITE_CONFIG.email);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col lg:flex-row relative overflow-hidden"
      onMouseMove={(e) => setCursor({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })}
    >
      {/* Spotlight — étape 1 seulement */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${expanded ? "opacity-0" : "opacity-100"}`}
        style={{ background: `radial-gradient(700px circle at ${cursor.x}% ${cursor.y}%, oklch(0.72 0.13 145 / 0.14), transparent 60%)` }}
      />

      {/* ─── PANEL GAUCHE ─── */}
      <aside className={`relative z-10 bg-foreground flex flex-col justify-center items-center text-center overflow-hidden transition-all duration-700 ease-in-out
        ${expanded
          ? "hidden lg:flex lg:w-0 lg:opacity-0 lg:overflow-hidden"
          : "flex lg:w-[42%] px-8 sm:px-10 py-10 lg:py-0 lg:px-16 opacity-100 min-h-[280px] sm:min-h-[320px] lg:min-h-screen"
        }`}>
        <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
        <div className="absolute top-0 right-0 w-60 h-60 lg:w-80 lg:h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 lg:w-72 lg:h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-5 lg:top-8 left-0 right-0 flex justify-center z-10">
          <Link href="/"><span className="text-background/60 font-semibold tracking-tight text-sm">DataForge <span className="text-background/30 font-mono text-xs">IA</span></span></Link>
        </div>
        <div className="absolute top-5 lg:top-8 left-5 sm:left-10 lg:left-14 z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-background/35 hover:text-background/70 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Retour
          </Link>
        </div>
        <div className="relative z-10 space-y-5 lg:space-y-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Premier contact
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-background tracking-tight leading-[1.05]">Parlons de<br />votre projet.</h1>
          <p className="text-background/45 text-sm lg:text-base leading-relaxed">Echange gratuit, sans engagement.<br className="hidden sm:block" /> Réponse personnelle sous 24h.</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-primary" />
            </div>
            <p className="text-xs lg:text-sm text-background/60">{SITE_CONFIG.email}</p>
          </div>
        </div>
      </aside>

      {/* ─── PANEL DROIT ─── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-6 py-10 lg:py-8 transition-all duration-700 ease-in-out overflow-y-auto">
        <div className={`w-full transition-all duration-700 ease-in-out ${expanded ? "max-w-5xl" : "max-w-md"}`}>

          {/* ÉTAPE 1 */}
          {step === "type" && (
            <div key="type" className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-2">
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Étape 1 / 2</p>
                <h2 className="text-2xl font-semibold tracking-tight">Comment préférez-vous<br />nous contacter ?</h2>
              </div>
              <div className="space-y-3">
                <button onClick={() => goTo("booking")} className="group w-full flex items-center gap-5 p-5 rounded-2xl border border-foreground/10 bg-card hover:border-primary/50 hover:bg-primary/4 transition-all duration-300 text-left">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0"><Video className="w-5 h-5 text-primary" /></div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-0.5">Réserver une visio</p>
                    <p className="text-xs text-muted-foreground">30 min pour présenter votre projet — avis expert inclus.</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                </button>
                <button onClick={() => goTo("form")} className="group w-full flex items-center gap-5 p-5 rounded-2xl border border-foreground/10 bg-card hover:border-primary/50 hover:bg-primary/4 transition-all duration-300 text-left">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-primary" /></div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-0.5">Décrire mon projet</p>
                    <p className="text-xs text-muted-foreground">Réponse personnalisée sous 24h, zero relance automatique.</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                </button>
              </div>
              <p className="text-xs text-center text-muted-foreground/60">Toutes les informations restent confidentielles.</p>
            </div>
          )}

          {/* ÉTAPE 2 — Formulaire */}
          {step === "form" && (
            <div key="form" className="animate-in fade-in slide-in-from-right-8 duration-500 w-full max-w-xl mx-auto">
              {/* Header */}
              <div className="mb-8 flex items-center gap-4">
                <button type="button" onClick={goBack} className="w-8 h-8 rounded-full border border-foreground/12 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">Étape 2 / 2</p>
                  <h2 className="text-xl font-semibold tracking-tight">Votre projet en quelques mots</h2>
                </div>
              </div>

              {/* Carte unique unifiée */}
              <form onSubmit={handleSubmit}>
                <div className="rounded-3xl border border-foreground/8 bg-card overflow-hidden">

                  {/* Type de projet */}
                  <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-foreground/6">
                    <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3">Votre besoin</p>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((t) => (
                        <button key={t} type="button" onClick={() => setSelectedType(t)}
                          className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs border transition-all duration-200 ${selectedType === t ? "bg-foreground text-background border-foreground font-medium" : "border-foreground/10 text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nom + Entreprise */}
                  <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-foreground/6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">Nom</p>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont"
                        className="w-full bg-transparent text-sm placeholder:text-muted-foreground/30 focus:outline-none border-b border-foreground/10 pb-1.5 focus:border-primary/50 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">Entreprise</p>
                      <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Société"
                        className="w-full bg-transparent text-sm placeholder:text-muted-foreground/30 focus:outline-none border-b border-foreground/10 pb-1.5 focus:border-primary/50 transition-colors" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-foreground/6 space-y-2">
                    <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">Email professionnel</p>
                    <input required type="email" inputMode="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean@entreprise.fr"
                      className="w-full bg-transparent text-sm placeholder:text-muted-foreground/30 focus:outline-none border-b border-foreground/10 pb-1.5 focus:border-primary/50 transition-colors" />
                  </div>

                  {/* Description */}
                  <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-2">
                    <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest">Votre projet</p>
                    <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Décrivez votre besoin, vos enjeux, vos objectifs..."
                      className="w-full bg-transparent text-sm placeholder:text-muted-foreground/30 focus:outline-none resize-none leading-relaxed" />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-4 space-y-3">
                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 rounded-2xl bg-foreground text-background text-sm font-medium flex items-center justify-center gap-2 hover:bg-foreground/88 transition-all disabled:opacity-60">
                    {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</> : <>Envoyer ma demande <ArrowRight className="w-4 h-4" /></>}
                  </button>
                  <p className="text-center text-xs text-muted-foreground/40">
                    Vous préférez échanger en direct ?{" "}
                    <button type="button" onClick={() => setStep("booking")} className="underline underline-offset-4 hover:text-foreground transition-colors">
                      Réserver une visio
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* ÉTAPE 2b — Booking */}
          {step === "booking" && (
            <div key="booking" className="animate-in fade-in slide-in-from-right-8 duration-500 w-full max-w-xl mx-auto">
              {/* Header */}
              <div className="mb-8 flex items-center gap-4">
                <button onClick={goBack} className="w-8 h-8 rounded-full border border-foreground/12 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">Étape 2 / 2</p>
                  <h2 className="text-xl font-semibold tracking-tight">Choisissez un créneau</h2>
                </div>
              </div>

              {/* Pills info + badge disponible */}
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/8 bg-card text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary/60" /> 30 minutes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/8 bg-card text-xs text-muted-foreground">
                  <Check className="w-3 h-3 text-primary/60" /> Gratuit
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/8 bg-card text-xs text-muted-foreground">
                  <Video className="w-3 h-3 text-primary/60" /> Visioconférence
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-xs text-primary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Disponible cette semaine
                </span>
              </div>

              {/* Calendly card avec dot grid + "30'" filigrane */}
              <div className="relative rounded-3xl border border-foreground/8 bg-card overflow-hidden">

                {/* Dot grid décoratif */}
                <div
                  className="absolute inset-0 opacity-[0.035] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, oklch(0.28 0.06 145) 1.5px, transparent 1.5px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* "30'" filigrane */}
                <div className="absolute -right-4 -top-6 text-[140px] font-bold text-foreground/[0.04] select-none pointer-events-none leading-none tracking-tighter">
                  30'
                </div>

                {/* Gradient glow border animé */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.72 0.13 145 / 0.06) 0%, transparent 50%, oklch(0.72 0.13 145 / 0.04) 100%)`,
                  }}
                />

                <div className="relative" style={{ minHeight: 400 }}>
                       <iframe src={SITE_CONFIG.calendlyUrl} width="100%" height="400" frameBorder="0" title="Réserver" className="w-full" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center space-y-2 max-w-[210px]">
                      <p className="font-semibold text-sm">Calendly à configurer</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Remplacez <code className="bg-foreground/8 px-1 py-0.5 rounded text-[11px]">votre-lien</code> par votre identifiant Calendly.</p>
                    </div>
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-all">
                      Créer mon Calendly →
                    </a>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-center gap-0 mt-6">
                {[
                  { step: "Vous réservez", sub: "2 min" },
                  { step: "On prépare", sub: "En amont" },
                  { step: "On échange", sub: "30 min" },
                ].map((item, i) => (
                  <div key={item.step} className="flex items-center">
                    <div className="flex flex-col items-center gap-1.5 px-4">
                      <div className="w-2 h-2 rounded-full bg-primary/50" />
                      <p className="text-xs font-medium text-foreground/70 whitespace-nowrap">{item.step}</p>
                      <p className="text-[10px] text-muted-foreground/50 font-mono">{item.sub}</p>
                    </div>
                    {i < 2 && <div className="w-10 h-px bg-foreground/10 flex-shrink-0" />}
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground/40 mt-5">
                Vous préférez écrire ?{" "}
                <button onClick={() => setStep("form")} className="underline underline-offset-4 hover:text-foreground transition-colors">Formulaire</button>
              </p>
            </div>
          )}

          {/* ÉTAPE 3 — Confirmation */}
          {step === "done" && (
            <div key="done" className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 max-w-sm mx-auto">
              {/* Animation confirmation */}
              <div className="flex justify-center">
                <div
                  className="w-52 h-52"
                  style={{ filter: "hue-rotate(250deg) saturate(0.38) brightness(1.3)" }}
                >
                  <DotLottieReact src="/email-sent.lottie" autoplay loop={false} />
                </div>
              </div>
              <div className="space-y-3">
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Demande envoyée</p>
                <h2 className="text-3xl font-semibold tracking-tight">On a bien reçu<br />votre message.</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Un membre de l&apos;équipe vous contacte personnellement sous 24h ouvrées.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-foreground/12 text-sm hover:bg-foreground/5 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Retour au site
                </Link>
                <Link href="/#pricing" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors">
                  Voir nos offres <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
