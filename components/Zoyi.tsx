"use client";

import { useState } from "react";
import Image from "next/image";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function Zoyi() {
    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hi 👋 I’m Zoyi, nicks.create ki sales assistant. Batao kis type ka project chahiye?",
        },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);

    const sendMessage = async () => {
        if (!input.trim() || typing) return;

        const userMessage: Message = { role: "user", content: input };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");
        setTyping(true);

        try {
            const res = await fetch("/api/chat/zoyi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Please refresh once and try again.",
                },
            ]);
        } finally {
            setTyping(false);
        }
    };

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                >
                    <Image src="/zoyi.png" alt="Zoyi" width={32} height={32} />
                </button>
            )}

            {open && (
                <div className="fixed bottom-6 right-6 z-50 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <Image src="/zoyi.png" alt="Zoyi" width={32} height={32} />
                            <div>
                                <p className="text-sm font-medium text-white">Zoyi</p>
                                <p className="text-xs text-white/60">Sales Assistant</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-white/60 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="h-64 overflow-y-auto px-4 py-3 space-y-3 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={
                                    msg.role === "user"
                                        ? "text-right text-white"
                                        : "text-left text-white/80"
                                }
                            >
                                <span className="inline-block px-3 py-2 rounded-xl bg-white/10">
                                    {msg.content}
                                </span>
                            </div>
                        ))}
                        {typing && (
                            <div className="text-left text-white/50 text-xs">
                                Zoyi is typing…
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 p-3 border-t border-white/10">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type your message…"
                            className="flex-1 bg-transparent text-white text-sm outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className="text-sm px-3 py-1 rounded-full bg-white text-black"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
