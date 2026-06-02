/**
 * Whether a nav item points to the current page. Pathname is locale-stripped
 * (as returned by next-intl `usePathname`). Home matches only exactly; other
 * items also match their descendants (e.g. /services highlights /services/implants).
 */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
