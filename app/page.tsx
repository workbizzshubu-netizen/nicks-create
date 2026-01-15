"use client";

import Portfolio from "@/components/Portfolio";
import Zoyi from "@/components/Zoyi";

export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">

      {/* ================= HERO SECTION (DO NOT TOUCH) ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_60%)]" />

        <div className="relative z-10 text-center max-w-4xl">
          <p className="text-xs tracking-[0.4em] text-white/60 mb-6">
            CREATIVE × DESIGN × MOTION
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6">
            Ideas That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Convert
            </span>
          </h1>

          <p className="text-white/70 max-w-2xl mx-auto mb-16">
            I design brand identities, motion graphics, and digital experiences
            that help modern brands stand out and grow.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative h-24 w-24 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition"
            >
              <span className="text-xs tracking-widest leading-tight">
                SHOW<br />WORK
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO (DO NOT TOUCH) ================= */}
      <div id="portfolio">
        <Portfolio />
      </div>

      {/* ================= CONTACT SECTION (THEME FIXED) ================= */}
      <section
        id="contact"
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        {/* Glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.2),transparent_55%)]" />

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-10">
              Let’s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Begin
              </span>
            </h2>

            <div className="space-y-8 text-white/80">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full border border-purple-400 flex items-center justify-center text-sm text-purple-300">
                  1
                </div>
                <p>
                  Tell us what keeps you up at night.<br />
                  <span className="text-white">
                    We’ll turn that problem into your unfair advantage.
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full border border-pink-400 flex items-center justify-center text-sm text-pink-300">
                  2
                </div>
                <p>
                  No generic proposals.<br />
                  <span className="text-white">
                    Custom strategy built for your exact situation.
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full border border-purple-400 flex items-center justify-center text-sm text-purple-300">
                  3
                </div>
                <p>
                  Watch your brand transform.<br />
                  <span className="text-white">
                    While competitors wonder what happened.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative rounded-3xl bg-black/70 backdrop-blur-xl border border-white/20 p-10 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
            <form className="space-y-5">
              <input
                placeholder="Name"
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-purple-400"
              />

              <input
                placeholder="Phone Number"
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-purple-400"
              />

              <input
                placeholder="Email"
                className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-purple-400"
              />

              <select className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-purple-400">
                <option>Select a solution</option>
                <option>Brand Identity</option>
                <option>Motion Graphics</option>
                <option>Video Editing</option>
                <option>Social Media Growth</option>
              </select>

              <button
                type="submit"
                className="w-full mt-6 py-3 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
              >
                Submit
              </button>

              <p className="text-xs text-white/40 text-center mt-4">
                By submitting this form, you agree to our{" "}
                <span className="text-purple-400">Privacy Policy</span>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ================= ZOYI SALES AI ================= */}
      <Zoyi />

    </main>
  );
}
