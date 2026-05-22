import type { FaqEntry } from "./faq";
import type { LocalizedString } from "./site";

export type ServiceSlug =
  | "therapy"
  | "surgery"
  | "implants"
  | "prosthetics"
  | "orthodontics"
  | "aesthetics"
  | "hygiene"
  | "periodontology";

export type Service = {
  slug: ServiceSlug;
  name: LocalizedString;
  shortDescription: LocalizedString;
  priceFrom: number;
  priceTo: number;
  faq?: FaqEntry[];
};
