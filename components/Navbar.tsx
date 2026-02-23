import React from "react";
import Image from "next/image";
import { Menu, Instagram, MessageCircle } from "lucide-react";

export default function Navbar() {
    return (
        <header className="fixed top-7 left-0 right-0 z-50 px-6">
            <div className="max-w-4xl mx-auto glass nav-shell">

                {/* Left Icon (menu) */}
                <button className="nav-icon">
                    <Menu className="w-5 h-5 text-black/70" />
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

                {/* Right icons (Socials) */}
                <div className="flex items-center gap-2">
                    <a
                        href="https://www.instagram.com/create.nicks/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-icon hover:text-apple-accent transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a
                        href="https://wa.me/917900509667"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-icon hover:text-green-500 transition-colors"
                        aria-label="WhatsApp"
                    >
                        <MessageCircle className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </header>
    );
}
