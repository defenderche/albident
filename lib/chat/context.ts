import { doctors } from "@/content/doctors";
import { homeFaq } from "@/content/faq";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { warranties } from "@/content/warranties";
import type { Locale } from "@/types/site";

export function buildClinicContext(locale: Locale): string {
  const sections = [
    siteSection(locale),
    servicesSection(locale),
    doctorsSection(locale),
    warrantiesSection(locale),
    faqSection(locale),
  ];
  return sections.join("\n\n");
}

function siteSection(locale: Locale): string {
  return [
    "# Клиника",
    `Название: ${site.brand}`,
    `Адрес: ${site.address[locale]}`,
    `Телефон: ${site.phone}`,
    `Email: ${site.email}`,
    `Часы работы: ${site.hours[locale]}`,
    `WhatsApp: ${site.social.whatsapp}`,
    `Instagram: ${site.social.instagram}`,
    `Telegram: ${site.social.telegram}`,
  ].join("\n");
}

function servicesSection(locale: Locale): string {
  const lines = ["# Услуги (цены в USD)"];
  for (const service of services) {
    lines.push("");
    lines.push(`## ${service.name[locale]} [slug: ${service.slug}]`);
    lines.push(service.shortDescription[locale]);
    lines.push(`Цена: $${service.priceFrom}–$${service.priceTo}`);
    if (service.subProcedures.length > 0) {
      lines.push("Подпроцедуры:");
      for (const sub of service.subProcedures) {
        lines.push(
          `- ${sub.name[locale]}: $${sub.priceFrom}–$${sub.priceTo}`,
        );
      }
    }
    if (service.faq.length > 0) {
      lines.push("FAQ:");
      for (const entry of service.faq) {
        lines.push(`Q: ${entry.q[locale]}`);
        lines.push(`A: ${entry.a[locale]}`);
      }
    }
  }
  return lines.join("\n");
}

function doctorsSection(locale: Locale): string {
  const lines = ["# Команда"];
  for (const doctor of doctors) {
    lines.push("");
    lines.push(`## ${doctor.name[locale]} — ${doctor.role[locale]}`);
    for (const achievement of doctor.achievements) {
      lines.push(`- ${achievement[locale]}`);
    }
  }
  return lines.join("\n");
}

const WARRANTY_PROCESS: Record<Locale, string[]> = {
  ru: [
    "## Гарантийный процесс",
    "Как заявить: написать в клинику в WhatsApp или на email с фото и снимками.",
    "Кто решает: лечащий врач оценивает дистанционно, гарантийный ли случай.",
    "Нужно ли приезжать: оценка дистанционно; ручная работа (переделка, замена) — приезд в Стамбул, работа без повторной оплаты, дорога и проживание не покрываются.",
    "Не покрывает: травмы, несоблюдение рекомендаций и гигиены, пропуск контрольных визитов, естественный износ, вмешательство сторонних врачей.",
  ],
  en: [
    "## Warranty process",
    "How to claim: message the clinic on WhatsApp or by email with photos and X-rays.",
    "Who decides: the treating doctor assesses remotely whether it's a warranty case.",
    "Travel: assessment is remote; hands-on work (redo, replacement) requires a trip to Istanbul, done at no extra charge, travel and accommodation not covered.",
    "Not covered: injuries, ignoring recommendations and hygiene, missed check-ups, natural wear, third-party dentist intervention.",
  ],
  tr: [
    "## Garanti süreci",
    "Nasıl başvurulur: kliniğe WhatsApp veya e-posta ile fotoğraf ve röntgen göndererek.",
    "Kim karar verir: tedavi eden hekim, garanti kapsamında olup olmadığını uzaktan değerlendirir.",
    "Seyahat: değerlendirme uzaktan; uygulamalı işlem (yenileme, değişim) için İstanbul'a geliş, ek ücretsiz, ulaşım ve konaklama karşılanmaz.",
    "Kapsam dışı: travmalar, önerilere ve hijyene uyulmaması, kontrol ziyaretlerinin atlanması, doğal aşınma, başka hekim müdahalesi.",
  ],
};

function warrantiesSection(locale: Locale): string {
  const lines = ["# Гарантии клиники"];
  for (const warranty of warranties) {
    lines.push("");
    lines.push(`## ${warranty.service[locale]} — ${warranty.term[locale]}`);
    lines.push(warranty.description[locale]);
  }
  lines.push("");
  lines.push(...WARRANTY_PROCESS[locale]);
  return lines.join("\n");
}

function faqSection(locale: Locale): string {
  const lines = ["# Общий FAQ клиники"];
  for (const entry of homeFaq) {
    lines.push("");
    lines.push(`Q: ${entry.q[locale]}`);
    lines.push(`A: ${entry.a[locale]}`);
  }
  return lines.join("\n");
}
