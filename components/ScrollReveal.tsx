"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;        // delay in ms
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;     // pixels to travel
    duration?: number;     // ms
    once?: boolean;        // only animate once
    scale?: number;        // starting scale (e.g. 0.95)
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
    distance = 40,
    duration = 700,
    once = true,
    scale,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [once]);

    const getTransform = () => {
        if (isVisible) return "translate3d(0,0,0) scale(1)";
        const scaleVal = scale ? `scale(${scale})` : "scale(1)";
        switch (direction) {
            case "up": return `translate3d(0,${distance}px,0) ${scaleVal}`;
            case "down": return `translate3d(0,-${distance}px,0) ${scaleVal}`;
            case "left": return `translate3d(${distance}px,0,0) ${scaleVal}`;
            case "right": return `translate3d(-${distance}px,0,0) ${scaleVal}`;
            case "none": return `translate3d(0,0,0) ${scale ? `scale(${scale})` : "scale(0.95)"}`;
            default: return `translate3d(0,${distance}px,0) ${scaleVal}`;
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </div>
    );
}
