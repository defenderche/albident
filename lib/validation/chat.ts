import { z } from "zod";

export const CHAT_LOCALES = ["ru", "en", "tr"] as const;
export type ChatLocale = (typeof CHAT_LOCALES)[number];

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(40),
  locale: z.enum(CHAT_LOCALES),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;
export type ChatRequestMessage = z.infer<typeof chatMessageSchema>;
