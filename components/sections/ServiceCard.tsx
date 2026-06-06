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
  popularLabel?: string;
};

export function ServiceCard({
  service,
  locale,
  priceRangeLabel,
  detailsLabel,
  popularLabel,
}: Props) {
  const Icon = iconBySlug[service.slug];
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-12 items-center justify-center rounded-md bg-accent text-primary">
          <Icon className="size-6" />
        </span>
        {popularLabel ? (
          <span className="rounded-sm bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-primary">
            {popularLabel}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-bold">{service.name[locale]}</h3>
      <p className="flex-1 text-sm text-muted-foreground">
        {service.shortDescription[locale]}
      </p>
      <p className="text-[15px] font-bold text-foreground">{priceRangeLabel}</p>
      {detailsLabel ? (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          {detailsLabel} →
        </span>
      ) : null}
    </Link>
  );
}
