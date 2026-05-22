import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "therapy",
    name: {
      ru: "Терапия",
      en: "Therapy",
      tr: "Tedavi",
    },
    shortDescription: {
      ru: "Лечение кариеса, реставрация зубов и эстетические пломбы.",
      en: "Caries treatment, tooth restoration, and aesthetic fillings.",
      tr: "Çürük tedavisi, diş restorasyonu ve estetik dolgular.",
    },
    priceFrom: 50,
    priceTo: 200,
  },
  {
    slug: "surgery",
    name: {
      ru: "Хирургия",
      en: "Surgery",
      tr: "Cerrahi",
    },
    shortDescription: {
      ru: "Удаление зубов мудрости, простые и сложные экстракции.",
      en: "Wisdom tooth removal, simple and complex extractions.",
      tr: "Yirmilik diş çekimi, basit ve karmaşık ekstraksiyonlar.",
    },
    priceFrom: 80,
    priceTo: 300,
  },
  {
    slug: "implants",
    name: {
      ru: "Имплантация",
      en: "Implants",
      tr: "İmplant",
    },
    shortDescription: {
      ru: "Восстановление утраченных зубов имплантатами премиум-брендов.",
      en: "Restoration of missing teeth with premium-brand implants.",
      tr: "Premium markalı implantlarla eksik dişlerin yenilenmesi.",
    },
    priceFrom: 500,
    priceTo: 1500,
  },
  {
    slug: "prosthetics",
    name: {
      ru: "Протезирование",
      en: "Prosthetics",
      tr: "Protez",
    },
    shortDescription: {
      ru: "Коронки, мосты и съёмные протезы для восстановления улыбки.",
      en: "Crowns, bridges, and removable prosthetics to restore your smile.",
      tr: "Gülüşünüzü yenilemek için kron, köprü ve hareketli protezler.",
    },
    priceFrom: 200,
    priceTo: 700,
  },
  {
    slug: "orthodontics",
    name: {
      ru: "Ортодонтия",
      en: "Orthodontics",
      tr: "Ortodonti",
    },
    shortDescription: {
      ru: "Брекеты и элайнеры для коррекции прикуса в любом возрасте.",
      en: "Braces and aligners to correct bite at any age.",
      tr: "Her yaşta ısırma düzeltmesi için braketler ve şeffaf plaklar.",
    },
    priceFrom: 1500,
    priceTo: 4000,
  },
  {
    slug: "aesthetics",
    name: {
      ru: "Эстетика",
      en: "Aesthetics",
      tr: "Estetik",
    },
    shortDescription: {
      ru: "Виниры, отбеливание и художественная реставрация передних зубов.",
      en: "Veneers, whitening, and artistic restoration of front teeth.",
      tr: "Lamine, beyazlatma ve ön dişlerin sanatsal restorasyonu.",
    },
    priceFrom: 300,
    priceTo: 900,
  },
  {
    slug: "hygiene",
    name: {
      ru: "Гигиена",
      en: "Hygiene",
      tr: "Hijyen",
    },
    shortDescription: {
      ru: "Профессиональная чистка, удаление налёта и профилактический осмотр.",
      en: "Professional cleaning, plaque removal, and preventive check-up.",
      tr: "Profesyonel temizlik, plak temizleme ve önleyici muayene.",
    },
    priceFrom: 50,
    priceTo: 150,
  },
  {
    slug: "periodontology",
    name: {
      ru: "Пародонтология",
      en: "Periodontology",
      tr: "Periodontoloji",
    },
    shortDescription: {
      ru: "Лечение дёсен, кровоточивости и пародонтита на любой стадии.",
      en: "Treatment of gums, bleeding, and periodontitis at any stage.",
      tr: "Diş etlerinin, kanamaların ve periodontitisin her aşamada tedavisi.",
    },
    priceFrom: 100,
    priceTo: 500,
  },
];
