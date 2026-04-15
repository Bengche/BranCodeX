/**
 * app/api/chat/route.js
 *
 * Secure server-side proxy for the Groq API.
 * Keeps GROQ_API_KEY out of the client bundle.
 */

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: { message: "Invalid messages" } }, { status: 400 });
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.65,
      }),
    });

    const data = await groqRes.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
