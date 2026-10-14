import Image from "next/image";
import Link from "next/link";
import { waLink } from "@/lib/wa";

const NAV = [
  { href: "#categorias", label: "Na loja" },
  { href: "#desapego", label: "Desapegar" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Header({ nome, whatsapp }: { nome: string; whatsapp: string }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-dashed border-pessego bg-fundo/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" aria-label={nome} className="shrink-0">
          <Image src="/marca/logo.webp" alt={nome} width={900} height={812} preload className="h-14 w-auto md:h-16" />
        </Link>
        <nav aria-label="Seções" className="hidden items-center gap-7 font-display text-[1.05rem] font-semibold md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-menta-escura transition-colors hover:text-rosa-escuro">
              {n.label}
            </a>
          ))}
        </nav>
        {whatsapp ? (
          <a
            href={waLink(whatsapp, "Olá! Vim pelo site do Três Amores.")}
            target="_blank"
            rel="noopener noreferrer"
            className="adesivo rounded-full bg-destaque px-5 py-2.5 font-display text-base font-bold text-destaque-texto [--adesivo-cor:var(--color-rosa)]"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    </header>
  );
}
