import type { LocalizedString } from "@/types/site";

export type Privacy = {
  updatedAt: string;
  intro: LocalizedString;
  sections: {
    bookings: LocalizedString;
    chat: LocalizedString;
    dataDeletion: LocalizedString;
  };
};
