"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, ArrowRight, Sparkles, Wand2, Rocket, Phone } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

function BookingContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "General";

    const whatsappNumber = "917900509667";
    const instagramId = "create.nicks";

    const messages = {
        Simple: "Hi Nick! I'm interested in the Simple Plan (₹3,500). I'd like to get my video edited.",
        Complex: "Hi Nick! I'm interested in the Complex Plan (₹6,200). I have a project that needs heavy motion graphics.",
        Premium: "Hi Nick! I'm interested in the Premium Service (₹35,000+). I'd like to discuss a full-suite campaign.",
        General: "Hi Nick! I'm interested in working with you on a video project."
    };

    const selectedMessage = messages[plan as keyof typeof messages] || messages.General;

    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(selectedMessage)}`;
    const igLink = `https://www.instagram.com/${instagramId}/`; // IG doesn't support pre-filled DMs via direct link easily, but we can guide them

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 relative bg-apple-bg dark:bg-dark-bg">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                {/* High Demand Header (Inspired by your image) */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-apple-accent/20 bg-apple-accent/5 text-apple-accent text-[11px] font-bold uppercase tracking-widest mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-accent animate-pulse" />
                        This One’s in High Demand
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-apple-text dark:text-dark-text">
                        Secure Your <span className="italic font-serif text-apple-accent">Spot</span>
                    </h1>

                    <p className="text-apple-secondary dark:text-dark-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Our {plan !== "General" ? plan : ""} plans are currently limited and offered on a
                        first-come, first-serve basis. Join the waitlist or message us directly to lock in your project.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="#waitlist" className="bg-[#A78BFA] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-[#A78BFA]/20 hover:scale-105 transition-transform w-full sm:w-auto">
                            Join Waitlist
                        </Link>
                        <Link href="/#pricing" className="bg-transparent border border-apple-border dark:border-white/10 text-apple-text/60 dark:text-dark-text/60 px-10 py-4 rounded-full font-bold hover:bg-apple-surface dark:hover:bg-dark-surface transition-colors w-full sm:w-auto">
                            Browse Special Plans
                        </Link>
                    </div>
                </div>

                {/* Direct Message Options */}
                <div className="text-center mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-apple-text/30 dark:text-dark-text/40">Direct Booking</span>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-24">
                    {/* WhatsApp Card */}
                    <motion.a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="glass-card p-10 flex flex-col items-center text-center group bg-white dark:bg-dark-surface shadow-xl shadow-green-500/5 border-apple-border dark:border-white/5 hover:border-green-500/30 transition-all duration-500"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <MessageCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-apple-text dark:text-dark-text">WhatsApp</h3>
                        <p className="text-apple-secondary dark:text-dark-secondary text-sm mb-8 leading-relaxed">
                            Fastest response. We'll discuss your project and get started immediately.
                        </p>
                        <div className="mt-auto w-full py-4 rounded-full bg-green-600 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-green-700 transition-colors">
                            Message Nick <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.a>

                    {/* Instagram Card */}
                    <motion.a
                        href={igLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className="glass-card p-10 flex flex-col items-center text-center group bg-white dark:bg-dark-surface shadow-xl shadow-purple-500/5 border-apple-border dark:border-white/5 hover:border-purple-500/30 transition-all duration-500"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Instagram className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-apple-text dark:text-dark-text">Instagram</h3>
                        <p className="text-apple-secondary dark:text-dark-secondary text-sm mb-8 leading-relaxed">
                            Connect with us on Instagram to see more work and discuss your vision.
                        </p>
                        <div className="mt-auto w-full py-4 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-purple-700 transition-colors">
                            DM @create.nicks <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.a>
                </div>

                {/* Waitlist Form Section (Inspired by your image) */}
                <motion.div
                    id="waitlist"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 md:p-16 text-center max-w-3xl mx-auto dark:bg-dark-surface border-apple-border dark:border-white/5"
                >
                    <div className="mb-12">
                        <span className="px-4 py-1.5 rounded-full border border-apple-border dark:border-white/10 text-[10px] font-bold uppercase tracking-widest text-apple-text/40 dark:text-dark-text/40 mb-8 inline-block">
                            Join the Waitlist
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-apple-text dark:text-dark-text">
                            Save Your <span className="italic font-serif text-[#A78BFA]">Spot</span>
                        </h2>
                        <p className="text-apple-secondary dark:text-dark-secondary text-lg max-w-lg mx-auto leading-relaxed">
                            Our Team will reach out to you whenever the availability comes up for your project.
                        </p>
                    </div>

                    <form className="max-w-md mx-auto space-y-6">
                        <div className="text-left">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-apple-text/30 dark:text-dark-text/40 ml-2 mb-3 block">Name</label>
                            <input
                                type="text"
                                placeholder="Jane Smith"
                                className="w-full bg-apple-bg dark:bg-dark-bg border border-apple-border dark:border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-apple-accent transition-colors text-apple-text dark:text-dark-text placeholder:text-apple-text/20 dark:placeholder:text-dark-text/20"
                            />
                        </div>
                        <div className="text-left">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-apple-text/30 dark:text-dark-text/40 ml-2 mb-3 block">Email</label>
                            <input
                                type="email"
                                placeholder="jane@example.com"
                                className="w-full bg-apple-bg dark:bg-dark-bg border border-apple-border dark:border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-apple-accent transition-colors text-apple-text dark:text-dark-text placeholder:text-apple-text/20 dark:placeholder:text-dark-text/20"
                            />
                        </div>
                        <button type="submit" className="w-full py-5 rounded-full bg-apple-text dark:bg-dark-text text-apple-bg dark:text-dark-bg font-bold hover:opacity-90 transition-all hover:scale-[1.02] mt-4 shadow-xl shadow-black/10">
                            Join Waitlist
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <BookingContent />
        </Suspense>
    );
}
