import type { ComponentType } from "react";
import {
  Activity,
  Anchor,
  Braces,
  Crown,
  Droplets,
  HeartPulse,
  Scissors,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Service, ServiceSlug } from "@/types/service";
import type { Locale } from "@/types/site";

const iconBySlug: Record<ServiceSlug, ComponentType<{ className?: string }>> = {
  therapy: Activity,
  surgery: Scissors,
  implants: Anchor,
  prosthetics: Crown,
  orthodontics: Braces,
  aesthetics: Sparkles,
  hygiene: Droplets,
  periodontology: HeartPulse,
};

type Props = {
  service: Service;
  locale: Locale;
  priceRangeLabel: string;
  detailsLabel?: string;
};

export function ServiceCard({ service, locale, priceRangeLabel, detailsLabel }: Props) {
  const Icon = iconBySlug[service.slug];
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-colors hover:border-foreground/30"
    >
      <Icon className="size-6 text-foreground/70 transition-colors group-hover:text-foreground" />
      <h3 className="text-base font-medium">{service.name[locale]}</h3>
      <p className="flex-1 text-sm text-muted-foreground">
        {service.shortDescription[locale]}
      </p>
      <p className="text-sm font-medium text-foreground/90">{priceRangeLabel}</p>
      {detailsLabel ? (
        <p className="text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
          {detailsLabel} →
        </p>
      ) : null}
    </Link>
  );
}
