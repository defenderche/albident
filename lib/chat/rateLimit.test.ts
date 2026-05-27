import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  GLOBAL_LIMIT,
  IP_LIMIT,
  TTL_SECONDS,
  checkChatRateLimit,
  type RateLimitDeps,
} from "./rateLimit";

type MockDeps = RateLimitDeps & {
  incrMock: ReturnType<typeof vi.fn>;
  expireMock: ReturnType<typeof vi.fn>;
};

function makeMockDeps(counts: Record<string, number> = {}): MockDeps {
  const store = new Map<string, number>(Object.entries(counts));
  const incrMock = vi.fn(async (key: string) => {
    const next = (store.get(key) ?? 0) + 1;
    store.set(key, next);
    return next;
  });
  const expireMock = vi.fn(async () => undefined);
  return {
    incr: incrMock,
    expire: expireMock,
    incrMock,
    expireMock,
  };
}

const FIXED_DATE = "2026-05-27";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(`${FIXED_DATE}T12:00:00Z`));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("checkChatRateLimit — allowed", () => {
  it("разрешает запрос, когда оба счётчика под лимитом", async () => {
    const deps = makeMockDeps();
    const result = await checkChatRateLimit("1.1.1.1", deps);
    expect(result).toEqual({ allowed: true });
  });

  it("ставит TTL на первом инкременте IP-ключа и глобального ключа", async () => {
    const deps = makeMockDeps();
    await checkChatRateLimit("1.1.1.1", deps);
    expect(deps.expireMock).toHaveBeenCalledWith(
      `chat:ip:1.1.1.1:${FIXED_DATE}`,
      TTL_SECONDS,
    );
    expect(deps.expireMock).toHaveBeenCalledWith(
      `chat:global:${FIXED_DATE}`,
      TTL_SECONDS,
    );
  });

  it("не ставит TTL при последующих инкрементах", async () => {
    const deps = makeMockDeps({
      [`chat:ip:1.1.1.1:${FIXED_DATE}`]: 5,
      [`chat:global:${FIXED_DATE}`]: 50,
    });
    await checkChatRateLimit("1.1.1.1", deps);
    expect(deps.expireMock).not.toHaveBeenCalled();
  });
});

describe("checkChatRateLimit — IP лимит", () => {
  it("блокирует с reason='ip', если IP-счётчик превышен", async () => {
    const deps = makeMockDeps({
      [`chat:ip:1.1.1.1:${FIXED_DATE}`]: IP_LIMIT,
    });
    const result = await checkChatRateLimit("1.1.1.1", deps);
    expect(result).toEqual({ allowed: false, reason: "ip" });
  });

  it("не трогает глобальный счётчик, когда IP уже превышен", async () => {
    const deps = makeMockDeps({
      [`chat:ip:1.1.1.1:${FIXED_DATE}`]: IP_LIMIT,
    });
    await checkChatRateLimit("1.1.1.1", deps);
    const globalCalls = deps.incrMock.mock.calls.filter(
      ([key]) => key === `chat:global:${FIXED_DATE}`,
    );
    expect(globalCalls).toHaveLength(0);
  });

  it("разрешает запрос ровно на лимите (20-й)", async () => {
    const deps = makeMockDeps({
      [`chat:ip:1.1.1.1:${FIXED_DATE}`]: IP_LIMIT - 1,
    });
    const result = await checkChatRateLimit("1.1.1.1", deps);
    expect(result).toEqual({ allowed: true });
  });
});

describe("checkChatRateLimit — глобальный лимит", () => {
  it("блокирует с reason='global', если общий счётчик превышен", async () => {
    const deps = makeMockDeps({
      [`chat:global:${FIXED_DATE}`]: GLOBAL_LIMIT,
    });
    const result = await checkChatRateLimit("1.1.1.1", deps);
    expect(result).toEqual({ allowed: false, reason: "global" });
  });

  it("разрешает запрос ровно на лимите (300-й)", async () => {
    const deps = makeMockDeps({
      [`chat:global:${FIXED_DATE}`]: GLOBAL_LIMIT - 1,
    });
    const result = await checkChatRateLimit("1.1.1.1", deps);
    expect(result).toEqual({ allowed: true });
  });
});

describe("checkChatRateLimit — fail-open", () => {
  it("при ошибке incr возвращает allowed: true", async () => {
    const deps: RateLimitDeps = {
      incr: async () => {
        throw new Error("KV down");
      },
      expire: async () => undefined,
    };
    const result = await checkChatRateLimit("1.1.1.1", deps);
    expect(result).toEqual({ allowed: true });
  });

  it("при отсутствии env-переменных возвращает allowed: true без вызова KV", async () => {
    const previousUrl = process.env.KV_REST_API_URL;
    const previousToken = process.env.KV_REST_API_TOKEN;
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    try {
      const result = await checkChatRateLimit("1.1.1.1");
      expect(result).toEqual({ allowed: true });
    } finally {
      if (previousUrl !== undefined) process.env.KV_REST_API_URL = previousUrl;
      if (previousToken !== undefined)
        process.env.KV_REST_API_TOKEN = previousToken;
    }
  });
});
