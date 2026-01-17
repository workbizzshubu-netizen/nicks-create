import React from "react";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 pt-28 md:pt-32 relative overflow-hidden">
            <div className="max-w-6xl mx-auto w-full text-center">
                {/* Glass Hero Card */}
                <div className="glass-card px-8 md:px-14 py-16 md:py-20">
                    <span className="text-sm uppercase tracking-[0.45em] text-black/40 mb-6 block">
                        Video Editor × Motion Designer
                    </span>

                    <h1 className="hero-title text-[12vw] md:text-[6vw] leading-[0.95] tracking-tighter mb-6">
                        <span className="title-gradient">CREATIVE</span>
                        <br />
                        <span className="text-black/85">STORYTELLING</span>
                    </h1>

                    <p className="hero-subtitle text-lg md:text-2xl max-w-3xl mx-auto">
                        Premium video editing and motion design that brings your story to life.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
                        <a href="#work" className="btn btn-glass w-full md:w-auto">
                            View Work
                        </a>

                        <a href="#contact" className="btn btn-ask w-full md:w-auto">
                            Let’s Collaborate
                        </a>
                    </div>

                    {/* Scroll hint */}
                    <div className="mt-14 flex items-center justify-center gap-6 text-black/30">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
                        <span className="text-xs uppercase tracking-[0.35em]">
                            Scroll to explore
                        </span>
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    );
}
