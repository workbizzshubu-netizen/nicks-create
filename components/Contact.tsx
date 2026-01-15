"use client";

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative min-h-screen flex items-center justify-center px-6"
        >
            {/* Contact Glow */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-[-20%] top-[20%] w-[500px] h-[500px] bg-purple-500/25 rounded-full blur-[180px]" />
                <div className="absolute right-[-20%] bottom-[10%] w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[180px]" />
            </div>

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-semibold mb-10">
                        Let’s{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
                            Begin
                        </span>
                    </h2>

                    <div className="space-y-8 text-white/70">
                        <div className="flex gap-4">
                            <span className="w-8 h-8 rounded-full border border-lime-400 text-lime-400 flex items-center justify-center">
                                1
                            </span>
                            <p>
                                Tell us what keeps you up at night.{" "}
                                <strong className="text-white">
                                    We turn that into your unfair advantage.
                                </strong>
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <span className="w-8 h-8 rounded-full border border-lime-400 text-lime-400 flex items-center justify-center">
                                2
                            </span>
                            <p>
                                Get a battle plan, not a proposal.{" "}
                                <strong className="text-white">
                                    Custom strategy built for you.
                                </strong>
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <span className="w-8 h-8 rounded-full border border-lime-400 text-lime-400 flex items-center justify-center">
                                3
                            </span>
                            <p>
                                Watch your business transform{" "}
                                <strong className="text-white">
                                    while competitors wonder what happened.
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10">
                    <form className="space-y-5">
                        <input
                            placeholder="Name"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-lime-400"
                        />

                        <input
                            placeholder="Phone Number"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-lime-400"
                        />

                        <input
                            placeholder="Email"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-lime-400"
                        />

                        <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none text-white/70 focus:border-lime-400">
                            <option>Select a solution</option>
                            <option>Video Editing</option>
                            <option>Motion Graphics</option>
                            <option>Brand Design</option>
                        </select>

                        <button className="w-full py-4 rounded-full bg-lime-400 text-black font-semibold hover:opacity-90 transition">
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
