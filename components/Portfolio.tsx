"use client";
import VideoCarousel from "./VideoCarousel"
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const portfolioVideos = [
    { id: 1, src: "/portfolio/video1.mp4" },
    { id: 2, src: "/portfolio/video2.mp4" },
    { id: 3, src: "/portfolio/video3.mp4" },
    { id: 4, src: "/portfolio/video4.mp4" },
];

export default function Portfolio() {
    const [currentIndex, setCurrentIndex] = useState(2); // Start with center item

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % portfolioVideos.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + portfolioVideos.length) % portfolioVideos.length);
    };

    return (
        <section id="work" className="py-24 px-6 overflow-hidden relative">
            {/* Top Badge */}
            <ScrollReveal direction="up" delay={0} distance={25}>
                <div className="flex flex-col items-center mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span className="text-black/40 uppercase tracking-[0.2em] font-bold text-xs">Work</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center text-black/85 max-w-2xl leading-tight">
                        Explore our <span className="theme-gradient-text">video editing</span> work and projects
                    </h2>
                </div>
            </ScrollReveal>

            {/* Carousel Container */}
            <div className="relative h-[650px] flex items-center justify-center max-w-7xl mx-auto">
                {/* Navigation Buttons */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-50 pointer-events-none">
                    <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 active:scale-95 bg-apple-surface border border-apple-border shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6 text-apple-text" />
                    </button>

                    <button
                        onClick={next}
                        className="w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 hover:scale-110 active:scale-95 bg-apple-surface border border-apple-border shadow-sm"
                    >
                        <ChevronRight className="w-6 h-6 text-apple-text" />
                    </button>
                </div>

                {/* Cards Wrapper */}
                <div className="flex items-center justify-center w-full h-full relative">
                    {portfolioVideos.map((video, index) => {
                        // Calculate relative position to current index
                        let offset = index - currentIndex;

                        // Handle infinite wrap-around logic for visual positioning
                        if (offset < -2) offset += portfolioVideos.length;
                        if (offset > 2) offset -= portfolioVideos.length;

                        // Only show if within range
                        const isVisible = Math.abs(offset) <= 2;
                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={video.id}
                                initial={false}
                                animate={{
                                    x: offset * 280, // Horizontal spacing
                                    scale: offset === 0 ? 1 : 0.85,
                                    zIndex: 30 - Math.abs(offset),
                                    opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.4,
                                    rotateY: offset * -15, // 3D effect
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute w-[300px] h-[540px] rounded-[32px] overflow-hidden shadow-2xl bg-black border border-white/10"
                                onClick={() => offset !== 0 && setCurrentIndex(index)}
                                style={{ cursor: offset === 0 ? "default" : "pointer" }}
                            >
                                <video
                                    src={video.src}
                                    className="w-full h-full object-cover"
                                    loop
                                    muted
                                    playsInline
                                    autoPlay
                                />
                                {/* Overlay for inactive cards */}
                                {offset !== 0 && (
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {portfolioVideos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-8 bg-orange-500" : "w-2 bg-black/10"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
