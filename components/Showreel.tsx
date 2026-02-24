"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const featuredWorks = [
    { id: 1, title: "Cinematic Narrative", category: "Commercial", src: "/featured-work/work1.mp4" },
    { id: 2, title: "Brand Storytelling", category: "Documentary", src: "/featured-work/work2.mp4" },
    { id: 3, title: "Chandini Chowdary", category: "Model Shoot", src: "/featured-work/work3.mp4" },
    { id: 4, title: "Motion Graphics", category: "Experimental", src: "/featured-work/work4.mp4" },
];

export default function Showreel() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const togglePlay = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleProgress = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setProgress((current / total) * 100);
            setCurrentTime(current);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            videoRef.current.currentTime = percentage * videoRef.current.duration;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, []);

    return (
        <section id="showreel" className="py-24 px-6 bg-apple-surface">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal direction="up" delay={0} distance={25}>
                    <div className="flex flex-col items-center mb-16">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-apple-text/20 animate-pulse"></span>
                            <span className="text-apple-text/40 uppercase tracking-[0.2em] font-bold text-xs">Showreel</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center text-apple-text max-w-2xl leading-tight">
                            Witness the <span className="text-apple-text/60">Cinematic</span> Standard
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Main Showreel Player */}
                <div
                    className="relative group max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl aspect-video bg-black border border-apple-border"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => isPlaying && setShowControls(false)}
                    onClick={() => togglePlay()}
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover relative z-10"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={handleProgress}
                        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                        playsInline
                        autoPlay
                        muted
                        loop
                    >
                        <source src="/showreel/Showreel.mp4" type="video/mp4" />
                    </video>

                    {/* Controls Overlay */}
                    <AnimatePresence>
                        {(showControls || !isPlaying) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 md:p-8"
                            >
                                {!isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-300"
                                        >
                                            <Play className="text-white fill-white ml-2" size={36} />
                                        </motion.div>
                                    </div>
                                )}

                                <div className="w-full h-1 bg-white/20 rounded-full mb-6 cursor-pointer relative" onClick={handleSeek}>
                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-150"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="text-white/80 hover:text-white transition-colors">
                                            {isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white" size={24} />}
                                        </button>
                                        <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                                            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                        </button>
                                        <span className="text-white/60 text-sm font-mono tracking-tighter">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>
                                    <button className="text-white/80 hover:text-white transition-colors">
                                        <Maximize size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Statistics Banner */}
                <div className="mt-16 mb-24 flex flex-wrap justify-center gap-12 md:gap-24">
                    {[
                        { label: "Projects", value: "100+" },
                        { label: "Brands", value: "20+" },
                        { label: "Views", value: "10M+" },
                    ].map((stat, i) => (
                        <ScrollReveal key={i} direction="up" delay={i * 150} distance={20}>
                            <div className="text-center">
                                <div className="text-3xl font-black text-apple-text">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-[0.3em] text-apple-text/40 font-bold mt-1">{stat.label}</div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Featured Work Grid - 4 Landscape Boxes */}
                <div className="space-y-12">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold tracking-tight text-apple-text">Featured Work</h3>
                        <div className="h-px flex-1 bg-apple-border mx-8 hidden md:block" />
                        <button className="text-sm font-bold tracking-tight text-apple-text/60 hover:text-apple-text transition-colors flex items-center gap-2 group">
                            VIEW FULL PORTFOLIO <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mr-[-2px]">
                        {featuredWorks.map((work) => (
                            <WorkBox key={work.id} work={work} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function WorkBox({ work }: { work: typeof featuredWorks[0] }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isHovered]);

    return (
        <motion.div
            className="group relative rounded-[24px] overflow-hidden bg-black aspect-video border border-apple-border cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <video
                ref={videoRef}
                src={work.src}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                muted
                loop
                playsInline
                autoPlay // Added autoplay so it plays on mobile immediately
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="overflow-hidden">
                    <motion.div
                        animate={{ y: isHovered ? 0 : 0 }}
                        className="flex flex-col gap-1"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
                            {work.category}
                        </span>
                        <h4 className="text-xl font-bold text-white tracking-tight">
                            {work.title}
                        </h4>
                    </motion.div>
                </div>

                {/* Visual Indicator */}
                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play size={16} className="text-white fill-white ml-0.5" />
                </div>
            </div>

            {/* Subtle hover border glow */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-[24px] pointer-events-none transition-colors duration-500" />
        </motion.div>
    );
}
