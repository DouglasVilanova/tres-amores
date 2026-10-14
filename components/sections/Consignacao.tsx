import type { CSSProperties } from "react";
import type { SiteSettings } from "@/lib/types";
import { waLink } from "@/lib/wa";

export function Consignacao({ consignacao, whatsapp }: { consignacao: SiteSettings["consignacao"]; whatsapp: string }) {
  const c = consignacao;
  return (
    <section id="desapego" className="relative overflow-hidden bg-suave">
      <div
        aria-hidden
        className="deco absolute right-[5%] top-8 hidden h-28 w-[26rem] opacity-90 lg:block"
        style={{ "--deco-img": "url(/marca/elementos.webp)", "--deco-cor": "var(--color-destaque)" } as CSSProperties}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-24">
        <p className="inline-block -rotate-2 font-recado text-4xl text-rosa-escuro">{c.selo}</p>
        <h2 className="mt-1 max-w-2xl font-display text-4xl font-extrabold leading-tight text-menta-escura md:text-5xl">{c.titulo}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed">{c.subtitulo}</p>

        <div className="relative mt-16">
          <div aria-hidden className="trilha absolute left-[6%] right-[6%] top-7 hidden md:block" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {c.passos.map((p, i) => (
              <li key={p.titulo}>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-fundo font-display text-2xl font-extrabold text-rosa-escuro shadow-[4px_4px_0_var(--color-rosa)]">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-menta-escura">{p.titulo}</h3>
                <p className="mt-2 leading-relaxed">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          {c.ctaLabel && whatsapp ? (
            <a
              href={waLink(whatsapp, c.ctaMensagem)}
              target="_blank"
              rel="noopener noreferrer"
              className="adesivo rounded-full bg-menta-escura px-7 py-3.5 font-display text-lg font-bold text-white [--adesivo-cor:var(--color-rosa)]"
            >
              {c.ctaLabel}
            </a>
          ) : null}
          {c.saldoHref ? (
            <a
              href={c.saldoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-menta-escura px-7 py-3 font-display text-lg font-bold text-menta-escura transition-colors hover:bg-fundo"
            >
              {c.saldoLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
