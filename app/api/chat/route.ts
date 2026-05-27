import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/chat/prompt";
import { checkChatRateLimit } from "@/lib/chat/rateLimit";
import { chatRequestSchema } from "@/lib/validation/chat";

export const runtime = "nodejs";

const MODEL = "gpt-4o-mini";
const TEMPERATURE = 0.3;
const MAX_TOKENS = 300;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not configured");
    return errorResponse(500, "config_missing");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "invalid_json");
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(400, "invalid_body");
  }

  const { messages, locale } = parsed.data;

  const rateLimit = await checkChatRateLimit(getClientIp(request));
  if (!rateLimit.allowed) {
    return errorResponse(429, `rate_limit_${rateLimit.reason}`);
  }

  const client = new OpenAI({ apiKey });

  let openaiStream: AsyncIterable<{
    choices: Array<{ delta?: { content?: string | null } }>;
  }>;
  try {
    openaiStream = await client.chat.completions.create({
      model: MODEL,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
      stream: true,
      messages: [
        { role: "system", content: buildSystemPrompt(locale) },
        ...messages,
      ],
    });
  } catch (error) {
    console.error("OpenAI request failed", error);
    return errorResponse(502, "upstream_error");
  }

  const encoder = new TextEncoder();
  const responseStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of openaiStream) {
          const token = chunk.choices[0]?.delta?.content;
          if (token) controller.enqueue(encoder.encode(token));
        }
        controller.close();
      } catch (error) {
        console.error("Stream interrupted", error);
        controller.error(error);
      }
    },
  });

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function errorResponse(status: number, code: string) {
  return Response.json({ error: code }, { status });
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
