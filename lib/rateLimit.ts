import { NextResponse } from "next/server";

/**
 * In-memory per-instance rate limit. Good enough for form abuse on a small
 * site; a shared store (KV) is needed only if traffic grows across regions.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  bucket.count += 1;
  return { allowed: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) };
}

export function rateLimit(req: Request, scope: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const key = `${scope}:${clientIp(req)}`;
  const result = checkRateLimit(key, limit, windowMs);
  if (result.allowed) return null;
  return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
}
