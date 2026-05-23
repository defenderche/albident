import type { LocalizedString } from "./site";

export type Doctor = {
  slug: string;
  name: LocalizedString;
  role: LocalizedString;
  achievements: LocalizedString[];
};
