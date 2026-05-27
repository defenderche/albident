import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  HISTORY_STORAGE_KEY,
  SESSION_MESSAGE_LIMIT,
  clearHistory,
  countUserMessages,
  isSessionLimitReached,
  loadHistory,
  saveHistory,
  type ChatMessage,
} from "./storage";

function makeMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      return store.get(key) ?? null;
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key) {
      store.delete(key);
    },
    setItem(key, value) {
      store.set(key, value);
    },
  };
}

const userMessage = (i: number): ChatMessage => ({
  id: `u-${i}`,
  role: "user",
  content: `hi ${i}`,
  createdAt: i,
});

const assistantMessage = (i: number): ChatMessage => ({
  id: `a-${i}`,
  role: "assistant",
  content: `hello ${i}`,
  createdAt: i,
});

beforeEach(() => {
  (globalThis as { sessionStorage?: Storage }).sessionStorage =
    makeMemoryStorage();
});

afterEach(() => {
  delete (globalThis as { sessionStorage?: Storage }).sessionStorage;
});

describe("loadHistory / saveHistory", () => {
  it("возвращает пустой массив, если в хранилище ничего нет", () => {
    expect(loadHistory()).toEqual([]);
  });

  it("сохраняет и восстанавливает сообщения по кругу", () => {
    const messages = [userMessage(1), assistantMessage(2), userMessage(3)];
    saveHistory(messages);
    expect(loadHistory()).toEqual(messages);
  });

  it("сохраняет и восстанавливает bookingSlug у assistant-сообщения", () => {
    const message: ChatMessage = {
      ...assistantMessage(1),
      bookingSlug: "implants",
    };
    saveHistory([message]);
    expect(loadHistory()).toEqual([message]);
  });

  it("отбрасывает сообщение с не-строковым bookingSlug", () => {
    sessionStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify([
        { ...assistantMessage(1), bookingSlug: 42 },
        userMessage(2),
      ]),
    );
    expect(loadHistory()).toEqual([userMessage(2)]);
  });

  it("возвращает пустой массив, если в хранилище невалидный JSON", () => {
    sessionStorage.setItem(HISTORY_STORAGE_KEY, "{not-json");
    expect(loadHistory()).toEqual([]);
  });

  it("фильтрует элементы, не соответствующие схеме ChatMessage", () => {
    sessionStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify([
        userMessage(1),
        { id: "bad", role: "system", content: "x", createdAt: 0 },
        { id: 42, role: "user", content: "x", createdAt: 0 },
        assistantMessage(2),
      ]),
    );
    expect(loadHistory()).toEqual([userMessage(1), assistantMessage(2)]);
  });
});

describe("clearHistory", () => {
  it("стирает сохранённую переписку", () => {
    saveHistory([userMessage(1)]);
    clearHistory();
    expect(loadHistory()).toEqual([]);
  });
});

describe("countUserMessages", () => {
  it("считает только user-сообщения", () => {
    const messages = [
      userMessage(1),
      assistantMessage(2),
      userMessage(3),
      assistantMessage(4),
      userMessage(5),
    ];
    expect(countUserMessages(messages)).toBe(3);
  });
});

describe("isSessionLimitReached", () => {
  it("false, пока user-сообщений меньше лимита", () => {
    const messages = Array.from({ length: SESSION_MESSAGE_LIMIT - 1 }, (_, i) =>
      userMessage(i),
    );
    expect(isSessionLimitReached(messages)).toBe(false);
  });

  it("true, когда user-сообщений ровно лимит", () => {
    const messages = Array.from({ length: SESSION_MESSAGE_LIMIT }, (_, i) =>
      userMessage(i),
    );
    expect(isSessionLimitReached(messages)).toBe(true);
  });

  it("true, когда user-сообщений больше лимита", () => {
    const messages = Array.from({ length: SESSION_MESSAGE_LIMIT + 3 }, (_, i) =>
      userMessage(i),
    );
    expect(isSessionLimitReached(messages)).toBe(true);
  });

  it("assistant-сообщения не учитываются в лимите", () => {
    const messages = Array.from({ length: 20 }, (_, i) => assistantMessage(i));
    expect(isSessionLimitReached(messages)).toBe(false);
  });
});

describe("безопасность при отсутствии sessionStorage", () => {
  it("loadHistory возвращает [] без падения", () => {
    delete (globalThis as { sessionStorage?: Storage }).sessionStorage;
    expect(loadHistory()).toEqual([]);
  });

  it("saveHistory не падает", () => {
    delete (globalThis as { sessionStorage?: Storage }).sessionStorage;
    expect(() => saveHistory([userMessage(1)])).not.toThrow();
  });

  it("clearHistory не падает", () => {
    delete (globalThis as { sessionStorage?: Storage }).sessionStorage;
    expect(() => clearHistory()).not.toThrow();
  });
});
