"use client";

import { useState, type FormEvent } from "react";
import { waLink } from "@/lib/wa";

const ASSUNTOS = ["Quero desapegar peças", "Procuro uma peça", "Consultar meu saldo", "Outra dúvida"];

const campo =
  "mt-1.5 w-full rounded-2xl border-2 border-transparent bg-suave px-4 py-3 font-sans font-normal text-texto focus:border-menta-escura focus:outline-none";

// Sem banco: o formulário monta a mensagem e abre a conversa no WhatsApp da loja.
export function ContatoForm({ whatsapp }: { whatsapp: string }) {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState(ASSUNTOS[0]);
  const [mensagem, setMensagem] = useState("");

  function enviar(e: FormEvent) {
    e.preventDefault();
    const extra = mensagem.trim() ? `\n${mensagem.trim()}` : "";
    window.open(waLink(whatsapp, `Olá! Sou ${nome.trim()}.\n${assunto}.${extra}`), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={enviar} className="rounded-[2.5rem] bg-fundo p-7 text-texto shadow-[8px_8px_0_var(--color-rosa)] md:p-9">
      <label className="block font-display text-lg font-bold text-menta-escura">
        Seu nome
        <input required maxLength={60} value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="given-name" className={campo} />
      </label>
      <label className="mt-5 block font-display text-lg font-bold text-menta-escura">
        Como podemos ajudar?
        <select value={assunto} onChange={(e) => setAssunto(e.target.value)} className={campo}>
          {ASSUNTOS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <label className="mt-5 block font-display text-lg font-bold text-menta-escura">
        Mensagem <span className="font-sans text-sm font-normal opacity-70">(opcional)</span>
        <textarea rows={3} maxLength={400} value={mensagem} onChange={(e) => setMensagem(e.target.value)} className={`${campo} resize-none`} />
      </label>
      <button type="submit" className="adesivo mt-7 w-full rounded-full bg-menta-escura px-7 py-3.5 font-display text-lg font-bold text-white">
        Enviar pelo WhatsApp
      </button>
      <p className="mt-3 text-center text-sm opacity-75">Abre a conversa no WhatsApp da loja com a sua mensagem pronta.</p>
    </form>
  );
}
