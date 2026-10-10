/**
 * app/api/chat/route.js
 *
 * Server-side proxy for the Groq API. The system prompt is added here, the
 * visitor's messages are validated, and requests are rate limited per IP.
 */

import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./systemPrompt";

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-20b",
  "llama-3.1-8b-instant",
];

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best-effort limiter: state is per server instance.
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] > RATE_WINDOW_MS) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function cleanMessages(input) {
  if (!Array.isArray(input)) return null;
  const cleaned = input
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (!cleaned.length || cleaned[cleaned.length - 1].role !== "user") {
    return null;
  }
  return cleaned;
}

function errorResponse(message, status) {
  return NextResponse.json({ error: { message } }, { status });
}

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return errorResponse("Chat is not configured.", 503);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return errorResponse("Too many messages. Please try again shortly.", 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request.", 400);
  }

  const messages = cleanMessages(body?.messages);
  if (!messages) return errorResponse("Invalid messages.", 400);

  const payload = [{ role: "system", content: SYSTEM_PROMPT }, ...messages];

  for (const model of GROQ_MODELS) {
    try {
      const groqRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: payload,
            temperature: 0.5,
            max_tokens: 600,
          }),
        },
      );

      const data = await groqRes.json();
      if (groqRes.ok && data.choices?.[0]?.message?.content) {
        return NextResponse.json({
          choices: [{ message: { content: data.choices[0].message.content } }],
        });
      }
      console.warn(
        `[chat] ${model} failed:`,
        data.error?.message || groqRes.statusText,
      );
    } catch (err) {
      console.warn(`[chat] ${model} network error:`, err.message);
    }
  }

  return errorResponse("The assistant is unavailable right now.", 503);
}
