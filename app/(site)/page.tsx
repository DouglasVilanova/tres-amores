import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Categorias } from "@/components/sections/Categorias";
import { Consignacao } from "@/components/sections/Consignacao";
import { Contato } from "@/components/sections/Contato";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Numeros } from "@/components/sections/Numeros";
import { Sobre } from "@/components/sections/Sobre";
import { organizacaoLd } from "@/lib/jsonld";
import { manifest, siteUrl } from "@/lib/manifest";
import { getSettings } from "@/lib/settings-read";

// Estático, revalidado a cada hora.
export const revalidate = 3600;

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const s = await getSettings();
  const cidade = manifest.local ? `${manifest.local.cidade}/${manifest.local.uf}` : "";
  return (
    <>
      <JsonLd data={organizacaoLd(manifest, s, siteUrl(manifest))} />
      <Hero hero={s.hero} />
      {s.visibilidade.numeros ? <Numeros numeros={s.numeros} /> : null}
      {s.visibilidade.categorias ? <Categorias categorias={s.categorias} /> : null}
      {s.visibilidade.consignacao ? <Consignacao consignacao={s.consignacao} whatsapp={s.contato.whatsapp} /> : null}
      {s.visibilidade.sobre ? <Sobre sobre={s.sobre} /> : null}
      {s.visibilidade.faq ? <Faq faq={s.faq} /> : null}
      <Contato contato={s.contato} cidade={cidade} />
    </>
  );
}
