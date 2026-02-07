"use client";
import React from "react";

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
    return (
        <section id="testimonials" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black/85">
                        Client <span className="theme-gradient-text font-black">Success</span>
                    </h2>
                    <p className="text-black/55 text-lg mt-4 max-w-2xl mx-auto">
                        Real proof of growth and satisfaction from creators and brands sharing their experience.
                    </p>
                </div>

                {/* Grid of Screenshots */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="bg-white/40 backdrop-blur-md rounded-[32px] p-4 border border-white/60 shadow-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]"
                        >
                            <div className="w-full h-full rounded-[24px] overflow-hidden bg-white/20 relative flex items-center justify-center">
                                <img
                                    src={t.image}
                                    alt={`Testimonial ${t.id}`}
                                    className="max-w-full max-h-full w-auto h-auto object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-black/5', 'min-h-[200px]');
                                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-black/20 font-bold uppercase tracking-widest text-xs">Waiting for Proof ${t.id}</span>`;
                                    }}
                                />
                                {/* Bottom Accent */}
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
