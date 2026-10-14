// Content-Security-Policy do site. 'unsafe-inline' em script-src: o App Router injeta
// scripts inline de hidratação.
export function buildCsp(opcoes: { dev: boolean }): string {
  const d: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'"],
    "frame-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'self'"],
  };
  if (opcoes.dev) d["script-src"].push("'unsafe-eval'");
  return Object.entries(d)
    .map(([nome, valores]) => `${nome} ${valores.join(" ")}`)
    .join("; ");
}
