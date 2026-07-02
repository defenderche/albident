import { Redis } from "@upstash/redis";

export const IP_LIMIT = 20;
export const GLOBAL_LIMIT = 300;
export const TTL_SECONDS = 24 * 60 * 60;

export type RateLimitDeps = {
  incr(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<unknown>;
};

export type RateLimitReason = "ip" | "global";

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: RateLimitReason };

export async function checkChatRateLimit(
  ip: string,
  depsOverride?: RateLimitDeps,
): Promise<RateLimitResult> {
  const deps = depsOverride ?? getDefaultDeps();
  if (!deps) {
    console.error("Vercel KV is not configured; rate limit skipped");
    return { allowed: true };
  }

  const date = currentDateKey();
  try {
    const ipKey = `chat:ip:${ip}:${date}`;
    const ipCount = await deps.incr(ipKey);
    if (ipCount === 1) await deps.expire(ipKey, TTL_SECONDS);
    if (ipCount > IP_LIMIT) {
      return { allowed: false, reason: "ip" };
    }

    const globalKey = `chat:global:${date}`;
    const globalCount = await deps.incr(globalKey);
    if (globalCount === 1) await deps.expire(globalKey, TTL_SECONDS);
    if (globalCount > GLOBAL_LIMIT) {
      return { allowed: false, reason: "global" };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Rate limit check failed (fail-open)", error);
    return { allowed: true };
  }
}

function currentDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

let cachedRedis: Redis | null = null;

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return null;
  }
  cachedRedis ??= new Redis({ url, token });
  return cachedRedis;
}

function getDefaultDeps(): RateLimitDeps | null {
  const redis = getRedis();
  if (!redis) {
    return null;
  }
  return {
    incr: (key) => redis.incr(key),
    expire: (key, seconds) => redis.expire(key, seconds),
  };
}
