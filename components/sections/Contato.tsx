import type { SiteSettings } from "@/lib/types";
import { ContatoForm } from "./ContatoForm";

export function Contato({ contato, cidade }: { contato: SiteSettings["contato"]; cidade: string }) {
  return (
    <section id="contato" className="bg-menta-escura text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">{contato.titulo}</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90">{contato.subtitulo}</p>
          <dl className="mt-10 space-y-6 text-lg">
            {contato.horarios.length > 0 ? (
              <div>
                <dt className="font-display text-xl font-bold text-pessego">Horário</dt>
                {contato.horarios.map((h) => (
                  <dd key={h}>{h}</dd>
                ))}
              </div>
            ) : null}
            <div>
              <dt className="font-display text-xl font-bold text-pessego">Onde</dt>
              <dd>{contato.endereco || cidade}</dd>
            </div>
            {contato.email ? (
              <div>
                <dt className="font-display text-xl font-bold text-pessego">E-mail</dt>
                <dd>
                  <a href={`mailto:${contato.email}`} className="underline decoration-dashed underline-offset-4">
                    {contato.email}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        {contato.whatsapp ? <ContatoForm whatsapp={contato.whatsapp} /> : null}
      </div>
    </section>
  );
}
