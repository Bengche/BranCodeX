/**
 * app/api/chat/route.js
 *
 * Secure server-side proxy for the Groq API with automatic model fallback.
 */

import { NextResponse } from "next/server";

// Fallback chain in order of preference
const GROQ_MODELS = [
  "llama-3.3-70b-versatile",
  "llama3-70b-8192",
  "llama-3.1-8b-instant",
  "llama3-8b-8192",
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
