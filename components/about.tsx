import React from "react";
import Image from "next/image";
import { Sparkles, Zap, Timer, Play, CheckCircle2 } from "lucide-react";

export default function About() {
    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Wrapper */}
                <div className="p-6 md:p-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* LEFT: Logo and Intro */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-apple-accent/20 bg-white shadow-2xl shadow-apple-accent/10 mb-10 group hover:scale-105 transition-transform duration-500">
                                <Image
                                    src="/logo.jpg"
                                    alt="nicks.create logo"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-tight">
                                About <br />
                                <span className="text-apple-accent">nicks.create</span>
                            </h2>

                            <p className="mt-8 text-xl text-black/70 leading-relaxed max-w-lg font-medium">
                                I’m a <span className="text-black font-extrabold underline decoration-apple-accent/30 decoration-4 underline-offset-4">Video Editor & Motion Designer</span> focused on creating premium edits that hold attention and convert viewers into customers.
                            </p>

                            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full border border-black/5">
                                    <CheckCircle2 className="w-4 h-4 text-apple-accent" />
                                    <span className="text-sm font-bold text-black/60 uppercase tracking-widest">Premium Quality</span>
                                </div>
                                <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full border border-black/5">
                                    <Zap className="w-4 h-4 text-apple-accent" />
                                    <span className="text-sm font-bold text-black/60 uppercase tracking-widest">Fast Delivery</span>
                                </div>
                            </div>

                            <div className="mt-12 flex gap-6">
                                <a href="#work" className="btn btn-ask px-10 py-4 shadow-xl shadow-apple-accent/20">
                                    View Portfolio
                                </a>
                                <a href="/booking" className="btn btn-glass px-10 py-4">
                                    Start Project
                                </a>
                            </div>
                        </div>

                        {/* RIGHT: Core Values/Process */}
                        <div className="space-y-6">
                            <div className="glass-card p-8 group hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 border-black/5">
                                <div className="w-12 h-12 rounded-xl bg-apple-accent/10 flex items-center justify-center mb-6 text-apple-accent">
                                    <Play className="w-6 h-6 fill-current" />
                                </div>
                                <h3 className="text-2xl font-black text-black mb-3 italic tracking-tight">Clean Storytelling</h3>
                                <p className="text-black/60 font-medium leading-relaxed text-base">
                                    Smooth pacing, modern cuts, and cinematic flow designed explicitly for maximum audience retention and engagement.
                                </p>
                            </div>

                            <div className="glass-card p-8 group hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 border-black/5">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-600">
                                    <Sparkles className="w-6 h-6 fill-current" />
                                </div>
                                <h3 className="text-2xl font-black text-black mb-3 italic tracking-tight">Motion Design</h3>
                                <p className="text-black/60 font-medium leading-relaxed text-base">
                                    Premium animations, custom typography, and high-end effects that instantly upgrade your content's production value.
                                </p>
                            </div>

                            <div className="glass-card p-8 group hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 border-black/5">
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 text-green-600">
                                    <Timer className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black text-black mb-3 italic tracking-tight">Fast Turnaround</h3>
                                <p className="text-black/60 font-medium leading-relaxed text-base">
                                    Predictable, fast turnarounds without compromising on quality. Professional communication and revision support at every step.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Worked With - Creators & Brands */}
                    <div className="mt-32">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 text-center md:text-left">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-4">
                                    Trusted by <br />
                                    <span className="text-apple-accent italic font-serif opacity-80">Industry Leaders</span>
                                </h3>
                                <p className="text-black/40 text-lg font-medium max-w-xl">
                                    Premium collaborations with high-growth creators and global brands.
                                </p>
                            </div>
                            <div className="h-px flex-1 bg-black/5 mx-8 hidden md:block" />
                        </div>

                        <div className="mt-10 space-y-6">
                            <div>
                                <div className="worked-title mb-3">Creators</div>
                                <div className="fade-wrap">
                                    <MarqueeRow items={creators} speed={20} />
                                </div>
                            </div>

                            <div>
                                <div className="worked-title mb-3">Brands</div>
                                <div className="fade-wrap">
                                    <MarqueeRow items={brands} speed={26} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const creators = [
    { name: "dr.vaishnavi_veerapanen", initial: "DV", image: "/creators/dr-vaishnavi.jpg" },
    { name: "dr.chaitanyachalla", initial: "DC", image: "/creators/dr-chaitanya.jpg" },
    { name: "dr.breathee", initial: "DB", image: "/creators/dr-breathee.jpg" },
    { name: "Mehak Media", initial: "MM", image: "/creators/mehak-media.jpg" },
];

const brands = [
    { name: "Bcon Club", initial: "BC", image: "/brands/bcon-club.jpg" },
    { name: "EditLobby", initial: "EL", image: "/brands/edit-lobby.jpg" },
    { name: "TBM Studioz", initial: "TB", image: "/brands/tbm-studioz.jpg" },
    { name: "Bird Box NYC", initial: "BB", image: "/brands/bird-box.jpg" },
    { name: "Oblum", initial: "OB", image: "/brands/oblum.jpg" },
    { name: "SICC", initial: "SI", image: "/brands/sicc.jpg" },
    { name: "Windchasers", initial: "WC", image: "/brands/windchasers.jpg" },
    { name: "RFC", initial: "RF", image: "/brands/rfc.png" },
];

function MarqueeRow({
    items,
    speed = 22,
}: {
    items: { name: string; initial: string; image?: string }[];
    speed?: number;
}) {
    const loopItems = [...items, ...items, ...items];

    return (
        <div className="marquee" style={{ ["--duration" as any]: `${speed}s` }}>
            <div className="marquee-track">
                {loopItems.map((item, idx) => (
                    <div key={idx} className="logo-pill">
                        <div className="logo-circle overflow-hidden">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="font-bold text-black/80 text-xs">
                                    {item.initial}
                                </span>
                            )}
                        </div>
                        <span className="logo-text font-bold text-black/70">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
