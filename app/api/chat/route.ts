// Chatbot do site. Sem banco: o histórico vive no navegador e vem inteiro a cada pergunta.
// A chave da Anthropic fica só no servidor (ANTHROPIC_API_KEY); sem ela a rota responde 503
// e o widget oferece o WhatsApp.
import Anthropic from "@anthropic-ai/sdk";
import { chatSystemPrompt, validarHistorico } from "@/lib/chat-prompt";
import { manifest } from "@/lib/manifest";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request-ip";
import { getSettings } from "@/lib/settings-read";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODELO = process.env.CHAT_MODEL || "claude-opus-5-5";
const SEM_RESPOSTA = "Essa eu prefiro que a equipe te responda. Chama a gente no WhatsApp pelo botão aqui do site!";

function erro(status: number, codigo: string, extra?: HeadersInit) {
  return Response.json({ erro: codigo }, { status, headers: extra });
}

export async function POST(req: Request) {
  // Só o próprio site chama esta rota.
  const origem = req.headers.get("origin");
  if (origem && new URL(origem).host !== req.headers.get("host")) return erro(403, "origem");

  if (!process.env.ANTHROPIC_API_KEY) return erro(503, "indisponivel");

  const limite = await rateLimit(`chat:${await clientIp()}`, 15, 10 * 60_000);
  if (!limite.ok) return erro(429, "limite", { "Retry-After": String(Math.ceil(limite.retryAfterMs / 1000)) });

  const corpo = (await req.json().catch(() => null)) as { mensagens?: unknown } | null;
  const mensagens = validarHistorico(corpo?.mensagens);
  if (!mensagens) return erro(400, "invalido");

  const settings = await getSettings();
  if (!settings.chat.ativo) return erro(503, "indisponivel");

  const client = new Anthropic();
  const stream = client.messages.stream({
    model: MODELO,
    max_tokens: 2000,
    output_config: { effort: "low" },
    system: [{ type: "text", text: chatSystemPrompt(manifest, settings), cache_control: { type: "ephemeral" } }],
    messages: mensagens,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let enviou = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            enviou = true;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal" || !enviou) controller.enqueue(encoder.encode(SEM_RESPOSTA));
      } catch (e) {
        if (e instanceof Anthropic.RateLimitError) console.error("[chat] limite da API");
        else if (e instanceof Anthropic.APIError) console.error(`[chat] API ${e.status}: ${e.message}`);
        else console.error("[chat]", e);
        if (!enviou) controller.enqueue(encoder.encode(SEM_RESPOSTA));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" },
  });
}
