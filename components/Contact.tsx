"use client";
import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="glass-card p-10 md:p-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                        {/* LEFT */}
                        <div>
                            <ScrollReveal direction="up" delay={0} distance={30}>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black/85">
                                    Let's{" "}
                                    <span className="theme-gradient-text font-black">Begin</span>
                                </h2>
                            </ScrollReveal>

                            <div className="mt-12 space-y-10">
                                {[
                                    { step: "1", text: <>Tell us what keeps you up at night.{" "}<span className="text-black/80 font-bold">We turn that into your unfair advantage.</span></>, delay: 100 },
                                    { step: "2", text: <>Get a battle plan, not a proposal.{" "}<span className="text-black/80 font-bold">Custom strategy built for you.</span></>, delay: 200 },
                                    { step: "3", text: "Watch your business transform while competitors wonder what happened.", delay: 300 },
                                ].map((item, i) => (
                                    <ScrollReveal key={i} direction="left" delay={item.delay} distance={30}>
                                        <div className="flex gap-6">
                                            <div className="step-badge">{item.step}</div>
                                            <p className="text-lg md:text-xl text-black/60 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT FORM */}
                        <ScrollReveal direction="right" delay={200} distance={40} duration={900}>
                            <div className="form-panel">
                                <form
                                    className="space-y-6"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const data = {
                                            name: formData.get("name"),
                                            phoneNumber: formData.get("phoneNumber"),
                                            email: formData.get("email"),
                                            solution: formData.get("solution"),
                                        };

                                        const btn = e.currentTarget.querySelector("button");
                                        if (btn) {
                                            btn.disabled = true;
                                            btn.innerText = "SUBMITTING...";
                                        }

                                        try {
                                            const res = await fetch("/api/enquiry", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify(data),
                                            });

                                            if (res.ok) {
                                                alert("Enquiry sent successfully!");
                                                (e.target as HTMLFormElement).reset();
                                            } else {
                                                alert("Failed to send enquiry. Please try again.");
                                            }
                                        } catch (err) {
                                            alert("An error occurred.");
                                        } finally {
                                            if (btn) {
                                                btn.disabled = false;
                                                btn.innerText = "SUBMIT";
                                            }
                                        }
                                    }}
                                >
                                    <input name="name" className="form-input" placeholder="Name" required />
                                    <input name="phoneNumber" className="form-input" placeholder="Phone Number" required />
                                    <input name="email" type="email" className="form-input" placeholder="Email" required />

                                    <select name="solution" className="form-input" required>
                                        <option value="">Select a solution</option>
                                        <option value="Reels / Shorts Editing">Reels / Shorts Editing</option>
                                        <option value="YouTube Editing">YouTube Editing</option>
                                        <option value="Motion Graphics">Motion Graphics</option>
                                        <option value="Brand Video">Brand Video</option>
                                        <option value="Monthly Retainer">Monthly Retainer</option>
                                    </select>

                                    <button type="submit" className="submit-btn text-white">
                                        SUBMIT
                                    </button>
                                </form>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
