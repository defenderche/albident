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

function warrantiesSection(locale: Locale): string {
  const lines = ["# Гарантии клиники"];
  for (const warranty of warranties) {
    lines.push("");
    lines.push(`## ${warranty.service[locale]} — ${warranty.term[locale]}`);
    lines.push(warranty.description[locale]);
  }
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
