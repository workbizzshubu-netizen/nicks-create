"use client";
import React from "react";

export default function About() {
    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Wrapper */}
                <div className="glass-card p-10 md:p-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* LEFT */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black/85">
                                About{" "}
                                <span className="theme-gradient-text font-black">nicks.create</span>
                            </h2>

                            <p className="mt-5 text-lg text-black/55 leading-relaxed">
                                I’m a{" "}
                                <span className="text-black/75 font-bold">
                                    Video Editor & Motion Designer
                                </span>{" "}
                                focused on creating premium edits that hold attention and convert
                                viewers into customers.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="about-pill">Reels / Shorts</span>
                                <span className="about-pill">YouTube Editing</span>
                                <span className="about-pill">Motion Graphics</span>
                                <span className="about-pill">Brand Videos</span>
                                <span className="about-pill">Sound Design</span>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <a href="#work" className="btn btn-glass">
                                    View Portfolio
                                </a>
                                <a href="#contact" className="btn btn-ask">
                                    Hire Me
                                </a>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="about-card">
                                <div className="about-card-title">Clean Storytelling</div>
                                <p className="about-card-text">
                                    Smooth pacing, modern cuts, cinematic flow — audience retention
                                    focused.
                                </p>
                            </div>

                            <div className="about-card">
                                <div className="about-card-title">Motion Design</div>
                                <p className="about-card-text">
                                    Premium animations, typography & effects that upgrade your
                                    content instantly.
                                </p>
                            </div>

                            <div className="about-card">
                                <div className="about-card-title">Fast Delivery</div>
                                <p className="about-card-text">
                                    Quick turnarounds, revisions support & pro communication.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
