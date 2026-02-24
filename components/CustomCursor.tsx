"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const innerCurrentRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const cursor = cursorRef.current;
        const inner = innerRef.current;
        if (!cursor || !inner) return;

        const onMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
        };

        // Smooth lerp animation loop
        const animate = () => {
            const lerpOuter = 0.12; // Outer glow follows slower
            const lerpInner = 0.25; // Inner dot follows faster

            currentRef.current.x += (posRef.current.x - currentRef.current.x) * lerpOuter;
            currentRef.current.y += (posRef.current.y - currentRef.current.y) * lerpOuter;

            innerCurrentRef.current.x += (posRef.current.x - innerCurrentRef.current.x) * lerpInner;
            innerCurrentRef.current.y += (posRef.current.y - innerCurrentRef.current.y) * lerpInner;

            cursor.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
            inner.style.transform = `translate3d(${innerCurrentRef.current.x}px, ${innerCurrentRef.current.y}px, 0)`;

            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMove);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            {/* outer glow */}
            <div ref={cursorRef} className="custom-cursor" />

            {/* arrow */}
            <div ref={innerRef} className="custom-cursor-inner">
                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 3L20 12L4 21L7 12L4 3Z"
                        fill="white"
                    />
                </svg>
            </div>
        </>
    );
}
