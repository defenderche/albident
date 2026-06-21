import OpenAI from "openai";

export type Translation = { en: string; tr: string };

// Переводит карту key→RU в key→{en,tr} одним запросом к OpenAI.
// Ключи произвольные (в т.ч. с точками для вложенных полей) — модель их сохраняет.
// При сбое или пропуске ключа — фолбэк на русский текст (сохранение не блокируется).
export async function translateRuStrings(
  ru: Record<string, string>,
): Promise<Record<string, Translation>> {
  const keys = Object.keys(ru);
  if (keys.length === 0) return {};

  const fallback = (): Record<string, Translation> =>
    Object.fromEntries(keys.map((k) => [k, { en: ru[k], tr: ru[k] }]));

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "Ты переводишь тексты стоматологической клиники с русского на английский (en) и турецкий (tr). Перевод естественный, термины корректные, без канцелярита; сохраняй смысл, тон и форматирование. Ничего не добавляй от себя.",
        },
        {
          role: "user",
          content:
            'Переведи каждое значение. Верни строго JSON вида {"translations": {"<key>": {"en": "...", "tr": "..."}}}. Ключи сохрани без изменений.\n\n' +
            JSON.stringify(ru),
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as {
      translations?: Record<string, Partial<Translation>>;
    };
    const out = parsed.translations ?? {};

    return Object.fromEntries(
      keys.map((k) => {
        const t = out[k];
        return [
          k,
          {
            en: typeof t?.en === "string" && t.en.trim() ? t.en : ru[k],
            tr: typeof t?.tr === "string" && t.tr.trim() ? t.tr : ru[k],
          },
        ];
      }),
    );
  } catch (error) {
    console.error("Service translation failed", error);
    return fallback();
  }
}
