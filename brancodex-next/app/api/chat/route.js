/**
 * app/api/chat/route.js
 *
 * Secure server-side proxy for the Groq API with automatic model fallback.
 */

import { NextResponse } from "next/server";

// Fallback chain in order of preference
const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "qwen/qwen3.8-27b",
  "groq/compound",
  "groq/compound-mini",
];

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: { message: "Invalid messages" } },
        { status: 400 },
      );
    }

    let lastData = null;

    for (const model of GROQ_MODELS) {
      try {
        const groqRes = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages,
              temperature: 0.65,
            }),
          },
        );

        const data = await groqRes.json();

        // If Groq returns 200 and has choices, return immediately
        if (groqRes.ok && data.choices?.[0]?.message) {
          return NextResponse.json(data);
        }

        lastData = data;
        console.warn(
          `[Groq Fallback] Model ${model} failed:`,
          data.error?.message || groqRes.statusText,
        );
      } catch (networkErr) {
        console.warn(
          `[Groq Fallback] Network error on model ${model}:`,
          networkErr.message,
        );
      }
    }

    // If every model fails, return the error structure expected by the frontend
    return NextResponse.json(
      lastData || {
        error: { message: "All AI models are currently unavailable." },
      },
      { status: 503 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 },
    );
  }
}
