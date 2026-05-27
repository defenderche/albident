"use client";

import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { parseBookingMarker } from "@/lib/chat/parseBookingMarker";
import {
  isSessionLimitReached,
  loadHistory,
  saveHistory,
  type ChatMessage as ChatMessageType,
} from "@/lib/chat/storage";
import type { ChatLocale } from "@/lib/validation/chat";

type Props = {
  onClose: () => void;
};

type Status = "idle" | "streaming" | "error";

const FIRST_TOKEN_TIMEOUT_MS = 30_000;

export function ChatPanel({ onClose }: Props) {
  const t = useTranslations("Chat");
  const locale = useLocale() as ChatLocale;

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Restore history from sessionStorage on mount — must happen post-hydration
  // because the server has no sessionStorage and the first client render
  // must match the SSR output (empty list).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(loadHistory());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveHistory(messages);
  }, [messages, hydrated]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Abort any in-flight request when the panel unmounts.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const limitReached = isSessionLimitReached(messages);
  const busy = status === "streaming";

  async function runStream(
    history: ChatMessageType[],
    assistantId: string,
  ): Promise<void> {
    const controller = new AbortController();
    abortRef.current = controller;

    let firstTokenReceived = false;
    const firstTokenTimer = setTimeout(() => {
      if (!firstTokenReceived) controller.abort();
    }, FIRST_TOKEN_TIMEOUT_MS);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!firstTokenReceived) {
          firstTokenReceived = true;
          clearTimeout(firstTokenTimer);
        }
        buffer += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: buffer } : m,
          ),
        );
      }

      const { cleanedText, slug } = parseBookingMarker(buffer);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: cleanedText,
                ...(slug ? { bookingSlug: slug } : {}),
              }
            : m,
        ),
      );
      setStatus("idle");
    } catch (error) {
      console.error("Chat stream failed", error);
      setStatus("error");
    } finally {
      clearTimeout(firstTokenTimer);
      if (abortRef.current === controller) abortRef.current = null;
    }
  }

  function startConversation(text: string) {
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    const assistantMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    };
    const history = [...messages, userMessage];
    setMessages([...history, assistantMessage]);
    setStatus("streaming");
    void runStream(history, assistantMessage.id);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || limitReached || busy) return;
    setInput("");
    startConversation(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  function handleRetry() {
    if (status !== "error") return;
    // Drop the failed assistant message and resend.
    const lastAssistantIndex = lastIndex(messages, (m) => m.role === "assistant");
    if (lastAssistantIndex === -1) return;
    const failedAssistantId = messages[lastAssistantIndex].id;
    const history = messages.slice(0, lastAssistantIndex);
    const newAssistant: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    };
    setMessages([...history, newAssistant]);
    setStatus("streaming");
    void runStream(history, newAssistant.id);
    // failedAssistantId is no longer in the list — it was filtered out above.
    void failedAssistantId;
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label={t("title")}
      className="fixed inset-0 z-50 flex flex-col bg-background shadow-xl md:inset-auto md:right-6 md:bottom-24 md:h-[600px] md:max-h-[calc(100vh-7rem)] md:w-[400px] md:rounded-2xl md:border md:border-border"
    >
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium">{t("title")}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("closeLabel")}
          className="rounded-md p-1 text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label={t("title")}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
      >
        <ChatMessage
          message={{
            id: "greeting",
            role: "assistant",
            content: t("greeting"),
            createdAt: 0,
          }}
        />
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {status === "error" && (
          <div className="flex flex-col items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <p>{t("errorMessage")}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-md bg-destructive/20 px-2.5 py-1 text-xs font-medium transition-colors outline-none hover:bg-destructive/30 focus-visible:ring-3 focus-visible:ring-destructive/40"
            >
              {t("retryLabel")}
            </button>
          </div>
        )}
        {limitReached && (
          <div className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            {t("limitMessage")}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-border px-4 pt-3 pb-3"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("placeholder")}
          disabled={limitReached || busy}
          rows={2}
          className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
          <button
            type="submit"
            disabled={limitReached || busy || input.trim().length === 0}
            className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors outline-none hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            {t("sendLabel")}
          </button>
        </div>
      </form>
    </div>
  );
}

function lastIndex<T>(arr: T[], predicate: (item: T) => boolean): number {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (predicate(arr[i])) return i;
  }
  return -1;
}
