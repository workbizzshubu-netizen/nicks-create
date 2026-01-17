"use client";
import React from "react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="glass-card p-10 md:p-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                        {/* LEFT */}
                        <div>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black/85">
                                Let’s{" "}
                                <span className="theme-gradient-text font-black">Begin</span>
                            </h2>

                            <div className="mt-12 space-y-10">
                                {/* item 1 */}
                                <div className="flex gap-6">
                                    <div className="step-badge">1</div>
                                    <p className="text-lg md:text-xl text-black/60 leading-relaxed">
                                        Tell us what keeps you up at night.{" "}
                                        <span className="text-black/80 font-bold">
                                            We turn that into your unfair advantage.
                                        </span>
                                    </p>
                                </div>

                                {/* item 2 */}
                                <div className="flex gap-6">
                                    <div className="step-badge">2</div>
                                    <p className="text-lg md:text-xl text-black/60 leading-relaxed">
                                        Get a battle plan, not a proposal.{" "}
                                        <span className="text-black/80 font-bold">
                                            Custom strategy built for you.
                                        </span>
                                    </p>
                                </div>

                                {/* item 3 */}
                                <div className="flex gap-6">
                                    <div className="step-badge">3</div>
                                    <p className="text-lg md:text-xl text-black/60 leading-relaxed">
                                        Watch your business transform while competitors wonder what
                                        happened.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT FORM */}
                        <div className="form-panel">
                            <form className="space-y-6">
                                <input className="form-input" placeholder="Name" />
                                <input className="form-input" placeholder="Phone Number" />
                                <input className="form-input" placeholder="Email" />

                                <select className="form-input">
                                    <option>Select a solution</option>
                                    <option>Reels / Shorts Editing</option>
                                    <option>YouTube Editing</option>
                                    <option>Motion Graphics</option>
                                    <option>Brand Video</option>
                                    <option>Monthly Retainer</option>
                                </select>

                                <button type="submit" className="submit-btn">
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
