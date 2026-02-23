"use client";
import React from "react";
import { Check, Sparkles, Wand2, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const pricingPlans = [
    {
        name: "Simple",
        price: "₹3,500",
        description: "One time purchase. Single video edit.",
        icon: <Wand2 className="w-6 h-6 text-apple-text/60" />,
        features: [
            "One professional video edit (90 sec)",
            "48-72 hour turnaround",
            "2 rounds of changes",
            "No complex motion graphics or animations",
            "Ideal for simple social forward reels",
            "Simple briefing format",
            "Frame.io for accurate feedback"
        ],
        buttonText: "Get Started",
        popular: false
    },
    {
        name: "Complex",
        price: "₹6,200",
        description: "One time purchase. Single video edit.",
        icon: <Sparkles className="w-6 h-6 text-apple-text/60" />,
        features: [
            "One professional video edit (90 sec)",
            "48-72 hour turnaround",
            "2 rounds of changes",
            "Includes heavy motion graphics and storytelling",
            "Ideal for talking head, retention based edits",
            "Personal project manager",
            "Frame.io for accurate feedback"
        ],
        buttonText: "Choose Complex",
        popular: true
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <span className="px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">
                            Pricing
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black">
                        Simple, <span className="italic font-serif text-apple-accent">Transparent</span> Pricing
                    </h2>
                    <p className="text-black/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        No hidden fees. Just clear, flexible plans to suit your workflow.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`glass-card p-10 flex flex-col relative group hover:scale-[1.02] transition-all duration-500 ${plan.popular ? 'border-apple-accent/30 bg-white shadow-xl shadow-apple-accent/5' : ''}`}
                        >
                            {/* Subtle background glow for cards */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${plan.popular ? 'bg-gradient-to-br from-apple-accent/[0.03] to-transparent' : 'bg-gradient-to-br from-black/[0.01] to-transparent'}`} />

                            {plan.popular && (
                                <div className="absolute top-6 right-6 z-20">
                                    <span className="bg-apple-accent text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-apple-accent/20">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-8 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-apple-bg border border-black/5 flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-shadow">
                                    {React.cloneElement(plan.icon as React.ReactElement, { className: "w-8 h-8 text-black" })}
                                </div>
                                <h3 className="text-3xl font-black mb-3 tracking-tight text-black">{plan.name}</h3>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-6xl font-black tracking-tighter text-black">{plan.price}</span>
                                    <span className="text-black/40 font-bold text-lg">/video</span>
                                </div>
                                <p className="text-black/60 text-base font-medium leading-relaxed">{plan.description}</p>
                            </div>

                            <Link
                                href={`/booking?plan=${plan.name}`}
                                className={`btn w-full mb-10 py-4 text-sm font-bold uppercase tracking-widest z-10 ${plan.popular ? 'btn-ask shadow-lg shadow-apple-accent/20' : 'btn-glass'}`}
                            >
                                {plan.buttonText}
                            </Link>

                            <div className="space-y-4 relative z-10">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="w-4 h-4 rounded-full bg-apple-accent/10 flex items-center justify-center">
                                                <Check className="w-2.5 h-2.5 text-apple-accent stroke-[3]" />
                                            </div>
                                        </div>
                                        <span className="text-base text-black/70 font-semibold leading-normal">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Premium Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 md:p-12 relative overflow-hidden group"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <span className="text-sm font-black uppercase tracking-widest text-black/40">Premium</span>
                                <span className="bg-apple-accent text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-apple-accent/20">
                                    Our Best Offering
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-black">
                                For Projects that need some <span className="italic font-serif text-apple-accent">Extra Love</span>
                            </h3>
                            <p className="text-black/60 font-medium text-lg max-w-xl">
                                Full-suite campaigns crafted for some of the world's leading brands.
                            </p>
                        </div>

                        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-6">
                            <span className="text-4xl md:text-6xl font-black tracking-tighter text-black">
                                ₹35,000 <span className="text-xl font-bold text-black/30">onwards</span>
                            </span>
                            <div className="flex gap-4">
                                <Link href="#work" className="btn btn-glass">View Premium Work</Link>
                                <Link href="/booking?plan=Premium" className="btn btn-ask">Contact Sales</Link>
                            </div>
                        </div>
                    </div>

                    {/* Subtle Gradient Background Effect */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-apple-accent/10 blur-[100px] rounded-full group-hover:bg-apple-accent/20 transition-all duration-700" />
                </motion.div>
            </div>
        </section>
    );
}
