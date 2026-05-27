import { useLocale, useTranslations } from "next-intl";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { ChatMessage as ChatMessageType } from "@/lib/chat/storage";
import { cn } from "@/lib/utils/index";
import type { Locale } from "@/types/site";

type Props = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
        <div
          className={cn(
            "max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
          )}
        >
          {message.content}
        </div>
      </div>
      {!isUser && message.bookingSlug && (
        <BookingButton slug={message.bookingSlug} />
      )}
    </div>
  );
}

function BookingButton({ slug }: { slug: string }) {
  const t = useTranslations("Chat");
  const locale = useLocale() as Locale;
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  return (
    <Link
      href={{ pathname: "/booking", query: { service: slug } }}
      className="self-start rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors outline-none hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {t("bookForService", { service: service.name[locale] })}
    </Link>
  );
}
