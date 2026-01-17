import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="text-2xl font-bold gradient-text mb-4">nicks.create</div>
                        <p className="text-white/40 text-sm">
                            Professional video editing and motion design services
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-green-400/60 mb-6 font-bold">Quick Links</h4>
                        <ul className="space-y-3 text-white/60">
                            <li><a href="#work" className="hover:text-green-400 transition-colors">Work</a></li>
                            <li><a href="#services" className="hover:text-green-400 transition-colors">Services</a></li>
                            <li><a href="#pricing" className="hover:text-green-400 transition-colors">Pricing</a></li>
                            <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-green-400/60 mb-6 font-bold">Services</h4>
                        <ul className="space-y-3 text-white/60">
                            <li>Video Editing</li>
                            <li>Motion Design</li>
                            <li>Color Grading</li>
                            <li>Animation</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-green-400/60 mb-6 font-bold">Follow</h4>
                        <ul className="space-y-3 text-white/60">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">YouTube</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Twitter</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-white/40">
                    <p>© 2024 nicks.create. All rights reserved.</p>
                    <a href="#" className="hover:text-green-400 transition-colors mt-4 md:mt-0">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}
