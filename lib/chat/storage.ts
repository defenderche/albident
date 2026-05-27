export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  bookingSlug?: string;
};

export const HISTORY_STORAGE_KEY = "albident.chat.history";
export const SESSION_MESSAGE_LIMIT = 10;

function getStorage(): Storage | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage;
}

export function loadHistory(): ChatMessage[] {
  const storage = getStorage();
  if (!storage) return [];

  const raw = storage.getItem(HISTORY_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isChatMessage);
  } catch {
    return [];
  }
}

export function saveHistory(messages: ChatMessage[]): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(messages));
}

export function clearHistory(): void {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(HISTORY_STORAGE_KEY);
}

export function countUserMessages(messages: ChatMessage[]): number {
  return messages.filter((m) => m.role === "user").length;
}

export function isSessionLimitReached(messages: ChatMessage[]): boolean {
  return countUserMessages(messages) >= SESSION_MESSAGE_LIMIT;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    (v.role === "user" || v.role === "assistant") &&
    typeof v.content === "string" &&
    typeof v.createdAt === "number" &&
    (v.bookingSlug === undefined || typeof v.bookingSlug === "string")
  );
}
