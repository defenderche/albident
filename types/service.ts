import type { FaqEntry } from "./faq";
import type { LocalizedString } from "./site";

export type ServiceStage = {
  title: LocalizedString;
  description: LocalizedString;
};

// Логистика поездки для дентал-туриста: число (визиты/дни) + грамматически
// согласованная подпись. См. feature-spec-service-page.md §1.2.2.
export type ServiceTripFact = {
  value: LocalizedString;
  caption: LocalizedString;
};

export type ServiceTrip = {
  visits: ServiceTripFact;
  days: ServiceTripFact;
};

export type SubProcedure = {
  name: LocalizedString;
  priceFrom: number;
  priceTo: number;
};

export type Service = {
  id: string;
  slug: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  priceFrom: number;
  priceTo: number;
  trip: ServiceTrip;
  stages: ServiceStage[];
  subProcedures: SubProcedure[];
  faq: FaqEntry[];
  relatedDoctors: string[];
  showOnHome: boolean;
  sortOrder: number;
};
