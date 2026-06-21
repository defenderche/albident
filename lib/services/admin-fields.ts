import type { ServiceFormValues } from "@/lib/validation/service";
import type { Service } from "@/types/service";
import type { LocalizedString } from "@/types/site";

// Единая схема ключей переводимых строк услуги (плоская, в т.ч. для вложенных
// списков). Используется и для перевода, и для сравнения изменений, и для сборки.

export function flattenRu(v: ServiceFormValues): Record<string, string> {
  const out: Record<string, string> = {
    name: v.name,
    shortDescription: v.shortDescription,
    fullDescription: v.fullDescription,
    "trip.visits.value": v.trip.visits.value,
    "trip.visits.caption": v.trip.visits.caption,
    "trip.days.value": v.trip.days.value,
    "trip.days.caption": v.trip.days.caption,
  };
  v.stages.forEach((s, i) => {
    out[`stages.${i}.title`] = s.title;
    out[`stages.${i}.description`] = s.description;
  });
  v.subProcedures.forEach((s, i) => {
    out[`subProcedures.${i}.name`] = s.name;
  });
  v.faq.forEach((f, i) => {
    out[`faq.${i}.q`] = f.q;
    out[`faq.${i}.a`] = f.a;
  });
  return out;
}

// Существующая услуга → key → полная локализованная строка (для переиспользования
// EN/TR нетронутых полей при редактировании, вариант «б»).
export function flattenLocalized(s: Service): Record<string, LocalizedString> {
  const out: Record<string, LocalizedString> = {
    name: s.name,
    shortDescription: s.shortDescription,
    fullDescription: s.fullDescription,
    "trip.visits.value": s.trip.visits.value,
    "trip.visits.caption": s.trip.visits.caption,
    "trip.days.value": s.trip.days.value,
    "trip.days.caption": s.trip.days.caption,
  };
  s.stages.forEach((st, i) => {
    out[`stages.${i}.title`] = st.title;
    out[`stages.${i}.description`] = st.description;
  });
  s.subProcedures.forEach((sp, i) => {
    out[`subProcedures.${i}.name`] = sp.name;
  });
  s.faq.forEach((f, i) => {
    out[`faq.${i}.q`] = f.q;
    out[`faq.${i}.a`] = f.a;
  });
  return out;
}

type LocResolver = (key: string, ru: string) => LocalizedString;

// Собирает локализованные поля услуги (JSONB-форма) из RU-значений формы и
// резолвера EN/TR по ключу. Формы вложенных объектов совпадают с типом Service.
export function buildLocalizedFields(v: ServiceFormValues, loc: LocResolver) {
  return {
    name: loc("name", v.name),
    short_description: loc("shortDescription", v.shortDescription),
    full_description: loc("fullDescription", v.fullDescription),
    trip: {
      visits: {
        value: loc("trip.visits.value", v.trip.visits.value),
        caption: loc("trip.visits.caption", v.trip.visits.caption),
      },
      days: {
        value: loc("trip.days.value", v.trip.days.value),
        caption: loc("trip.days.caption", v.trip.days.caption),
      },
    },
    stages: v.stages.map((s, i) => ({
      title: loc(`stages.${i}.title`, s.title),
      description: loc(`stages.${i}.description`, s.description),
    })),
    sub_procedures: v.subProcedures.map((s, i) => ({
      name: loc(`subProcedures.${i}.name`, s.name),
      priceFrom: s.priceFrom,
      priceTo: s.priceTo,
    })),
    faq: v.faq.map((f, i) => ({
      q: loc(`faq.${i}.q`, f.q),
      a: loc(`faq.${i}.a`, f.a),
    })),
  };
}

// RU-вид услуги для префилла формы редактирования.
export function serviceToFormValues(s: Service): ServiceFormValues {
  return {
    name: s.name.ru,
    shortDescription: s.shortDescription.ru,
    fullDescription: s.fullDescription.ru,
    priceFrom: s.priceFrom,
    priceTo: s.priceTo,
    showOnHome: s.showOnHome,
    trip: {
      visits: { value: s.trip.visits.value.ru, caption: s.trip.visits.caption.ru },
      days: { value: s.trip.days.value.ru, caption: s.trip.days.caption.ru },
    },
    stages: s.stages.map((st) => ({
      title: st.title.ru,
      description: st.description.ru,
    })),
    subProcedures: s.subProcedures.map((sp) => ({
      name: sp.name.ru,
      priceFrom: sp.priceFrom,
      priceTo: sp.priceTo,
    })),
    faq: s.faq.map((f) => ({ q: f.q.ru, a: f.a.ru })),
    relatedDoctors: s.relatedDoctors,
  };
}
