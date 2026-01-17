"use client";
import { useEffect } from "react";

export default function CustomCursor() {
    useEffect(() => {
        const cursor = document.querySelector(".custom-cursor") as HTMLDivElement;
        const cursorInner = document.querySelector(
            ".custom-cursor-inner"
        ) as HTMLDivElement;

        if (!cursor || !cursorInner) return;

        const move = (e: MouseEvent) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorInner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        };

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <>
            {/* outer glow */}
            <div className="custom-cursor" />

            {/* arrow */}
            <div className="custom-cursor-inner">
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
