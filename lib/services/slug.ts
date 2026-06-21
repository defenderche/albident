// slug из английского названия услуги: нижний регистр, латиница/цифры, дефисы.
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Гарантирует уникальность среди уже занятых slug'ов: при коллизии -2, -3, …
export function uniqueSlug(base: string, taken: ReadonlySet<string>): string {
  const root = base || "service";
  if (!taken.has(root)) return root;
  let i = 2;
  while (taken.has(`${root}-${i}`)) i++;
  return `${root}-${i}`;
}
