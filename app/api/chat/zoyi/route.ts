import { NextResponse } from "next/server";

type Message = { role: "user" | "assistant"; content: string };

type Lead = {
    language: "hi" | "en";
    service?: "video" | "branding" | "motion";
    type?: "reels" | "long";
    quantity?: number;
    budget?: string;
    name?: string;
    phone?: string;
};

function detectLanguage(text: string): "hi" | "en" {
    if (/[अ-ह]/.test(text) || /(mujhe|chahiye|batao|kitna|paise|reel|video)/i.test(text)) {
        return "hi";
    }
    return "en";
}

function deriveLead(messages: Message[]): Lead {
    const lead: Lead = { language: "en" };
    const all = messages.map(m => m.content.toLowerCase()).join(" ");
    const lastUser = messages.filter(m => m.role === "user").pop()?.content || "";

    lead.language = detectLanguage(lastUser);

    // Service
    if (/reel|video|editing/.test(all)) lead.service = "video";
    if (/brand|logo|identity/.test(all)) lead.service = "branding";
    if (/motion|animation/.test(all)) lead.service = "motion";

    // Video type
    if (lead.service === "video") {
        if (/reel/.test(all)) lead.type = "reels";
        if (/long|youtube/.test(all)) lead.type = "long";
    }

    // Quantity
    const q = all.match(/\b\d+\b/);
    if (q) lead.quantity = Number(q[0]);

    // Budget (₹, k, l, etc.)
    const b = all.match(/₹?\s?\d{1,3}(?:,\d{3})*|\b\d+\s?(k|l|lac)\b/i);
    if (b) lead.budget = b[0];

    // Name
    if (/^[a-zA-Z ]{2,20}$/.test(lastUser.trim())) lead.name = lastUser.trim();

    // Phone
    const p = lastUser.match(/\b\d{10}\b/);
    if (p) lead.phone = p[0];

    return lead;
}

export async function POST(req: Request) {
    try {
        const { messages }: { messages: Message[] } = await req.json();
        const lead = deriveLead(messages);
        const hi = lead.language === "hi";

        let reply = "";

        /* ---------- FUNNEL ---------- */

        // 1️⃣ Entry
        if (!lead.service) {
            reply = hi
                ? "Hi 👋 Main Zoyi hoon — **nicks.create** ki sales assistant. Batao aap kis service ke liye aaye ho?"
                : "Hi 👋 I’m Zoyi, the sales assistant for **nicks.create**. What service are you looking for?";
        }

        // 2️⃣ Video type
        else if (lead.service === "video" && !lead.type) {
            reply = hi
                ? "Perfect 👍 Batao, aapko **Reels** chahiye ya **Long-form videos**?"
                : "Perfect 👍 Do you need **reels** or **long-form videos**?";
        }

        // 3️⃣ Reel pricing
        else if (lead.type === "reels" && !lead.quantity) {
            reply = hi
                ? "Reels editing ₹1,500–₹4,000 per reel hoti hai. Aap **kitni reels** chahoge?"
                : "Reels editing costs ₹1,500–₹4,000 per reel. How many reels do you need?";
        }

        // 4️⃣ Long pricing
        else if (lead.type === "long" && !lead.quantity) {
            reply = hi
                ? "Long-form video editing ₹6,000–₹15,000 per video hoti hai. Video length bata sakte ho?"
                : "Long-form video editing costs ₹6,000–₹15,000 per video. What’s the video length?";
        }

        // 5️⃣ Ask budget (ONLY ONCE)
        else if (lead.quantity && !lead.budget) {
            reply = hi
                ? "Great 👍 Agar aap **approx budget** share kar do, main best package optimize kar dungi."
                : "Great 👍 If you can share an **approx budget**, I’ll optimize the best package for you.";
        }

        // 6️⃣ Ask contact (AFTER budget)
        else if (lead.budget && !lead.phone) {
            reply = hi
                ? "Perfect 🙌 Last step: apna **naam aur phone number** share kar do."
                : "Perfect 🙌 Final step: please share your **name and phone number**.";
        }

        // 7️⃣ Deal close + WhatsApp
        else {
            const OWNER_WA = "919999999999"; // 🔁 change to your number
            const waText = encodeURIComponent(
                `Hi! I spoke with Zoyi regarding my ${lead.service}${lead.type ? " (" + lead.type + ")" : ""} project.`
            );
            const waLink = `https://wa.me/${OWNER_WA}?text=${waText}`;

            reply = hi
                ? `Thanks 🙌 Details save ho gaye.\n\n👉 **WhatsApp pe continue karein:**\n${waLink}`
                : `Thanks 🙌 Details saved.\n\n👉 **Continue on WhatsApp:**\n${waLink}`;
        }

        return NextResponse.json({ reply });
    } catch {
        return NextResponse.json({ reply: "Please refresh once and try again." });
    }
}
