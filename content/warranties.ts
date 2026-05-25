import type { Warranty } from "@/types/warranty";

export const warranties: Warranty[] = [
  {
    service: {
      ru: "Имплантация",
      en: "Implantation",
      tr: "İmplantasyon",
    },
    term: {
      ru: "10 лет на работу врача + пожизненная гарантия от производителя имплантата",
      en: "10 years on the doctor's work + lifetime warranty from the implant manufacturer",
      tr: "Doktor çalışmasına 10 yıl + implant üreticisinden ömür boyu garanti",
    },
    description: {
      ru: "Покрывает отторжение импланта, поломку и проблемы с остеоинтеграцией. Замена имплантата проводится без повторной оплаты установки.",
      en: "Covers implant rejection, breakage, and osseointegration issues. The implant is replaced without re-charging for the placement.",
      tr: "İmplant reddi, kırılma ve osseointegrasyon sorunlarını kapsar. İmplant, yerleştirme için yeniden ücret alınmadan değiştirilir.",
    },
  },
  {
    service: {
      ru: "Коронки и виниры",
      en: "Crowns and veneers",
      tr: "Kron ve lamineler",
    },
    term: {
      ru: "5 лет",
      en: "5 years",
      tr: "5 yıl",
    },
    description: {
      ru: "Покрывает скол, расцементировку, нарушение прилегания. Замена или переустановка — без оплаты лабораторной работы.",
      en: "Covers chips, decementation, and fit issues. Replacement or reseating — no charge for the lab work.",
      tr: "Çatlak, simanın çıkması ve uyum sorunlarını kapsar. Değiştirme veya yeniden yerleştirme — laboratuvar çalışması için ücret alınmaz.",
    },
  },
  {
    service: {
      ru: "Терапия (пломбы)",
      en: "Therapy (fillings)",
      tr: "Tedavi (dolgu)",
    },
    term: {
      ru: "2 года",
      en: "2 years",
      tr: "2 yıl",
    },
    description: {
      ru: "Покрывает выпадение пломбы и развитие вторичного кариеса под пломбой. В гарантийный срок переделываем без оплаты.",
      en: "Covers filling loss and the development of secondary caries under the filling. We redo it within the warranty period at no charge.",
      tr: "Dolgunun düşmesini ve dolgunun altında ikincil çürük gelişimini kapsar. Garanti süresi içinde ücretsiz yeniden yaparız.",
    },
  },
  {
    service: {
      ru: "Эндодонтия (лечение каналов)",
      en: "Endodontics (root canal treatment)",
      tr: "Endodonti (kanal tedavisi)",
    },
    term: {
      ru: "1 год",
      en: "1 year",
      tr: "1 yıl",
    },
    description: {
      ru: "Если возникает воспаление в обработанном канале — повторное лечение или направление на ретритмент проводим бесплатно.",
      en: "If inflammation arises in a treated canal, we perform re-treatment or refer for retreatment free of charge.",
      tr: "Tedavi edilen bir kanalda iltihap oluşursa, yeniden tedavi veya retedavi yönlendirmesi ücretsiz yapılır.",
    },
  },
  {
    service: {
      ru: "Протезы съёмные",
      en: "Removable prosthetics",
      tr: "Hareketli protezler",
    },
    term: {
      ru: "2 года",
      en: "2 years",
      tr: "2 yıl",
    },
    description: {
      ru: "Покрывает поломку базиса и перелом крепления при штатной эксплуатации. Не покрывает повреждения от падения или неправильного хранения.",
      en: "Covers base breakage and clasp fractures under normal use. Does not cover damage from drops or improper storage.",
      tr: "Normal kullanımda taban kırılmasını ve tutucu kırılmalarını kapsar. Düşme veya yanlış saklamadan kaynaklanan hasarları kapsamaz.",
    },
  },
  {
    service: {
      ru: "Гигиена, ортодонтия",
      en: "Hygiene, orthodontics",
      tr: "Hijyen, ortodonti",
    },
    term: {
      ru: "Без гарантии (по природе процедуры)",
      en: "No warranty (by nature of the procedure)",
      tr: "Garanti yok (prosedürün doğası gereği)",
    },
    description: {
      ru: "Результат гигиены сохраняется только при регулярном уходе, а ортодонтическое перемещение зубов имеет индивидуальный отклик. Формальная гарантия не даётся, но мы остаёмся на связи и корректируем план при необходимости.",
      en: "Hygiene results only last with regular care, and orthodontic tooth movement varies by individual response. We don't issue a formal warranty, but we stay in touch and adjust the plan if needed.",
      tr: "Hijyen sonuçları yalnızca düzenli bakımla korunur ve ortodontik diş hareketi bireysel tepkiye göre değişir. Resmi garanti vermiyoruz ancak iletişimde kalır ve gerekirse planı ayarlarız.",
    },
  },
];
