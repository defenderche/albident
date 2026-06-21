"use server";

import { updateTag } from "next/cache";
import { getServiceRoleClient } from "@/lib/db/supabase";
import { createSupabaseServerClient } from "@/lib/db/supabase-server";
import type { Json } from "@/lib/db/types.generated";
import { getServices, SERVICES_CACHE_TAG } from "@/lib/services";
import {
  buildLocalizedFields,
  flattenLocalized,
  flattenRu,
} from "@/lib/services/admin-fields";
import { slugify, uniqueSlug } from "@/lib/services/slug";
import { translateRuStrings } from "@/lib/services/translate";
import { serviceFormSchema } from "@/lib/validation/service";
import type { LocalizedString } from "@/types/site";

export type ServiceActionResult =
  | { ok: true; slug?: string }
  | { ok: false; error: string };

async function isAdmin(): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return Boolean(user);
}

// JSONB-колонки в сгенерированных типах — Json; локализованные объекты валидны
// структурно, но требуют приведения.
const asJson = (v: unknown) => v as unknown as Json;

export async function createService(
  input: unknown,
): Promise<ServiceActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "unauthorized" };

  const parsed = serviceFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };
  const values = parsed.data;

  const translations = await translateRuStrings(flattenRu(values));
  const loc = (key: string, ru: string): LocalizedString => ({
    ru,
    en: translations[key]?.en ?? ru,
    tr: translations[key]?.tr ?? ru,
  });
  const localized = buildLocalizedFields(values, loc);

  const existing = await getServices();
  const taken = new Set(existing.map((s) => s.slug));
  const slug = uniqueSlug(slugify(localized.name.en), taken);
  const sortOrder =
    existing.reduce((m, s) => Math.max(m, s.sortOrder), -1) + 1;

  const supabase = getServiceRoleClient();
  const { error } = await supabase.from("services").insert({
    slug,
    price_from: values.priceFrom,
    price_to: values.priceTo,
    show_on_home: values.showOnHome,
    sort_order: sortOrder,
    related_doctors: values.relatedDoctors,
    name: asJson(localized.name),
    short_description: asJson(localized.short_description),
    full_description: asJson(localized.full_description),
    trip: asJson(localized.trip),
    stages: asJson(localized.stages),
    sub_procedures: asJson(localized.sub_procedures),
    faq: asJson(localized.faq),
  });
  if (error) {
    console.error("createService failed", error);
    return { ok: false, error: "database" };
  }

  updateTag(SERVICES_CACHE_TAG);
  return { ok: true, slug };
}

export async function updateService(
  id: string,
  input: unknown,
): Promise<ServiceActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "unauthorized" };

  const parsed = serviceFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "validation" };
  const values = parsed.data;

  const existing = (await getServices()).find((s) => s.id === id);
  if (!existing) return { ok: false, error: "notfound" };

  const newRu = flattenRu(values);
  const existingLoc = flattenLocalized(existing);

  // Вариант «б»: переводим только поля, где RU изменился (или ключ новый).
  const changed: Record<string, string> = {};
  for (const [key, ru] of Object.entries(newRu)) {
    if (existingLoc[key]?.ru !== ru) changed[key] = ru;
  }
  const translations = await translateRuStrings(changed);

  const loc = (key: string, ru: string): LocalizedString => {
    if (key in changed) {
      return {
        ru,
        en: translations[key]?.en ?? ru,
        tr: translations[key]?.tr ?? ru,
      };
    }
    const prev = existingLoc[key];
    return { ru, en: prev?.en ?? ru, tr: prev?.tr ?? ru };
  };
  const localized = buildLocalizedFields(values, loc);

  const supabase = getServiceRoleClient();
  const { error } = await supabase
    .from("services")
    .update({
      price_from: values.priceFrom,
      price_to: values.priceTo,
      show_on_home: values.showOnHome,
      related_doctors: values.relatedDoctors,
      name: asJson(localized.name),
      short_description: asJson(localized.short_description),
      full_description: asJson(localized.full_description),
      trip: asJson(localized.trip),
      stages: asJson(localized.stages),
      sub_procedures: asJson(localized.sub_procedures),
      faq: asJson(localized.faq),
    })
    .eq("id", id);
  if (error) {
    console.error("updateService failed", error);
    return { ok: false, error: "database" };
  }

  updateTag(SERVICES_CACHE_TAG);
  return { ok: true, slug: existing.slug };
}

export async function deleteService(id: string): Promise<ServiceActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "unauthorized" };

  const supabase = getServiceRoleClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) {
    console.error("deleteService failed", error);
    return { ok: false, error: "database" };
  }

  updateTag(SERVICES_CACHE_TAG);
  return { ok: true };
}
