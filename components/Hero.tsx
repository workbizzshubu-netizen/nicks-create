import React from "react";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 pt-24 md:pt-32 relative overflow-hidden">
            <div className="max-w-6xl mx-auto w-full text-center">
                {/* Glass Hero Card */}
                <div className="px-6 md:px-14 py-12 md:py-20">
                    <span className="text-xs md:text-sm uppercase tracking-[0.35em] md:tracking-[0.45em] text-black/40 mb-6 block">
                        Video Editor × Motion Designer
                    </span>

                    <h1 className="hero-title text-[12vw] sm:text-7xl md:text-[6.5vw] leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto">
                        <span className="title-gradient">CREATIVE</span>
                        <br />
                        <span className="text-apple-secondary">STORYTELLING</span>
                    </h1>

                    <p className="hero-subtitle text-base md:text-2xl max-w-2xl mx-auto px-4 mb-10 md:mb-12">
                        Premium video editing and motion design that brings your story to life.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm mx-auto md:max-w-none">
                        <a href="#work" className="btn btn-glass w-full sm:w-auto min-w-[160px] py-4">
                            View Work
                        </a>

                        <a href="/booking" className="btn btn-ask w-full sm:w-auto min-w-[160px] py-4 shadow-xl shadow-apple-accent/20">
                            Let’s Collaborate
                        </a>
                    </div>

                    {/* Scroll hint - Hide on mobile to reduce clutter */}
                    <div className="mt-10 md:mt-14 hidden md:flex items-center justify-center gap-6 text-black/30">
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
