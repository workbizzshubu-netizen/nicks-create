import React from 'react';
import Image from 'next/image';

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
                        <h4 className="text-sm uppercase tracking-widest text-black/60 mb-6 font-bold">Follow</h4>
                        <ul className="space-y-3 text-black/50">
                            <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">YouTube</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5 text-sm text-black/40">
                    <p>© 2024 nicks.create. All rights reserved.</p>
                    <a href="#" className="hover:text-black transition-colors mt-4 md:mt-0">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}
