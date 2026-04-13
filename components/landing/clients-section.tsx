"use client";

import { useState } from "react";
import Image from "next/image";

const clients = [
  { name: "CMA CGM",            src: "/logos/cma-cgm.png",            fallback: "https://logo.clearbit.com/cmacgm.com" },
  { name: "Everdian",           src: "/logos/everdian.png",           fallback: "https://logo.clearbit.com/everdian.com" },
  { name: "La Provence",        src: "/logos/la-provence.png",        fallback: "https://logo.clearbit.com/laprovence.com" },
  { name: "La French Tech",     src: "/logos/french-tech.png",        fallback: "https://logo.clearbit.com/lafrenchtech.com" },
  { name: "Provence Promotion", src: "/logos/provence-promotion.png", fallback: "https://logo.clearbit.com/provencepromotion.fr" },
  { name: "Min. des Armées",    src: "/logos/ministere-armees.png",   fallback: "https://logo.clearbit.com/defense.gouv.fr" },
  { name: "Capgemini",          src: "/logos/capgemini.png",          fallback: "https://logo.clearbit.com/capgemini.com" },
  { name: "Pernod Ricard",      src: "/logos/pernod-ricard.png",      fallback: "https://logo.clearbit.com/pernod-ricard.com" },
  { name: "LVMH",               src: "/logos/lvmh.png",               fallback: "https://logo.clearbit.com/lvmh.com" },
  { name: "Mantu",              src: "/logos/mantu.png",              fallback: "https://logo.clearbit.com/mantu.com" },
  { name: "Eramet",             src: "/logos/eramet.png",             fallback: "https://logo.clearbit.com/eramet.com" },
];

function LogoCard({ client }: { client: typeof clients[0] }) {
  const [imgSrc, setImgSrc] = useState(client.src);
  const [failed, setFailed] = useState(false);

  return (
    <div className="shrink-0 flex items-center justify-center px-8 sm:px-12 py-5 sm:py-6 group">
      <div className="h-12 sm:h-16 w-36 sm:w-52 flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
        {failed ? (
          <span className="font-semibold text-sm tracking-tight text-foreground/60 text-center">{client.name}</span>
        ) : (
          <Image
            src={imgSrc}
            alt={client.name}
            width={160}
            height={60}
            className="max-w-full max-h-full object-contain"
            onError={() => {
              if (imgSrc === client.src) setImgSrc(client.fallback);
              else setFailed(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className="relative py-10 sm:py-14 border-y border-foreground/8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-7 sm:mb-10">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase text-center">
          Ils nous font confiance
        </p>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex marquee items-center">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex shrink-0 items-center divide-x divide-foreground/8">
              {clients.map((client) => (
                <LogoCard key={`${setIdx}-${client.name}`} client={client} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
