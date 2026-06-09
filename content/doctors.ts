import type { Doctor } from "@/types/doctor";

export const doctors: Doctor[] = [
  {
    slug: "aylin-celik",
    avatar: "/doctors/aylin-celik.webp",
    name: {
      ru: "Айлин Челик",
      en: "Aylin Çelik",
      tr: "Aylin Çelik",
    },
    role: {
      ru: "Имплантолог, хирург",
      en: "Implantologist, surgeon",
      tr: "İmplantolog, cerrah",
    },
    achievements: [
      {
        ru: "Более 15 лет опыта в дентальной имплантации",
        en: "15+ years of experience in dental implantation",
        tr: "Dental implantasyonda 15+ yıl deneyim",
      },
      {
        ru: "Сертификация Straumann и Nobel Biocare",
        en: "Straumann and Nobel Biocare certified",
        tr: "Straumann ve Nobel Biocare sertifikalı",
      },
      {
        ru: "Стажировка в Цюрихском университете (Швейцария)",
        en: "Fellowship at the University of Zurich (Switzerland)",
        tr: "Zürih Üniversitesi'nde (İsviçre) staj",
      },
    ],
  },
  {
    slug: "dmitri-orlov",
    avatar: "/doctors/dmitri-orlov.webp",
    name: {
      ru: "Дмитрий Орлов",
      en: "Dmitri Orlov",
      tr: "Dmitri Orlov",
    },
    role: {
      ru: "Ортодонт",
      en: "Orthodontist",
      tr: "Ortodontist",
    },
    achievements: [
      {
        ru: "Работа с брекет-системами и элайнерами Invisalign",
        en: "Works with braces and Invisalign aligners",
        tr: "Braket sistemleri ve Invisalign şeffaf plaklarıyla çalışır",
      },
      {
        ru: "Окончил Московский государственный медико-стоматологический университет",
        en: "Graduated from Moscow State University of Medicine and Dentistry",
        tr: "Moskova Devlet Tıp ve Diş Hekimliği Üniversitesi mezunu",
      },
    ],
  },
  {
    slug: "mehmet-yilmaz",
    avatar: "/doctors/mehmet-yilmaz.webp",
    name: {
      ru: "Мехмет Йылмаз",
      en: "Mehmet Yılmaz",
      tr: "Mehmet Yılmaz",
    },
    role: {
      ru: "Челюстно-лицевой хирург",
      en: "Oral and maxillofacial surgeon",
      tr: "Ağız ve çene cerrahı",
    },
    achievements: [
      {
        ru: "Член Турецкой ассоциации челюстно-лицевых хирургов",
        en: "Member of the Turkish Association of Oral and Maxillofacial Surgeons",
        tr: "Türk Ağız ve Çene Cerrahları Derneği üyesi",
      },
      {
        ru: "Специализация по сложным экстракциям и костной пластике",
        en: "Specializes in complex extractions and bone grafting",
        tr: "Karmaşık ekstraksiyonlar ve kemik greftleme uzmanı",
      },
    ],
  },
  {
    slug: "zeynep-kaya",
    avatar: "/doctors/zeynep-kaya.webp",
    name: {
      ru: "Зейнеп Кая",
      en: "Zeynep Kaya",
      tr: "Zeynep Kaya",
    },
    role: {
      ru: "Эстетический стоматолог, ортопед",
      en: "Aesthetic dentist, prosthodontist",
      tr: "Estetik diş hekimi, protetik diş hekimi",
    },
    achievements: [
      {
        ru: "10+ лет работы с винирами и коронками E.max",
        en: "10+ years working with veneers and E.max crowns",
        tr: "Lamine ve E.max kronlarla 10+ yıl deneyim",
      },
      {
        ru: "Курс эстетической реставрации в Style Italiano",
        en: "Aesthetic restoration course at Style Italiano",
        tr: "Style Italiano'da estetik restorasyon kursu",
      },
    ],
  },
  {
    slug: "emre-demir",
    avatar: "/doctors/emre-demir.webp",
    name: {
      ru: "Эмре Демир",
      en: "Emre Demir",
      tr: "Emre Demir",
    },
    role: {
      ru: "Терапевт, пародонтолог",
      en: "Therapist, periodontist",
      tr: "Tedavi uzmanı, periodontist",
    },
    achievements: [
      {
        ru: "Лечение корневых каналов под микроскопом",
        en: "Microscope-assisted root canal treatment",
        tr: "Mikroskop yardımıyla kanal tedavisi",
      },
      {
        ru: "Член Европейской пародонтологической федерации (EFP)",
        en: "Member of the European Federation of Periodontology (EFP)",
        tr: "Avrupa Periodontoloji Federasyonu (EFP) üyesi",
      },
    ],
  },
];
