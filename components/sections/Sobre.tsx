import Image from "next/image";
import type { SiteSettings } from "@/lib/types";

export function Sobre({ sobre }: { sobre: SiteSettings["sobre"] }) {
  return (
    <section id="sobre" className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-[0.8fr_1.2fr]">
      <div className="relative mx-auto w-full max-w-sm">
        <div aria-hidden className="absolute inset-0 rotate-3 rounded-[3rem] bg-destaque/35" />
        <div className="relative -rotate-2 rounded-[3rem] bg-fundo p-8 shadow-[8px_8px_0_var(--color-pessego)] ring-2 ring-pessego">
          <Image src="/marca/icone.webp" alt="As três carinhas da marca Três Amores" width={900} height={479} className="h-auto w-full" />
        </div>
      </div>
      <div>
        <h2 className="font-display text-4xl font-extrabold leading-tight text-menta-escura md:text-5xl">{sobre.titulo}</h2>
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed">{sobre.texto}</p>
      </div>
    </section>
  );
}
