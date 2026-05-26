"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import {
  isSessionLimitReached,
  loadHistory,
  saveHistory,
  type ChatMessage as ChatMessageType,
} from "@/lib/chat/storage";

type Props = {
  onClose: () => void;
};

export function ChatPanel({ onClose }: Props) {
  const t = useTranslations("Chat");

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Restore history from sessionStorage on mount — must happen post-hydration
  // because the server has no sessionStorage and the first client render
  // must match the SSR output (empty list).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(loadHistory());
    setHydrated(true);
  }, []);

  // Persist history whenever it changes (but not before hydration —
  // otherwise initial empty state would overwrite saved history).
  useEffect(() => {
    if (!hydrated) return;
    saveHistory(messages);
  }, [messages, hydrated]);

  // Close on Esc.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Focus input on open.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to bottom when messages change.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const limitReached = isSessionLimitReached(messages);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || limitReached) return;

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

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
          disabled={limitReached}
          rows={2}
          className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
          <button
            type="submit"
            disabled={limitReached || input.trim().length === 0}
            className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors outline-none hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            {t("sendLabel")}
          </button>
        </div>
      </form>
    </div>
  );
}
