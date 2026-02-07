"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
    }, [messages, open, loading]);

    // --- BOT TRAINING / KNOWLEDGE BASE ---
    const KNOWLEDGE_BASE: Record<string, string> = {
        "tell me pricing": "Pricing depends on the project depth! Typically: \n• Short-form (Reels/Shorts): Starts at $50/video \n• YouTube Long-form: Starts at $150 \n• Motion Graphics only: $100+ \n\nDM me on WhatsApp at +91 7900509667 for a custom package quote!",
        "our services": "We provide end-to-end video solutions: \n• High-Retention Editing \n• Premium Motion Graphics \n• Sound Design & Mixing \n• Cinematic Transitions \n• Color Grading for Brands & Creators.",
        "book a meeting": "Awesome! You can chat with me directly on WhatsApp here: https://wa.me/917900509667 or just drop your contact details in the form below.",
        "hello": "Hi there! I'm Zoyi. How can I help you elevate your content today?",
        "hi": "Hey! Looking to upgrade your video game? I'm here to help.",
        "who are you": "I'm Zoyi, the AI assistant for nicks.create. I help creators and brands get the best video editing and motion design services.",
        "software": "We use the industry's best: Adobe Premiere Pro, After Effects, and DaVinci Resolve to ensure top-notch quality.",
        "delivery": "Typically, short-form content takes 24-48 hours. Long-form projects depend on depth but we usually deliver within 3-5 days. Fastest turnaround in the game! 🔥",
        "how long": "Typically, short-form takes 24-48 hours. Long-form projects depend on depth but we usually deliver within 3-5 days.",
        "revisions": "We offer revisions to ensure the final edit is exactly what you envisioned. Your satisfaction is the priority!",
        "process": "Simple: 1. You share the raw files. 2. We edit with high-retention hooks & motion design. 3. You review & we finalize. Ready to start?",
        "examples": "You can scroll up to the 'Portfolio' section to see our latest work, or I can send you a specific link on WhatsApp: +91 7900509667",
        "work": "You can check our work in the portfolio section above!"
    };

    const getBotResponse = (input: string) => {
        const query = input.toLowerCase().trim();

        // --- LEAD DETECTION (Phone Number) ---
        const phoneRegex = /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
        const foundNumbers = input.match(phoneRegex);

        if (foundNumbers && foundNumbers.length > 0) {
            const number = foundNumbers[0];
            const waLink = `https://wa.me/917900509667?text=${encodeURIComponent(`Hi Shubham! I just shared my contact on your site: ${number}. Let's discuss my project!`)}`;
            return `Noted your number: ${number}! 📝 \n\nAb aap niche link par click karke direct mujhe WhatsApp par message bhej sakte hain taaki main turant contact kar saku: \n\n👉 https://wa.me/917900509667?text=${encodeURIComponent(`Hi Shubham! I just shared my contact on your site: ${number}. Let's discuss my project!`)}`;
        }

        // Exact matches
        if (KNOWLEDGE_BASE[query]) return KNOWLEDGE_BASE[query];

        // Partial matches
        for (const key in KNOWLEDGE_BASE) {
            if (query.includes(key)) return KNOWLEDGE_BASE[key];
        }

        return "I'm still learning! 😅 But I can definitely help with pricing, services, or booking a meeting. Or you can leave a message in the contact form!";
    };

    const send = async (text?: string) => {
        const msg = (text ?? input).trim();
        if (!msg || loading) return;

        setMessages((prev) => [...prev, { role: "user", text: msg }]);
        setInput("");
        setLoading(true);

        // Simulate "Thinking" time for realism
        setTimeout(() => {
            const reply = getBotResponse(msg);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: reply },
            ]);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Launcher */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="zoyi-launcher flex items-center gap-3 p-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl transition-all duration-300 pointer-events-auto"
            >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 border border-white/80 shadow-inner flex items-center justify-center">
                    <Image src="/zoyi.png" alt="Zoyi" width={38} height={38} priority className="object-cover" />
                </div>
                {!open && (
                    <div className="hidden md:block pr-4 text-left">
                        <div className="font-black text-sm text-black/85 leading-none mb-1">Zoyi</div>
                        <div className="text-[11px] text-black/50 font-medium">Sales Assistant</div>
                    </div>
                )}
                {open && <span className="text-black/60 font-bold px-2 text-sm">Close</span>}
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-40px)] rounded-[32px] overflow-hidden bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_40px_100px_rgba(0,0,0,0.15)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-black/5 flex items-center justify-between bg-gradient-to-r from-transparent to-white/30">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center p-1 border border-white/80">
                                    <Image src="/zoyi.png" alt="Zoyi" width={28} height={28} />
                                </div>
                                <div>
                                    <div className="font-black text-black/90 tracking-tight">Zoyi Chat</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">Active Now</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors">
                                <span className="text-black/50 text-xl">✕</span>
                            </button>
                        </div>

                        {/* Body */}
                        <div ref={bodyRef} className="h-[380px] overflow-y-auto p-6 flex flex-col gap-4 scrollbar-hide">
                            {messages.map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`p-4 rounded-[22px] max-w-[85%] text-[14px] leading-relaxed relative ${m.role === "user"
                                        ? "bg-black/85 text-white ml-auto rounded-tr-none shadow-lg shadow-black/10"
                                        : "bg-white/90 text-black/80 mr-auto rounded-tl-none border border-white shadow-sm"
                                        }`}
                                >
                                    {m.text.split(/(\bhttps?:\/\/\S+)/g).map((part, index) => (
                                        part.match(/^https?:\/\/\S+$/) ? (
                                            <a
                                                key={index}
                                                href={part}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-600 font-bold underline break-all hover:text-pink-500 transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {part.includes("wa.me") ? "Click here to chat on WhatsApp" : part}
                                            </a>
                                        ) : (
                                            <span key={index} className="whitespace-pre-wrap">{part}</span>
                                        )
                                    ))}
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white/90 text-black/40 mr-auto p-4 rounded-[22px] rounded-tl-none border border-white shadow-sm flex gap-1"
                                >
                                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-black/20"></motion.span>
                                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-black/20"></motion.span>
                                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-black/20"></motion.span>
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="px-6 pb-2 flex gap-2 flex-wrap">
                            {["Tell me pricing", "Our services", "Book a meeting"].map((text) => (
                                <button
                                    key={text}
                                    onClick={() => send(text)}
                                    className="px-4 py-2 rounded-full bg-white/80 border border-white/50 text-[11px] font-black text-black/60 hover:bg-black/5 transition-colors shadow-sm"
                                >
                                    {text}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-gradient-to-b from-transparent to-white/40">
                            <div className="relative group">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full h-14 pl-6 pr-14 rounded-full bg-white overflow-hidden border border-black/5 focus:border-purple-300 outline-none text-sm font-medium transition-all shadow-inner"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") send();
                                    }}
                                />
                                <button
                                    onClick={() => send()}
                                    className={`absolute right-2 top-2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${input.trim() ? "bg-black text-white scale-100 shadow-lg" : "bg-black/5 text-black/20 scale-90"
                                        }`}
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
