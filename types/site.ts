export type Locale = "ru" | "en" | "tr";

export type LocalizedString = Record<Locale, string>;

export type Site = {
  brand: string;
  address: LocalizedString;
  phone: string;
  email: string;
  hours: LocalizedString;
  social: {
    instagram: string;
    whatsapp: string;
    telegram: string;
  };
};
