import type { SiteSettings } from "@/lib/types";

export function Faq({ faq }: { faq: SiteSettings["faq"] }) {
  if (faq.itens.length === 0) return null;
  return (
    <section id="duvidas" className="mx-auto max-w-3xl px-4 pb-24">
      <h2 className="font-display text-4xl font-extrabold leading-tight text-menta-escura md:text-5xl">{faq.titulo}</h2>
      <div className="mt-10 space-y-4">
        {faq.itens.map((f) => (
          <details key={f.pergunta} className="group rounded-3xl bg-suave px-6 py-5 open:bg-[#e3f5f1]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold text-menta-escura [&::-webkit-details-marker]:hidden">
              {f.pergunta}
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fundo text-2xl leading-none text-rosa-escuro transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-lg leading-relaxed">{f.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
