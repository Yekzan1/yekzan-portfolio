import type { NextRequest } from "next/server";
import { answerLocally, buildSystemPrompt } from "@/lib/chatbot/knowledge";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

function sanitizeHistory(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

export async function POST(req: NextRequest) {
  let body: { message?: unknown; history?: unknown; locale?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  if (!message) return Response.json({ error: "Empty message" }, { status: 400 });

  const locale: Locale = isLocale(String(body.locale)) ? (body.locale as Locale) : defaultLocale;
  const history = sanitizeHistory(body.history);

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Optional LLM path — only if a key is configured. Otherwise the site stays free.
  if (apiKey) {
    try {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey });
      const completion = await client.messages.create({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: buildSystemPrompt(locale),
        messages: [...history, { role: "user", content: message }],
      });
      const text = completion.content
        .map((block) => (block.type === "text" ? block.text : ""))
        .join("\n")
        .trim();
      return Response.json({ text: text || answerLocally(message, locale), source: "llm" });
    } catch {
      // Network/quota/key error → graceful fallback, never a broken UI.
      return Response.json({ text: answerLocally(message, locale), source: "fallback" });
    }
  }

  return Response.json({ text: answerLocally(message, locale), source: "local" });
}
