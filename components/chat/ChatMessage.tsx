import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ChatMessage as ChatMessageType } from "@/lib/chat/storage";
import type { ServiceMenuItem } from "@/lib/services";
import { cn } from "@/lib/utils/index";
import type { Locale } from "@/types/site";

type Props = {
  message: ChatMessageType;
  services: ServiceMenuItem[];
};

export function ChatMessage({ message, services }: Props) {
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
        <BookingButton slug={message.bookingSlug} services={services} />
      )}
    </div>
  );
}

function BookingButton({
  slug,
  services,
}: {
  slug: string;
  services: ServiceMenuItem[];
}) {
  const t = useTranslations("Chat");
  const locale = useLocale() as Locale;
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  return (
    <Link
      href={{ pathname: "/booking", query: { service: slug } }}
      className="self-start rounded-sm bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors outline-none hover:bg-[#1f54e0] focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {t("bookForService", { service: service.name[locale] })}
    </Link>
  );
}
