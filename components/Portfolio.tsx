"use client";

const videos = [
    { id: "1154597942" },
    { id: "1154597904" },
    { id: "1154597670" },
    { id: "1154598785" },
];

export default function Portfolio() {
    return (
        <section id="portfolio" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="mb-12">
                    <p className="text-sm tracking-widest text-white/60 mb-2">
                        SELECTED WORK
                    </p>
                    <h2 className="text-4xl md:text-5xl font-semibold">
                        Portfolio
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video, i) => (
                        <div
                            key={i}
                            className="relative aspect-[9/16] rounded-2xl overflow-hidden 
                         border border-white/10 bg-black/40 
                         isolate"
                        >
                            {/* Vimeo iframe */}
                            <iframe
                                src={`https://player.vimeo.com/video/${video.id}?autoplay=0&muted=1&title=0&byline=0&portrait=0`}
                                loading="lazy"
                                className="w-full h-full"
                                frameBorder="0"
                                allow="fullscreen; picture-in-picture"
                                allowFullScreen
                            />

                            {/* Soft overlay (prevents flicker) */}
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
