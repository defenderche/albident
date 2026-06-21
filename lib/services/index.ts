import { unstable_cache } from "next/cache";
import { getServiceRoleClient } from "@/lib/db/supabase";
import type { Database } from "@/lib/db/types.generated";
import type { FaqEntry } from "@/types/faq";
import type {
  Service,
  ServiceStage,
  ServiceTrip,
  SubProcedure,
} from "@/types/service";
import type { LocalizedString } from "@/types/site";

type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

// Тег кэша для on-demand-ревалидации после изменений в админке (этап 3).
export const SERVICES_CACHE_TAG = "services";

// Вложенные/мультиязычные поля хранятся в JSONB в форме типа Service —
// маппинг сводится к снятию snake_case и приведению Json к нужному типу.
function mapRow(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name as unknown as LocalizedString,
    shortDescription: row.short_description as unknown as LocalizedString,
    fullDescription: row.full_description as unknown as LocalizedString,
    priceFrom: row.price_from,
    priceTo: row.price_to,
    trip: row.trip as unknown as ServiceTrip,
    stages: row.stages as unknown as ServiceStage[],
    subProcedures: row.sub_procedures as unknown as SubProcedure[],
    faq: row.faq as unknown as FaqEntry[],
    relatedDoctors: row.related_doctors,
    showOnHome: row.show_on_home,
    sortOrder: row.sort_order,
  };
}

const fetchServices = unstable_cache(
  async (): Promise<Service[]> => {
    const supabase = getServiceRoleClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(`Failed to load services: ${error.message}`);
    return (data ?? []).map(mapRow);
  },
  ["services"],
  { tags: [SERVICES_CACHE_TAG] },
);

export async function getServices(): Promise<Service[]> {
  return fetchServices();
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await fetchServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const services = await fetchServices();
  return services.find((s) => s.id === id) ?? null;
}

// Витрина на главной: отмеченные флагом, в порядке sort_order, не более 5.
export async function getHomeServices(): Promise<Service[]> {
  const services = await fetchServices();
  return services.filter((s) => s.showOnHome).slice(0, 5);
}

export async function getServiceSlugs(): Promise<string[]> {
  const services = await fetchServices();
  return services.map((s) => s.slug);
}

// Тонкий список для клиента (чат): slug + название, без тяжёлых вложенных полей.
export type ServiceMenuItem = { slug: string; name: LocalizedString };

export async function getServiceMenu(): Promise<ServiceMenuItem[]> {
  const services = await fetchServices();
  return services.map((s) => ({ slug: s.slug, name: s.name }));
}
