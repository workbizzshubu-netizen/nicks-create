"use client";
import React from "react";

const celebrities = [
    {
        name: "Chandini Chowdary",
        category: "Actor",
        project: "Content Creation",
        image: "/celebrities/chandini-chowdary.jpg",
        instagram: "@chandini.chowdary",
    },
    {
        name: "Akshara Gowda Bikki",
        category: "Actor",
        project: "Video shoot",
        image: "/celebrities/akshara-gowda.jpg",
        instagram: "@iaksharagowda",
    },
    {
        name: "Srinath Maganti",
        category: "Actor",
        project: "Podcast",
        image: "/celebrities/srinath-maganti.jpg",
        instagram: "@srinathmaganti",
    },
];

export default function Celebrities() {
    return (
        <section id="celebrities" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black/85">
                        Worked with{" "}
                        <span className="theme-gradient-text font-black">Celebrities</span>
                    </h2>
                    <p className="text-black/55 text-lg mt-4 max-w-2xl mx-auto">
                        Trusted by India's biggest names for premium video editing and
                        motion design.
                    </p>
                </div>

                {/* Celebrity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {celebrities.map((celeb, i) => (
                        <div key={i} className="celebrity-card group">
                            {/* Profile Picture */}
                            <div className="celebrity-avatar">
                                <img
                                    src={celeb.image}
                                    alt={celeb.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="font-black text-lg text-black/85 mb-1">
                                    {celeb.name}
                                </h3>
                                <p className="text-black/50 text-sm mb-1">
                                    {celeb.category}
                                </p>
                                <p className="text-black/40 text-xs mb-2">
                                    {celeb.instagram}
                                </p>
                                <div className="celebrity-project-tag">
                                    {celeb.project}
                                </div>
                            </div>

                            {/* Gradient accent */}
                            <div className="celebrity-accent" />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-black/60 text-base mb-6">
                        Want to collaborate on your next big project?
                    </p>
                    <a
                        href="#contact"
                        className="btn btn-ask inline-flex items-center gap-2"
                    >
                        <span>Let's Talk</span>
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
