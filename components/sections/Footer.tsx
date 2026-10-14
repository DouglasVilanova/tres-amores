import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteSettings } from "@/lib/types";

export function Footer({ nome, contato }: { nome: string; contato: SiteSettings["contato"] }) {
  return (
    <footer className="relative overflow-hidden">
      <div
        aria-hidden
        className="deco mx-auto mt-10 h-24 w-[min(92%,44rem)] opacity-80"
        style={{ "--deco-img": "url(/marca/elementos.webp)", "--deco-cor": "var(--color-pessego)" } as CSSProperties}
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 pb-28 pt-6 text-center md:pb-12">
        <Image src="/marca/logo-linha.webp" alt={nome} width={900} height={808} className="h-24 w-auto" />
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-display text-lg font-semibold text-menta-escura">
          {contato.instagram ? (
            <li>
              <a href={contato.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-rosa-escuro">
                Instagram
              </a>
            </li>
          ) : null}
          {contato.facebook ? (
            <li>
              <a href={contato.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-rosa-escuro">
                Facebook
              </a>
            </li>
          ) : null}
          {contato.telefone ? <li>{contato.telefone}</li> : null}
        </ul>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} {nome}
        </p>
      </div>
    </footer>
  );
}
