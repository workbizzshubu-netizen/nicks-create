"use client";
import React from "react";

const testimonials = [
    {
        name: "Aarav Mehta",
        role: "Startup Founder",
        text: "Editing quality next-level hai. Smooth cuts, perfect pacing and motion graphics ka execution 🔥. Deliveries time pe hui and communication also super professional.",
        rating: 5,
    },
    {
        name: "Simran Kaur",
        role: "Content Creator",
        text: "Shorts/Reels editing bilkul premium. Hook strong bana diya and retention improve hua. Highly recommended!",
        rating: 5,
    },
    {
        name: "Rohit Sharma",
        role: "Brand Manager",
        text: "We needed brand videos with motion design. nicks.create delivered exactly as per reference style. Clean, fast & creative.",
        rating: 5,
    },
];

export default function Testimonial() {
    return (
        <section id="testimonials" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black/85">
                        Client{" "}
                        <span className="theme-gradient-text font-black">Testimonials</span>
                    </h2>
                    <p className="text-black/55 text-lg mt-4 max-w-2xl mx-auto">
                        Real feedback from creators & brands who trust nicks.create for
                        editing and motion design.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card">
                            {/* rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, idx) => (
                                    <span key={idx} className="star">
                                        ★
                                    </span>
                                ))}
                            </div>

                            <p className="text-black/65 text-[15px] leading-relaxed">
                                “{t.text}”
                            </p>

                            <div className="mt-6 flex items-center gap-4">
                                <div className="avatar-bubble">
                                    <span className="font-black text-black/70">
                                        {t.name.split(" ")[0][0]}
                                        {t.name.split(" ")[1][0]}
                                    </span>
                                </div>

                                <div className="text-left">
                                    <div className="font-extrabold text-black/80">{t.name}</div>
                                    <div className="text-black/45 text-sm">{t.role}</div>
                                </div>
                            </div>

                            {/* gradient divider */}
                            <div className="testimonial-divider" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
