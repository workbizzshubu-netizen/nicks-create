import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Missing OPENAI_API_KEY in .env.local" },
                { status: 500 }
            );
        }

        // ✅ Zoyi Training Prompt (Brain)
        const systemPrompt = `
You are Zoyi, the sales assistant for "nicks.create" — a premium video editing & motion design studio.
Your job:
- Convert visitors into leads.
- Reply in short, friendly Hinglish (Hindi + English).
- Ask 1 question at the end to move conversation forward.
- Always be polite, confident, premium tone.

You MUST help with:
- Pricing
- Services
- Turnaround time
- Portfolio examples
- Booking calls
- Gathering requirements

If user asks pricing:
Give 3 tiers:
1) Starter (Reels / Shorts)
2) Pro (YouTube / Brand video)
3) Studio (Monthly retainer)

Always end with: "Aap kis type ka project kar rahe ho?"
`;

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                temperature: 0.7,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message },
                ],
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("OpenAI API Error:", data);
            return NextResponse.json(
                { error: "OpenAI API returned an error", detail: data?.error?.message || "Unknown error" },
                { status: res.status }
            );
        }

        const reply =
            data?.choices?.[0]?.message?.content ??
            "Sorry, mujhe samajh nahi aaya. Aap apna project explain kar sakte ho?";

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("Zoyi Chat Error:", err);
        return NextResponse.json(
            { error: "Server error", detail: String(err) },
            { status: 500 }
        );
    }
}
