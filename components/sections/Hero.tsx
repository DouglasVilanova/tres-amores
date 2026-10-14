import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteSettings } from "@/lib/types";

const v = (vars: Record<string, string>) => vars as CSSProperties;

export function Hero({ hero }: { hero: SiteSettings["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="deco absolute -right-10 top-0 hidden h-[115%] w-[34rem] opacity-70 lg:block"
        style={v({ "--deco-img": "url(/marca/elementos-01.webp)", "--deco-cor": "var(--color-pessego)" })}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 md:grid-cols-[1.1fr_0.9fr] md:pb-28 md:pt-20">
        <div>
          {hero.selo ? (
            <p className="chega inline-block rounded-full bg-suave px-4 py-1.5 text-sm font-bold text-menta-escura">{hero.selo}</p>
          ) : null}
          <h1
            className="chega mt-5 font-display text-[2.7rem] font-extrabold leading-[1.02] text-menta-escura md:text-[4.3rem]"
            style={v({ "--atraso": "0.08s" })}
          >
            {hero.titulo} <span className="block text-rosa-escuro">{hero.destaque}</span>
          </h1>
          <p className="chega mt-6 max-w-xl text-lg leading-relaxed md:text-xl" style={v({ "--atraso": "0.16s" })}>
            {hero.subtitulo}
          </p>
          <div className="chega mt-9 flex flex-wrap items-center gap-4" style={v({ "--atraso": "0.24s" })}>
            {hero.ctaLabel ? (
              <a
                href={hero.ctaHref || "#contato"}
                className="adesivo rounded-full bg-menta-escura px-7 py-3.5 font-display text-lg font-bold text-white"
              >
                {hero.ctaLabel}
              </a>
            ) : null}
            {hero.cta2Label ? (
              <a
                href={hero.cta2Href || "#categorias"}
                className="rounded-full border-2 border-menta-escura px-7 py-3 font-display text-lg font-bold text-menta-escura transition-colors hover:bg-suave"
              >
                {hero.cta2Label}
              </a>
            ) : null}
          </div>
        </div>

        <div className="chega relative mx-auto w-full max-w-md" style={v({ "--atraso": "0.2s" })}>
          <div aria-hidden className="absolute inset-4 rotate-6 rounded-[42%_58%_55%_45%/48%_42%_58%_52%] bg-rosa/45" />
          <div aria-hidden className="absolute inset-0 -rotate-3 rounded-[55%_45%_42%_58%/45%_55%_45%_55%] bg-suave" />
          <div className="relative p-9 md:p-12">
            <Image
              src={hero.imagem || "/marca/logo.webp"}
              alt="Três Amores Brechó Infantil"
              width={900}
              height={812}
              preload
              sizes="(min-width: 768px) 420px, 90vw"
              className="h-auto w-full"
            />
          </div>
          {hero.recado ? (
            <p className="absolute -bottom-5 right-0 -rotate-3 rounded-2xl bg-fundo px-4 py-1.5 font-recado text-2xl text-rosa-escuro shadow-[4px_4px_0_var(--color-pessego)]">
              {hero.recado}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
