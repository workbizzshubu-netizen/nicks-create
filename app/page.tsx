"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";

import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Zoyi from "@/components/Zoyi";
import Celebrities from "@/components/Celebrities";
import Showreel from "@/components/Showreel";
import StickyFrostedGlass from "@/components/StickyFrostedGlass";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Celebrities />
      <Showreel />
      <Portfolio />

      <Testimonial />
      <Contact />
      <Footer />
      <Zoyi />
      <Chatbot />

      {/* Sticky CTA Reveal */}
      <StickyFrostedGlass>
        <div className="flex flex-col items-center gap-6">
          {/* Visual Thumbnails (Matching Reference Image) */}
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden px-4 py-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="w-20 h-14 md:w-32 md:h-20 rounded-xl overflow-hidden border border-white/20 shadow-2xl flex-shrink-0 relative group/thumb"
              >
                <img
                  src={`/portfolio/thumb${i > 4 ? 1 : i}.jpg`}
                  alt="Work"
                  className="w-full h-full object-cover grayscale-[0.3] group-hover/thumb:grayscale-0 transition-all duration-500 scale-105 group-hover/thumb:scale-100"
                  onError={(e) => {
                    // Fallback to a solid color if image doesn't exist
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop`;
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover/thumb:bg-transparent transition-colors" />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-8 bg-white/5 dark:bg-black/5 backdrop-blur-sm p-4 md:p-6 rounded-[28px] border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-apple-accent/20 flex items-center justify-center text-apple-accent">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm md:text-base font-black text-black dark:text-white leading-tight">
                  Ready to elevate your content?
                </h4>
                <p className="text-black/40 dark:text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  Premium High-Retention Edits
                </p>
              </div>
            </div>
            <Link
              href="/booking"
              className="group btn btn-ask px-6 md:px-10 py-3 md:py-4 text-xs md:text-sm font-black shadow-xl shadow-apple-accent/20 flex items-center gap-2"
            >
              Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </StickyFrostedGlass>
    </main>
  );
}
