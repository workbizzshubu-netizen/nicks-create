import React from "react";
import Image from "next/image";

export default function Navbar() {
    return (
        <header className="fixed top-7 left-0 right-0 z-50 px-6">
            <div className="max-w-4xl mx-auto glass nav-shell">

                {/* Left Icon (menu) */}
                <button className="nav-icon">
                    <span className="text-xl">☰</span>
                </button>

                {/* Center pill with Logo and Text */}
                <div className="nav-center overflow-hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 bg-white flex items-center justify-center">
                            <Image
                                src="/logo.jpg"
                                alt="nicks.create logo"
                                width={44}
                                height={44}
                                className="w-full h-full object-cover scale-[1] translate-y-[-0%]"
                            />
                        </div>
                        <span className="text-[16px] font-extrabold tracking-tight text-black/85">
                            nicks.create
                        </span>
                    </div>
                </div>

                {/* Right icons */}
                <div className="flex items-center gap-2">
                    <button className="nav-icon text-lg">▦</button>
                    <button className="nav-icon text-lg">👤</button>
                </div>
            </div>
        </header>
    );
}
