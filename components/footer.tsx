import React from 'react';
import Image from 'next/image';
import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10">
                                <Image
                                    src="/logo.jpg"
                                    alt="nicks.create logo"
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-2xl font-bold gradient-text">nicks.create</div>
                        </div>
                        <p className="text-black/40 text-sm">
                            Professional video editing and motion design services
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-black/60 mb-6 font-bold">Quick Links</h4>
                        <ul className="space-y-3 text-black/50">
                            <li><a href="#work" className="hover:text-black transition-colors">Work</a></li>
                            <li><a href="#services" className="hover:text-black transition-colors">Services</a></li>
                            <li><a href="#pricing" className="hover:text-black transition-colors">Pricing</a></li>
                            <li><a href="#contact" className="hover:text-black transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-black/60 mb-6 font-bold">Services</h4>
                        <ul className="space-y-3 text-black/50">
                            <li>Video Editing</li>
                            <li>Motion Design</li>
                            <li>Color Grading</li>
                            <li>Animation</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-8 font-black">Follow</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/create.nicks/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-black/5 hover:bg-apple-accent hover:text-white flex items-center justify-center transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-apple-accent/20"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="https://wa.me/917900509667"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-black/5 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-300 group shadow-sm hover:shadow-lg hover:shadow-green-500/20"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/30">
                    <p>© 2024 nicks.create. All rights reserved.</p>
                    <a href="#" className="hover:text-black transition-colors mt-4 md:mt-0">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}
