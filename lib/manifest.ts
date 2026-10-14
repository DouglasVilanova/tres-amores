// Dados fixos do site (site.json na raiz).
// Import relativo (não "@/") porque next.config.ts também importa este arquivo.
import raw from "../site.json";

export type Status = "desenvolvimento" | "online";

export type Manifest = {
  nome: string;
  status: Status;
  local: { cidade: string; uf: string } | null;
  dominio: string;
  preview: string;
};

export const manifest = raw as Manifest;

/** Só indexa quando publicado no domínio final. */
export function indexavel(m: Manifest): boolean {
  return m.status === "online";
}

export function siteUrl(m: Manifest, envUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  if (envUrl) return envUrl.replace(/\/+$/, "");
  if (m.status === "online" && m.dominio) return `https://${m.dominio}`;
  if (m.preview) return `https://${m.preview}`;
  return "http://localhost:3000";
}
