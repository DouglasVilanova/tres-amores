"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { ChatMensagem } from "@/lib/chat-prompt";
import type { SiteSettings } from "@/lib/types";
import { waLink } from "@/lib/wa";

const ERROS: Record<string, string> = {
  limite: "Recebi muitas mensagens agora. Tenta de novo em alguns minutos, ou chama a gente no WhatsApp.",
  padrao: "Não consegui responder agora. Chama a gente no WhatsApp que a equipe te atende!",
};

function IconeWhats() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 fill-current">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.600-1.200.1-.1 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.100-.7.300-.200.300-.900.900-.900 2.200s.900 2.500 1.100 2.700c.100.200 1.800 2.800 4.400 3.900 1.600.700 2.300.700 3.100.600.500-.100 1.500-.600 1.700-1.200.200-.600.200-1.100.100-1.200-.100-.100-.200-.200-.500-.300Z" />
    </svg>
  );
}

export function ChatWidget({ chat, whatsapp }: { chat: SiteSettings["chat"]; whatsapp: string }) {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<ChatMensagem[]>([]);
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState("");
  const fim = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fim.current?.scrollIntoView({ block: "end" });
  }, [mensagens, erro]);

  useEffect(() => {
    if (aberto) campo.current?.focus();
  }, [aberto]);

  async function perguntar(pergunta: string) {
    const limpa = pergunta.trim();
    if (!limpa || ocupado) return;
    const historico: ChatMensagem[] = [...mensagens.slice(-14), { role: "user", content: limpa }];
    setMensagens([...historico, { role: "assistant", content: "" }]);
    setTexto("");
    setErro("");
    setOcupado(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagens: historico }),
      });
      if (!res.ok || !res.body) {
        const codigo = ((await res.json().catch(() => null)) as { erro?: string } | null)?.erro ?? "";
        throw new Error(codigo);
      }
      const leitor = res.body.getReader();
      const decoder = new TextDecoder();
      let resposta = "";
      for (;;) {
        const { done, value } = await leitor.read();
        if (done) break;
        resposta += decoder.decode(value, { stream: true });
        setMensagens([...historico, { role: "assistant", content: resposta }]);
      }
    } catch (e) {
      setMensagens(historico.slice(0, -1));
      setTexto(limpa);
      setErro(ERROS[e instanceof Error ? e.message : ""] ?? ERROS.padrao);
    } finally {
      setOcupado(false);
    }
  }

  function enviar(e: FormEvent) {
    e.preventDefault();
    void perguntar(texto);
  }

  const wa = whatsapp ? waLink(whatsapp, "Olá! Vim pelo site do Três Amores.") : "";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {aberto ? (
        <section
          aria-label={chat.nome}
          className="flex h-[min(34rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[2rem] bg-fundo shadow-[8px_8px_0_var(--color-rosa)] ring-2 ring-rosa"
        >
          <header className="flex items-center justify-between gap-3 bg-rosa px-5 py-3 text-[#5a1626]">
            <p className="font-display text-lg font-bold leading-tight">{chat.nome}</p>
            <button type="button" onClick={() => setAberto(false)} aria-label="Fechar conversa" className="grid h-9 w-9 place-items-center rounded-full bg-fundo/70 text-xl leading-none">
              ×
            </button>
          </header>

          <div aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <p className="max-w-[88%] rounded-3xl rounded-tl-md bg-suave px-4 py-2.5 leading-snug">{chat.saudacao}</p>
            {mensagens.length === 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {chat.sugestoes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void perguntar(s)}
                    className="rounded-full border-2 border-destaque px-3.5 py-1.5 text-left text-sm font-bold text-menta-escura transition-colors hover:bg-[#e3f5f1]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
            {mensagens.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="ml-auto w-fit max-w-[88%] rounded-3xl rounded-tr-md bg-menta-escura px-4 py-2.5 leading-snug text-white">
                  {m.content}
                </p>
              ) : (
                <p key={i} className="w-fit max-w-[88%] whitespace-pre-line rounded-3xl rounded-tl-md bg-suave px-4 py-2.5 leading-snug">
                  {m.content || (
                    <span aria-label="Escrevendo" className="inline-flex gap-1 py-1.5">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-2 w-2 rounded-full bg-menta-escura" style={{ animation: `pisca 1.2s ${d * 0.2}s infinite` }} />
                      ))}
                    </span>
                  )}
                </p>
              ),
            )}
            {erro ? (
              <p role="alert" className="rounded-3xl bg-[#fde6eb] px-4 py-2.5 leading-snug text-[#5a1626]">
                {erro}{" "}
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                    Abrir WhatsApp
                  </a>
                ) : null}
              </p>
            ) : null}
            <div ref={fim} />
          </div>

          <form onSubmit={enviar} className="flex items-center gap-2 border-t-2 border-dashed border-pessego p-3">
            <input
              ref={campo}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={500}
              placeholder="Escreva sua dúvida"
              aria-label="Sua mensagem"
              className="min-w-0 flex-1 rounded-full bg-suave px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-menta-escura"
            />
            <button type="submit" disabled={ocupado || !texto.trim()} className="rounded-full bg-menta-escura px-4 py-2.5 font-display font-bold text-white disabled:opacity-50">
              Enviar
            </button>
          </form>
          <p className="px-4 pb-3 text-center text-xs opacity-70">Assistente com inteligência artificial. Preço e estoque, só com a equipe no WhatsApp.</p>
        </section>
      ) : null}

      <div className="flex items-center gap-3">
        {wa ? (
          <a
            href={wa}
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
