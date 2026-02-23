"use client";

import { motion, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";

interface VideoItem {
    id: number | string;
    src: string;
}

interface VideoCarouselProps {
    videos: VideoItem[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const next = () => {
        setCurrentIndex((prev: number) => (prev + 1) % videos.length);
    };

    const prev = () => {
        setCurrentIndex((prev: number) => (prev - 1 + videos.length) % videos.length);
    };

    return (
        <div className="relative h-[650px] flex items-center justify-center overflow-hidden">

            {!isMobile && (
                <>
                    <button onClick={prev} className="absolute left-5 z-50">←</button>
                    <button onClick={next} className="absolute right-5 z-50">→</button>
                </>
            )}

            {videos.map((video, index) => {
                const offset = index - currentIndex;

                if (Math.abs(offset) > 2) return null;

                return (
                    <motion.div
                        key={video.id}
                        drag={isMobile ? "x" : false}
                        dragConstraints={{ left: -100, right: 100 }}
                        onDragEnd={(_e: any, info: PanInfo) => {
                            if (!isMobile) return;
                            if (info.offset.x < -50) next();
                            if (info.offset.x > 50) prev();
                        }}
                        animate={{
                            x: offset * 280,
                            scale: offset === 0 ? 1 : 0.85,
                            opacity: Math.abs(offset) > 1 ? 0 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute w-[300px] h-[540px] rounded-3xl overflow-hidden"
                        onClick={() => !isMobile && setCurrentIndex(index)}
                    >
                        <video
                            src={video.src}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}