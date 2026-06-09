import type { LocalizedString } from "./site";

export type Doctor = {
  slug: string;
  /** Path to the drawn avatar in /public. If absent — silhouette fallback. */
  avatar?: string;
  name: LocalizedString;
  role: LocalizedString;
  achievements: LocalizedString[];
};
