// Atendimento por menu (sem IA): cada tópico é uma pergunta com resposta pronta, montada a partir
// do próprio conteúdo do site. Mudou o texto do site, mudou a resposta.
import type { SiteSettings } from "./types";

export type ChatTopico = { pergunta: string; resposta: string; whatsapp?: string };

export function chatTopicos(s: SiteSettings, cidade: string): ChatTopico[] {
  const c = s.consignacao;
  const onde = s.contato.endereco || cidade;
  const topicos: ChatTopico[] = [
    {
      pergunta: "Como funciona o desapego?",
      resposta: [c.subtitulo, ...c.passos.map((p, i) => `${i + 1}. ${p.titulo}: ${p.texto}`)].join("\n"),
      whatsapp: c.ctaMensagem,
    },
    {
      pergunta: "O que tem na loja?",
      resposta: [`${s.categorias.subtitulo}`, ...s.categorias.itens.map((i) => `• ${i.nome}: ${i.descricao}`)].join("\n"),
      whatsapp: "Olá! Estou procurando uma peça. Vocês têm?",
    },
    {
      pergunta: "Horário e endereço",
      resposta: [...s.contato.horarios, onde ? `Onde: ${onde}` : ""].filter(Boolean).join("\n"),
    },
    {
      pergunta: "Consultar meu saldo",
      resposta: c.saldoHref
        ? `Seu saldo e suas peças ficam no seu link pessoal: ${c.saldoHref}`
        : "Seu saldo e suas peças ficam no seu link pessoal do nosso sistema. Não achou o link? Chama a gente no WhatsApp que a equipe reenvia.",
      whatsapp: "Olá! Quero consultar meu saldo de consignação.",
    },
    ...s.faq.itens
      .filter((f) => !/idades|acompanho|saldo/i.test(f.pergunta))
      .map((f) => ({ pergunta: f.pergunta, resposta: f.resposta })),
  ];
  return topicos.filter((t) => t.resposta.trim());
}
