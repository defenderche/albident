"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  onClick: () => void;
};

export function ChatButton({ onClick }: Props) {
  const t = useTranslations("Chat");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t("openLabel")}
      className="fixed right-4 bottom-4 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-btn)] transition-transform outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 md:right-6 md:bottom-6 md:size-15"
    >
      <MessageCircle className="size-6 md:size-7" aria-hidden="true" />
    </button>
  );
}
