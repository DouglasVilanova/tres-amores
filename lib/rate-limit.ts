// Rate limit em memória do processo (vale por instância serverless).
export type RateResult = { ok: boolean; retryAfterMs: number };

const buckets = new Map<string, { count: number; resetAt: number }>();
const MAX_CHAVES = 10_000;

export async function rateLimit(key: string, limit: number, windowMs: number): Promise<RateResult> {
  const now = Date.now();
  if (buckets.size > MAX_CHAVES) {
    for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
  }
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }
  if (b.count >= limit) return { ok: false, retryAfterMs: b.resetAt - now };
  b.count += 1;
  return { ok: true, retryAfterMs: 0 };
}
