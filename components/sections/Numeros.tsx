import type { SiteSettings } from "@/lib/types";

const CORES = ["bg-destaque text-destaque-texto", "bg-rosa text-[#5a1626]", "bg-pessego text-[#5b3a05]"];

export function Numeros({ numeros }: { numeros: SiteSettings["numeros"] }) {
  if (numeros.itens.length === 0) return null;
  return (
    <section aria-label="Três Amores em números" className="mx-auto max-w-6xl px-4">
      <ul className="grid gap-5 md:grid-cols-3">
        {numeros.itens.map((n, i) => (
          <li key={n.valor} className={`rounded-[2rem] px-7 py-6 ${CORES[i % CORES.length]}`}>
            <p className="font-display text-5xl font-extrabold leading-none">{n.valor}</p>
            <p className="mt-2 text-base font-semibold leading-snug">{n.rotulo}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
