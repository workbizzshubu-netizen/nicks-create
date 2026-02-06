"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export default function Showreel() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
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
        <section id="showreel" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black/85">
                        Our <span className="theme-gradient-text">Showreel</span>
                    </h2>
                    <p className="text-black/55 text-lg mt-4 max-w-2xl mx-auto">
                        A glimpse into the high-energy, premium content we produce for creators and brands worldwide.
                    </p>
                </div>

                <div
                    className="relative group max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => isPlaying && setShowControls(false)}
                    onClick={togglePlay}
                >
                    {/* Decorative Background Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 z-0"></div>

                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover relative z-10"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={handleProgress}
                        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                        playsInline
                    >
                        <source src="/showreel/showreel.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* YouTube Style Controls Overlay */}
                    <AnimatePresence>
                        {(showControls || !isPlaying) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 md:p-6"
                            >
                                {/* Big Center Play Button (only when paused) */}
                                {!isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 shadow-2xl"
                                        >
                                            <Play className="text-white fill-white ml-1" size={32} />
                                        </motion.div>
                                    </div>
                                )}

                                {/* Progress Bar Container */}
                                <div
                                    className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative group/progress"
                                    onClick={handleSeek}
                                >
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
                                    </div>
                                </div>

                                {/* Controls Row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <button
                                            onClick={togglePlay}
                                            className="text-white hover:text-purple-400 transition-colors"
                                        >
                                            {isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white" size={24} />}
                                        </button>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={toggleMute}
                                                className="text-white hover:text-purple-400 transition-colors"
                                            >
                                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                            </button>
                                        </div>

                                        <span className="text-white/90 text-sm font-medium font-mono">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button className="text-white hover:text-purple-400 transition-colors">
                                            <Maximize size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-8 py-4 px-8 bg-black/5 rounded-full backdrop-blur-sm border border-black/5">
                        <div className="text-center">
                            <div className="text-2xl font-black text-black/85">100+</div>
                            <div className="text-xs uppercase tracking-widest text-black/40 font-bold">Projects</div>
                        </div>
                        <div className="w-px h-8 bg-black/10"></div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-black/85">20+</div>
                            <div className="text-xs uppercase tracking-widest text-black/40 font-bold whitespace-nowrap">Creators & Brands</div>
                        </div>
                        <div className="w-px h-8 bg-black/10"></div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-black/85">10M+</div>
                            <div className="text-xs uppercase tracking-widest text-black/40 font-bold">Views</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
