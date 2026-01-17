"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Msg = {
    role: "user" | "assistant";
    text: string;
};

export default function Zoyi() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState<Msg[]>([
        { role: "assistant", text: "Hi 👋 I’m Zoyi. Aapko kis project me help chahiye?" },
    ]);

    const bodyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!bodyRef.current) return;
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [messages, open]);

    const send = async (text?: string) => {
        const msg = (text ?? input).trim();
        if (!msg || loading) return;

        setMessages((prev) => [...prev, { role: "user", text: msg }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat/zoyi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: data?.reply || "Sorry, kuch issue ho gaya." },
            ]);
        } catch (e) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Network issue 😅. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Launcher */}
            <button onClick={() => setOpen(!open)} className="zoyi-launcher">
                <div className="zoyi-icon">
                    <Image src="/zoyi.png" alt="Zoyi" width={34} height={34} priority />
                </div>
                <div className="zoyi-text">
                    <div className="zoyi-title">Zoyi</div>
                    <div className="zoyi-subtitle">Sales assistant</div>
                </div>
            </button>

            {/* Chat Panel */}
            {open && (
                <div className="zoyi-panel">
                    <div className="zoyi-panel-header">
                        <div className="flex items-center gap-2">
                            <Image src="/zoyi.png" alt="Zoyi" width={22} height={22} />
                            <span className="font-bold text-black/80">Zoyi</span>
                        </div>
                        <button onClick={() => setOpen(false)} className="zoyi-close">
                            ✕
                        </button>
                    </div>

                    <div ref={bodyRef} className="zoyi-panel-body-scroll">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`zoyi-msg ${m.role === "user" ? "zoyi-user" : "zoyi-ai"
                                    }`}
                            >
                                {m.text}
                            </div>
                        ))}

                        {loading && <div className="zoyi-msg zoyi-ai">Typing...</div>}
                    </div>

                    <div className="zoyi-panel-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type message..."
                            className="zoyi-input"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") send();
                            }}
                        />
                        <button onClick={() => send()} className="zoyi-send">
                            ➤
                        </button>
                    </div>

                    <div className="zoyi-quick">
                        <button onClick={() => send("pricing")} className="zoyi-chip">
                            Pricing
                        </button>
                        <button onClick={() => send("services")} className="zoyi-chip">
                            Services
                        </button>
                        <button onClick={() => send("book a call")} className="zoyi-chip">
                            Book Call
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
