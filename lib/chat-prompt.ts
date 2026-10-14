// Prompt de sistema do chatbot. Montado só com o conteúdo do site (getSettings), sem data nem
// valor variável: o texto fica idêntico entre requisições e aproveita o cache de prompt.
import type { Manifest } from "./manifest";
import type { SiteSettings } from "./types";

export const CHAT_LIMITES = { mensagens: 16, caracteres: 800 } as const;

export function chatSystemPrompt(m: Manifest, s: SiteSettings): string {
  const onde = s.contato.endereco || (m.local ? `${m.local.cidade}/${m.local.uf}` : "");
  return [
    `Você é a assistente virtual do ${m.nome}, um brechó infantil${m.local ? ` em ${m.local.cidade}/${m.local.uf}` : ""}. Você conversa com mães, pais e familiares pelo site da loja.`,
    "",
    "Como responder:",
    "- Português do Brasil, tom acolhedor e direto, como uma atendente simpática da loja. Respostas curtas (até 3 frases), em texto corrido, sem markdown, listas ou títulos.",
    "- Use apenas as informações abaixo. Elas são tudo o que você sabe sobre a loja.",
    "- Você não tem acesso a estoque, preços, percentuais de consignação, saldo de clientes nem ao endereço exato quando ele não estiver abaixo. Para qualquer uma dessas coisas, ou para o que não estiver aqui, diga que a equipe confirma pelo WhatsApp e convide a pessoa a tocar no botão do WhatsApp do site. Nunca estime nem invente.",
    "- Assuntos sem relação com a loja: diga com gentileza que você só ajuda com dúvidas sobre o Três Amores.",
    "- Não peça dados pessoais.",
    "",
    "Sobre a loja:",
    s.sobre.texto,
    "",
    "O que a loja vende (de 0 a 14 anos):",
    ...s.categorias.itens.map((c) => `- ${c.nome}: ${c.descricao}`),
    "",
    "Como funciona o desapego (consignação):",
    ...s.consignacao.passos.map((p, i) => `${i + 1}. ${p.titulo}: ${p.texto}`),
    "",
    "Perguntas frequentes:",
    ...s.faq.itens.map((f) => `- ${f.pergunta} ${f.resposta}`),
    "",
    "Atendimento:",
    ...s.contato.horarios.map((h) => `- ${h}`),
    onde ? `- Onde: ${onde}` : "",
    s.contato.instagram ? `- Instagram: ${s.contato.instagram}` : "",
  ]
    .filter((l, i, arr) => l !== "" || arr[i - 1] !== "")
    .join("\n");
}

export type ChatMensagem = { role: "user" | "assistant"; content: string };

/** Valida o histórico vindo do navegador. Devolve null se algo estiver fora do contrato. */
export function validarHistorico(entrada: unknown): ChatMensagem[] | null {
  if (!Array.isArray(entrada) || entrada.length === 0 || entrada.length > CHAT_LIMITES.mensagens) return null;
  const out: ChatMensagem[] = [];
  for (const [i, m] of entrada.entries()) {
    if (typeof m !== "object" || m === null) return null;
    const { role, content } = m as Record<string, unknown>;
    const esperado = i % 2 === 0 ? "user" : "assistant";
    if (role !== esperado) return null;
    if (typeof content !== "string") return null;
    const texto = content.trim();
    if (!texto || texto.length > CHAT_LIMITES.caracteres) return null;
    out.push({ role: esperado, content: texto });
  }
  return out.length % 2 === 1 ? out : null;
}
