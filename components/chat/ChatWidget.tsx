"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatTopico } from "@/lib/chat-topicos";
import type { SiteSettings } from "@/lib/types";
import { waLink } from "@/lib/wa";

type Mensagem = { de: "loja" | "cliente"; texto: string; whatsapp?: string };

function IconeWhats() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 fill-current">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

// Atendimento por menu: a pessoa escolhe a pergunta, a resposta é fixa (lib/chat-topicos.ts).
export function ChatWidget({ chat, topicos, whatsapp }: { chat: SiteSettings["chat"]; topicos: ChatTopico[]; whatsapp: string }) {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const fim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fim.current?.scrollIntoView({ block: "end" });
  }, [mensagens, aberto]);

  function escolher(t: ChatTopico) {
    setMensagens((m) => [...m, { de: "cliente", texto: t.pergunta }, { de: "loja", texto: t.resposta, whatsapp: t.whatsapp }]);
  }

  const wa = (texto = "Olá! Vim pelo site do Três Amores.") => (whatsapp ? waLink(whatsapp, texto) : "");

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {aberto ? (
        <section
          aria-label={chat.nome}
          className="flex h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2rem] bg-fundo shadow-[8px_8px_0_var(--color-rosa)] ring-2 ring-rosa"
        >
          <header className="flex items-center justify-between gap-3 bg-rosa px-5 py-3 text-[#5a1626]">
            <p className="font-display text-lg font-bold leading-tight">{chat.nome}</p>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar atendimento"
              className="grid h-9 w-9 place-items-center rounded-full bg-fundo/70 text-xl leading-none"
            >
              ×
            </button>
          </header>

          <div aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <p className="max-w-[88%] rounded-3xl rounded-tl-md bg-suave px-4 py-2.5 leading-snug">{chat.saudacao}</p>
            {mensagens.map((m, i) =>
              m.de === "cliente" ? (
                <p key={i} className="ml-auto w-fit max-w-[88%] rounded-3xl rounded-tr-md bg-menta-escura px-4 py-2.5 leading-snug text-white">
                  {m.texto}
                </p>
              ) : (
                <div key={i} className="w-fit max-w-[92%] rounded-3xl rounded-tl-md bg-suave px-4 py-2.5 leading-snug">
                  <p className="whitespace-pre-line">{m.texto}</p>
                  {m.whatsapp && whatsapp ? (
                    <a
                      href={wa(m.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block font-bold text-menta-escura underline decoration-dashed underline-offset-4"
                    >
                      Continuar no WhatsApp
                    </a>
                  ) : null}
                </div>
              ),
            )}
            <div className="pt-1">
              <p className="mb-2 text-sm font-bold text-menta-escura">{mensagens.length ? "Posso ajudar em mais alguma coisa?" : "Escolha um assunto:"}</p>
              <div className="flex flex-wrap gap-2">
                {topicos.map((t) => (
                  <button
                    key={t.pergunta}
                    type="button"
                    onClick={() => escolher(t)}
                    className="rounded-full border-2 border-destaque px-3.5 py-1.5 text-left text-sm font-bold text-menta-escura transition-colors hover:bg-[#e3f5f1]"
                  >
                    {t.pergunta}
                  </button>
                ))}
              </div>
            </div>
            <div ref={fim} />
          </div>

          {whatsapp ? (
            <a
              href={wa()}
              target="_blank"
              rel="noopener noreferrer"
              className="m-3 rounded-full bg-menta-escura px-4 py-3 text-center font-display text-lg font-bold text-white"
            >
              Falar com a equipe no WhatsApp
            </a>
          ) : null}
        </section>
      ) : null}

      <div className="flex items-center gap-3">
        {whatsapp ? (
          <a
            href={wa()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar no WhatsApp"
            className="adesivo grid h-14 w-14 place-items-center rounded-full bg-menta-escura text-white [--adesivo-cor:var(--color-destaque)]"
          >
            <IconeWhats />
          </a>
        ) : null}
        {chat.ativo ? (
          <button
            type="button"
            onClick={() => setAberto((a) => !a)}
            aria-expanded={aberto}
            className="adesivo rounded-full bg-rosa px-5 py-3.5 font-display text-lg font-bold text-[#5a1626] [--adesivo-cor:var(--color-pessego)]"
          >
            {aberto ? "Fechar" : "Tirar uma dúvida"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
