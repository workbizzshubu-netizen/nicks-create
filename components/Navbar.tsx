import React from "react";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="fixed top-7 left-0 right-0 z-50 px-6">
            <div className="max-w-4xl mx-auto glass nav-shell">

                {/* Left Icon (custom) */}
                <button className="nav-icon">
                    <Image
                        src="/myicon.png"
                        alt="Icon"
                        width={22}
                        height={22}
                        className="opacity-80"
                    />
                </button>

                {/* Center pill text */}
                <div className="nav-center">
                    <span className="text-[14px] font-extrabold tracking-tight text-black/70">
                        nicks.create
                    </span>
                </div>

                {/* Right icons */}
                <button className="nav-icon">▦</button>
                <button className="nav-icon">👤</button>
            </div>
        </header>
    );
}
