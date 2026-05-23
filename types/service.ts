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

export type ServiceStage = {
  title: LocalizedString;
  description: LocalizedString;
};

export type SubProcedure = {
  name: LocalizedString;
  priceFrom: number;
  priceTo: number;
};

export type Service = {
  slug: ServiceSlug;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  image: string;
  priceFrom: number;
  priceTo: number;
  stages: ServiceStage[];
  subProcedures: SubProcedure[];
  faq: FaqEntry[];
  relatedDoctors: string[];
};
