"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
    { id: 1, image: "/testimonials/1.png" },
    { id: 2, image: "/testimonials/2.png" },
    { id: 3, image: "/testimonials/3.png" },
    { id: 4, image: "/testimonials/4.png" },
    { id: 5, image: "/testimonials/5.png" },
    { id: 6, image: "/testimonials/6.png" },
    { id: 7, image: "/testimonials/7.png" },
    { id: 8, image: "/testimonials/8.png" },
    { id: 9, image: "/testimonials/9.png" },
];

export default function Testimonial() {
    // Duplicate items for seamless loop
    const loopItems = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section id="testimonials" className="py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <ScrollReveal direction="up" delay={0} distance={25}>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-apple-text/20 animate-pulse"></span>
                            <span className="text-apple-text/40 uppercase tracking-[0.2em] font-bold text-xs">Testimonials</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-apple-text">
                            Client <span className="text-apple-text/60 font-black">Success</span>
                        </h2>
                        <p className="text-apple-text/55 text-lg mt-4 max-w-2xl mx-auto">
                            Real proof of growth and satisfaction from creators and brands sharing their experience.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Infinite Moving Row */}
                <div className="marquee" style={{ ["--duration" as any]: `40s` }}>
                    <div className="marquee-track">
                        {loopItems.map((t, idx) => (
                            <div
                                key={`${t.id}-${idx}`}
                                className="w-[300px] md:w-[400px] flex-shrink-0 bg-white/40 backdrop-blur-md rounded-[32px] p-4 border border-white/60 shadow-sm overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] mx-2"
                            >
                                <div className="w-full h-full rounded-[24px] overflow-hidden bg-white/20 relative flex items-center justify-center">
                                    <img
                                        src={t.image}
                                        alt={`Testimonial ${t.id}`}
                                        className="max-w-full max-h-full w-auto h-auto object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-black/5', 'min-h-[250px]');
                                                parent.innerHTML = `<span class="text-black/10 font-black uppercase tracking-[0.2em] text-[10px] text-center px-6">Waiting for Proof ${t.id}</span>`;
                                            }
                                        }}
                                    />
                                    {/* Bottom Accent */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second reverse row for variety */}
                <div className="marquee mt-8" style={{ ["--duration" as any]: `35s`, direction: 'rtl' } as any}>
                    <div className="marquee-track flex-row-reverse">
                        {loopItems.slice().reverse().map((t, idx) => (
                            <div
                                key={`rev-${t.id}-${idx}`}
                                className="w-[300px] md:w-[400px] flex-shrink-0 bg-white/40 backdrop-blur-md rounded-[32px] p-4 border border-white/60 shadow-sm overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] mx-2"
                            >
                                <div className="w-full h-full rounded-[24px] overflow-hidden bg-white/20 relative flex items-center justify-center">
                                    <img
                                        src={t.image}
                                        alt={`Testimonial ${t.id}`}
                                        className="max-w-full max-h-full w-auto h-auto object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-black/5', 'min-h-[250px]');
                                                parent.innerHTML = `<span class="text-black/10 font-black uppercase tracking-[0.2em] text-[10px] text-center px-6">Waiting for Proof ${t.id}</span>`;
                                            }
                                        }}
                                    />
                                    {/* Bottom Accent */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
