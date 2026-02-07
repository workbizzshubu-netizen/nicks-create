"use client";
import React from "react";

export default function About() {
    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Wrapper */}
                <div className="p-6 md:p-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* LEFT */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black/85">
                                About{" "}
                                <span className="theme-gradient-text font-black">nicks.create</span>
                            </h2>

                            <p className="mt-5 text-lg text-black/55 leading-relaxed">
                                I’m a{" "}
                                <span className="text-black/75 font-bold">
                                    Video Editor & Motion Designer
                                </span>{" "}
                                focused on creating premium edits that hold attention and convert
                                viewers into customers.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="about-pill">Reels / Shorts</span>
                                <span className="about-pill">YouTube Editing</span>
                                <span className="about-pill">Motion Graphics</span>
                                <span className="about-pill">Brand Videos</span>
                                <span className="about-pill">Sound Design</span>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <a href="#work" className="btn btn-glass">
                                    View Portfolio
                                </a>
                                <a href="#contact" className="btn btn-ask">
                                    Hire Me
                                </a>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="about-card">
                                <div className="about-card-title">Clean Storytelling</div>
                                <p className="about-card-text">
                                    Smooth pacing, modern cuts, cinematic flow — audience retention
                                    focused.
                                </p>
                            </div>

                            <div className="about-card">
                                <div className="about-card-title">Motion Design</div>
                                <p className="about-card-text">
                                    Premium animations, typography & effects that upgrade your
                                    content instantly.
                                </p>
                            </div>

                            <div className="about-card">
                                <div className="about-card-title">Fast Delivery</div>
                                <p className="about-card-text">
                                    Quick turnarounds, revisions support & pro communication.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Worked With - Creators & Brands */}
                    <div className="mt-16">
                        <div className="flex items-center justify-between gap-6 flex-wrap">
                            <h3 className="text-2xl md:text-3xl font-black text-black/80">
                                Worked With{" "}
                                <span className="theme-gradient-text">Creators & Brands</span>
                            </h3>
                            <p className="text-black/50 text-sm md:text-base max-w-xl">
                                Premium collaborations across content, editing & motion design.
                            </p>
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
                                <span className="font-bold text-black/70 text-sm">
                                    {item.initial}
                                </span>
                            )}
                        </div>
                        <span className="logo-text">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
