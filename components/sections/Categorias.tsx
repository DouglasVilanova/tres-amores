import type { CSSProperties } from "react";
import type { SiteSettings } from "@/lib/types";

const FUNDOS = ["bg-suave", "bg-[#e3f5f1]", "bg-[#fde6eb]"];
const GIROS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

export function Categorias({ categorias }: { categorias: SiteSettings["categorias"] }) {
  return (
    <section id="categorias" className="mx-auto max-w-6xl px-4 py-24">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight text-menta-escura md:text-5xl">{categorias.titulo}</h2>
        <p className="mt-4 text-lg leading-relaxed">{categorias.subtitulo}</p>
      </div>
      <ul className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {categorias.itens.map((c, i) => (
          <li
            key={c.nome}
            className={`etiqueta px-7 pb-7 pt-12 ${FUNDOS[i % FUNDOS.length]}`}
            style={{ "--giro": GIROS[i % GIROS.length] } as CSSProperties}
          >
            <h3 className="font-display text-2xl font-bold text-menta-escura">{c.nome}</h3>
            <p className="mt-2 leading-relaxed">{c.descricao}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
